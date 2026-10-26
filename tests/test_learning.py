import hashlib
import itertools
import json
from pathlib import Path
import random
import sqlite3
import sys
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from common import connect_fixture,statements
from fd import closure,candidate_keys,minimal_cover,parse_fds,parse_attributes
from storage import calculate
from capstone import add_anime,validate
from transaction_demo import demo as transaction_demo
from index_demo import demo as index_demo

class SQLTests(unittest.TestCase):
 def test_40_authored_expected_outputs(self):
  con=connect_fixture()
  try:
   for q in json.loads((ROOT/'sql/exercises.json').read_text(encoding='utf-8')):
    with self.subTest(question=q['id']):
     self.assertEqual([list(r) for r in con.execute(q['sql']).fetchall()],q['expected'])
  finally:con.close()
 def test_foreign_keys_on_both_fixtures(self):
  for name in ['company','anime']:
   with self.subTest(fixture=name):
    con=connect_fixture(name)
    self.assertEqual(con.execute('PRAGMA foreign_keys').fetchone(),(1,))
    self.assertEqual(con.execute('PRAGMA foreign_key_check').fetchall(),[])
    con.close()
 def test_constraints_reject_invalid_rating(self):
  for query,args in [('INSERT INTO rating VALUES(?,?,?)',(3,2,11)),('INSERT INTO rating VALUES(?,?,?)',(3,2,None)),('INSERT INTO rating VALUES(?,?,?)',(999,2,7)),('INSERT INTO rating VALUES(?,?,?)',(1,1,7))]:
   with self.subTest(args=args):
    con=connect_fixture('anime')
    with self.assertRaises(sqlite3.IntegrityError):con.execute(query,args)
    con.close()
 def test_text_primary_key_is_not_null(self):
  con=connect_fixture()
  with self.assertRaises(sqlite3.IntegrityError):con.execute("INSERT INTO EMPLOYEE(Fname,Lname,Ssn,Dno) VALUES('A','B',NULL,5)")
  con.close()
 def test_parameter_binding(self):
  con=connect_fixture('anime')
  self.assertEqual(con.execute('SELECT account_id FROM account WHERE username=?',('an',)).fetchall(),[(1,)])
  self.assertEqual(con.execute('SELECT account_id FROM account WHERE username=?',("an' OR 1=1 --",)).fetchall(),[])
  con.close()
 def test_capstone_rolls_back_semantic_violation(self):
  con=connect_fixture('anime')
  with self.assertRaises(ValueError):add_anime(con,5,'No genres',2026,[])
  self.assertEqual(con.execute('SELECT COUNT(*) FROM anime WHERE anime_id=5').fetchone(),(0,))
  add_anime(con,5,'With genre',2026,[1]);validate(con)
  self.assertEqual(con.execute('SELECT COUNT(*) FROM anime_genre WHERE anime_id=5').fetchone(),(1,))
  con.close()
 def test_capstone_rolls_back_invalid_fk(self):
  con=connect_fixture('anime')
  with self.assertRaises(sqlite3.IntegrityError):add_anime(con,5,'Bad genre',2026,[999])
  self.assertEqual(con.execute('SELECT COUNT(*) FROM anime WHERE anime_id=5').fetchone(),(0,))
  con.close()
 def test_service_validation_detects_total_specialization_gap(self):
  con=connect_fixture('anime')
  con.execute("INSERT INTO account VALUES(99,'new','new@example.test')")
  with self.assertRaises(ValueError):validate(con)
  con.close()
 def test_episode_number_is_local_to_owner(self):
  con=connect_fixture('anime')
  self.assertEqual(con.execute('SELECT COUNT(*) FROM episode WHERE episode_no=1').fetchone(),(4,))
  with self.assertRaises(sqlite3.IntegrityError):con.execute("INSERT INTO episode VALUES(1,1,'Duplicate',1200)")
  con.close()
 def test_anime_capstone_expected_queries(self):
  con=connect_fixture('anime')
  self.assertEqual(con.execute('SELECT a.title,COUNT(*) FROM anime a JOIN anime_genre g ON g.anime_id=a.anime_id GROUP BY a.anime_id,a.title HAVING COUNT(*)>1 ORDER BY a.anime_id').fetchall(),[('Sky Academy',2),('Orbit City',2)])
  self.assertEqual(con.execute('SELECT title FROM anime a WHERE NOT EXISTS(SELECT 1 FROM rating r WHERE r.anime_id=a.anime_id) ORDER BY anime_id').fetchall(),[('Paper Moon',)])
  self.assertEqual(con.execute('SELECT a.title,AVG(r.score) FROM anime a JOIN rating r ON r.anime_id=a.anime_id GROUP BY a.anime_id,a.title ORDER BY a.anime_id').fetchall(),[('Sky Academy',9.0),('Quiet Garden',8.0),('Orbit City',9.0)])
  self.assertEqual(con.execute('SELECT a.username FROM account a JOIN viewer v ON v.account_id=a.account_id JOIN content_admin c ON c.account_id=a.account_id').fetchall(),[('chi',)])
  self.assertEqual(con.execute('SELECT anime_id FROM contains WHERE list_id=1 ORDER BY added_at,anime_id').fetchall(),[(1,),(2,)])
  con.close()
 def test_transaction_failure_and_success(self):
  before,fail,success=transaction_demo();self.assertEqual(before,fail);self.assertEqual(success,[(1,900),(2,600)])
 def test_index_preserves_query_answer(self):
  before,after,_,_=index_demo();self.assertTrue(before);self.assertTrue(after)
  self.assertTrue(any('ix_event_anime' in str(row) for row in after))
 def test_sql_splitter_handles_semicolon_in_string(self):
  con=sqlite3.connect(':memory:')
  result=[con.execute(x).fetchall() for x in statements("SELECT ';'; SELECT 2;")]
  self.assertEqual(result,[[(';',)],[(2,)]])
  con.close()

