"""Compare query plans; timings are observations, not a speed guarantee."""
import sqlite3
from time import perf_counter

def demo():
    con=sqlite3.connect(':memory:')
    con.execute('CREATE TABLE event(id INTEGER PRIMARY KEY, anime_id INTEGER NOT NULL, payload TEXT)')
    con.executemany('INSERT INTO event VALUES(?,?,?)',((i,i%1000,'view') for i in range(20000)))
    query='SELECT id FROM event WHERE anime_id=? ORDER BY id'
    before=con.execute('EXPLAIN QUERY PLAN '+query,(137,)).fetchall()
    t=perf_counter(); rows_before=con.execute(query,(137,)).fetchall();t1=perf_counter()-t
    con.execute('CREATE INDEX ix_event_anime ON event(anime_id)')
    after=con.execute('EXPLAIN QUERY PLAN '+query,(137,)).fetchall()
    t=perf_counter(); rows_after=con.execute(query,(137,)).fetchall();t2=perf_counter()-t
    assert rows_before==rows_after==[(i,) for i in range(137,20000,1000)]
    con.close()
    return before,after,t1,t2
if __name__=='__main__':
    before,after,t1,t2=demo()
    print('Before:',before,'\nAfter:',after)
    print('Observed seconds (one run, cache-sensitive):',t1,t2)
