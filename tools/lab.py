"""Run local SQL labs: python tools/lab.py --exercise Q07."""
import argparse
import json
from pathlib import Path
from common import ROOT, connect_fixture, statements, table

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--database',choices=['company','anime'],default='company')
    group=p.add_mutually_exclusive_group(required=True)
    group.add_argument('--query')
    group.add_argument('--file',type=Path)
    group.add_argument('--exercise')
    a=p.parse_args()
    sql=a.query
    exercise=None
    if a.exercise:
        pool=json.loads((ROOT/'sql/exercises.json').read_text(encoding='utf-8'))
        exercise=next((q for q in pool if q['id']==a.exercise.upper()),None)
        if exercise is None:
            p.error('Unknown exercise; choose Q01 through Q40')
        sql=exercise['sql']
        print(exercise['id'],exercise['title'],'\n'+sql+'\n')
    if a.file:
        sql=a.file.read_text(encoding='utf-8')
    con=connect_fixture(a.database)
    try:
        for statement in statements(sql):
            print(table(con.execute(statement)))
        if exercise:
            print('\nExplanation:',exercise['explanation'])
    finally:
        con.close()
if __name__=='__main__':
    main()
