"""An intentional exception rolls back a partial transfer."""
import sqlite3

def demo():
    con=sqlite3.connect(':memory:')
    con.execute('CREATE TABLE wallet(id INTEGER PRIMARY KEY,balance INTEGER NOT NULL CHECK(balance>=0))')
    con.executemany('INSERT INTO wallet VALUES(?,?)',[(1,1000),(2,500)])
    con.commit()
    before=con.execute('SELECT * FROM wallet ORDER BY id').fetchall()
    try:
        with con:
            con.execute('UPDATE wallet SET balance=balance-100 WHERE id=1')
            raise RuntimeError('Simulated failure before credit')
    except RuntimeError:
        pass
    after_failure=con.execute('SELECT * FROM wallet ORDER BY id').fetchall()
    assert before==after_failure, 'Rollback invariant failed'
    with con:
        con.execute('UPDATE wallet SET balance=balance-100 WHERE id=1')
        con.execute('UPDATE wallet SET balance=balance+100 WHERE id=2')
    after_success=con.execute('SELECT * FROM wallet ORDER BY id').fetchall()
    assert after_success==[(1,900),(2,600)]
    con.close()
    return before,after_failure,after_success
if __name__=='__main__':
    for label,rows in zip(['Before','After rollback','After commit'],demo()):
        print(label,rows)