class FDTests(unittest.TestCase):
 def test_fixed_point_requires_multiple_passes(self):
  f=parse_fds('B->C;A->B',set('ABC'))
  self.assertEqual(closure({'A'},f)[0],set('ABC'))
 def test_candidate_keys_different_sizes(self):
  u=set('ABC');f=parse_fds('A->B,C;B,C->A',u)
  self.assertEqual({frozenset(k) for k in candidate_keys(u,f)},{frozenset('A'),frozenset('BC')})
 def test_keys_with_missing_rhs_attribute(self):
  u=set('ABC');f=parse_fds('A->B;B->A',u)
  self.assertEqual({frozenset(k) for k in candidate_keys(u,f)},{frozenset('AC'),frozenset('BC')})
 def test_no_fds(self):
  self.assertEqual(candidate_keys(set('ABC'),[]),[set('ABC')])
 def test_invalid_unknown_attribute(self):
  with self.assertRaises(ValueError):parse_fds('A->Z',set('ABC'))
 def test_minimal_cover_equivalent_for_all_subsets(self):
  rng=random.Random(2013);u=set('ABCDE');attrs=sorted(u)
  for trial in range(30):
   f=[(frozenset(rng.sample(attrs,rng.randint(1,3))),frozenset(rng.sample(attrs,rng.randint(1,2)))) for _ in range(7)]
   cover=minimal_cover(f)
   for n in range(6):
    for subset in itertools.combinations(attrs,n):
     self.assertEqual(closure(subset,f)[0],closure(subset,cover)[0])
   for i,(left,right) in enumerate(cover):
    self.assertEqual(len(right),1)
    self.assertFalse(right<=closure(left,cover[:i]+cover[i+1:])[0])
    for a in left:self.assertFalse(right<=closure(left-{a},cover)[0])
 def test_enumeration_limit(self):
  with self.assertRaises(ValueError):parse_attributes(','.join('ABCDEFGHIJKLM'))

class StorageTests(unittest.TestCase):
 def test_worked_example(self):
  r=calculate();self.assertEqual((r['bfr'],r['data_blocks'],r['index_levels'],r['accesses_no_cache']),(40,750,2,3))
 def test_rounding(self):
  self.assertEqual(calculate(records=41)['data_blocks'],2)
 def test_single_block(self):
  r=calculate(records=1);self.assertEqual(r['accesses_no_cache'],2)
 def test_invalid_models(self):
  for args in [{'records':0},{'record_bytes':5000},{'key_bytes':4096},{'overhead':4096},{'records':2.5}]:
   with self.subTest(args=args):
    with self.assertRaises(ValueError):calculate(**args)

class ContentTests(unittest.TestCase):
 def test_original_source_hashes(self):
  for f in json.loads((ROOT/'materials/manifest.json').read_text(encoding='utf-8')):
   self.assertEqual(hashlib.sha256((ROOT/'materials'/f['file']).read_bytes()).hexdigest(),f['sha256'])
 def test_quiz_schema_and_exact_count(self):
  data=json.loads((ROOT/'docs/quiz.json').read_text(encoding='utf-8'))
  self.assertEqual(len(data),50);self.assertEqual(len({q['id'] for q in data}),50)
  for q in data:
   self.assertEqual(len(q['choices']),4);self.assertIn(q['answer'],range(4));self.assertTrue(q['explanation'])
 def test_build_covers_all_source_sections(self):
  from build import sections
  bundle=json.loads((ROOT/'docs/content.js').read_text(encoding='utf-8').removeprefix('window.DB_CONTENT = ').strip().removesuffix(';'))
  self.assertEqual(len({p['id'] for p in bundle['pages']}),len(bundle['pages']))
  for g in bundle['groups']:
   original=(ROOT/'materials'/g['file']).read_text(encoding='utf-8')
   actual=''.join(p['markdown'] for p in bundle['pages'] if p['group']==g['id'] and p['kind']=='source')
   if g['id']=='c1':original=original.replace('D# Chương 1:','# Chương 1:',1)
   self.assertEqual(actual,original)
   self.assertEqual(g['sourcePages'],len(sections(original)))

if __name__=='__main__':unittest.main()
