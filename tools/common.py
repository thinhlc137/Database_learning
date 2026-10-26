"""Portable SQLite fixtures. No external Python dependencies."""
from pathlib import Path
import sqlite3
ROOT = Path(__file__).resolve().parents[1]

def connect_fixture(name='company'):
    if name not in {'company','anime'}:
        raise ValueError('Unknown fixture')
    con = sqlite3.connect(':memory:')
    con.execute('PRAGMA foreign_keys = ON')
    con.executescript((ROOT/'sql'/f'{name}-schema.sql').read_text(encoding='utf-8'))
    con.executescript((ROOT/'sql'/f'{name}-seed.sql').read_text(encoding='utf-8'))
    if con.execute('PRAGMA foreign_key_check').fetchall():
        raise RuntimeError('Fixture violates foreign keys')
    return con

def statements(text):
    buf = ''
    for char in text:
        buf += char
        if char == ';' and sqlite3.complete_statement(buf):
            yield buf
            buf = ''
    if buf.strip():
        # sqlite execute permits a final statement without a semicolon.
        yield buf

def table(cursor):
    if not cursor.description:
        return f'Rows changed: {cursor.rowcount}'
    rows = cursor.fetchall()
    cols = [d[0] for d in cursor.description]
    def value(x):
        return ('NULL' if x is None else str(x)).replace('|','\\|').replace('\n',' ')
    lines = ['| '+' | '.join(cols)+' |','| '+' | '.join('---' for _ in cols)+' |']
    lines += ['| '+' | '.join(map(value,r))+' |' for r in rows]
    return '\n'.join(lines)+f'\n({len(rows)} rows)'
