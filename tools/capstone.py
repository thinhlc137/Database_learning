"""Anime service transaction boundary validates cross-table invariants."""
from common import connect_fixture

def violations(con):
    missing_genre=con.execute('SELECT anime_id FROM anime a WHERE NOT EXISTS(SELECT 1 FROM anime_genre ag WHERE ag.anime_id=a.anime_id)').fetchall()
    missing_role=con.execute('SELECT account_id FROM account a WHERE NOT EXISTS(SELECT 1 FROM viewer v WHERE v.account_id=a.account_id) AND NOT EXISTS(SELECT 1 FROM content_admin c WHERE c.account_id=a.account_id)').fetchall()
    return {'anime_without_genre':missing_genre,'account_without_role':missing_role}

def validate(con):
    bad=violations(con)
    if any(bad.values()):
        raise ValueError(f'Semantic constraints violated: {bad}')

def add_anime(con,anime_id,title,year,genre_ids):
    # Application boundary only: raw SQL outside this function can bypass it.
    if con.in_transaction:
        raise ValueError('Call from outside an existing transaction')
    with con:
        con.execute('INSERT INTO anime VALUES(?,?,?)',(anime_id,title,year))
        con.executemany('INSERT INTO anime_genre VALUES(?,?)',((anime_id,g) for g in genre_ids))
        validate(con)

def main():
    con=connect_fixture('anime');validate(con)
    try:
        add_anime(con,5,'No genre yet',2026,[])
    except ValueError:
        print('Rejected and rolled back anime without genre')
    assert con.execute('SELECT COUNT(*) FROM anime WHERE anime_id=5').fetchone()[0]==0
    add_anime(con,5,'New episode of learning',2026,[1])
    print('Accepted anime with genre:',con.execute('SELECT title FROM anime WHERE anime_id=5').fetchone()[0])
    print('Validation:',violations(con))
    con.close()
if __name__=='__main__':
    main()
