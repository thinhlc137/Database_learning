import json
import re
import unittest

from common import ROOT
from sql_course import course_examples, execute_example


class SQLCourseTests(unittest.TestCase):
    def test_all_lesson_examples_against_authored_results(self):
        examples = course_examples()
        self.assertEqual(len(examples), 43)
        for example in examples:
            with self.subTest(example=example['id']):
                self.assertEqual([r['values'] for r in execute_example(example)], example['expected'])

    def test_examples_use_fresh_databases(self):
        examples = {e['id']: e for e in course_examples()}
        # S40 mutates John's salary and creates/drops a view. Repetition is safe.
        self.assertEqual(execute_example(examples['S40']), execute_example(examples['S40']))
        result = execute_example(examples['S01'])[0]['values']
        self.assertEqual(next(r for r in result if r[1] == '123456789')[2], 30000)

    def test_every_slide_has_a_reachable_lesson(self):
        slides = json.loads((ROOT/'materials/sql-slides-manifest.json').read_text(encoding='utf-8'))
        bundle = json.loads((ROOT/'docs/content.js').read_text(encoding='utf-8').removeprefix('window.DB_CONTENT = ').strip().removesuffix(';'))
        pages = {p['id'] for p in bundle['pages']}
        self.assertEqual([d['slide_count'] for d in slides], [107, 50])
        self.assertEqual(len(bundle['sqlCourse']), 18)
        for deck in slides:
            self.assertEqual([s['number'] for s in deck['slides']], list(range(1, deck['slide_count']+1)))
            for slide in deck['slides']:
                self.assertIn(slide['lesson'], pages)

    def test_course_local_links_exist(self):
        files = [ROOT/'lessons/06-sql.md', ROOT/'sql/sqlserver/README.md']
        files += sorted((ROOT/'lessons/sql').glob('*.md'))
        for file in files:
            for href in re.findall(r'(?<!!)\[[^\]]+\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
                if href.startswith(('https://', '#')):
                    continue
                with self.subTest(file=str(file), link=href):
                    self.assertTrue((file.parent/href.split('#')[0]).resolve().is_file())


if __name__ == '__main__':
    unittest.main()
