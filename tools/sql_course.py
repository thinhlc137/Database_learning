"""Read runnable examples directly from SQL lessons; no third-party dependencies."""
import argparse
import json
import re
from common import ROOT, connect_fixture, statements


def course_examples():
    expectations = json.loads((ROOT/'sql/course-expectations.json').read_text(encoding='utf-8'))
    examples = []
    modules = json.loads((ROOT/'lessons/sql/course.json').read_text(encoding='utf-8'))
    for module in modules:
        markdown = (ROOT/module['file']).read_text(encoding='utf-8')
        for match in re.finditer(r'```sql\n(-- @lab (S\d{2})\n[\s\S]*?)\n```', markdown):
            sql, example_id = match.group(1), match.group(2)
            title = re.findall(r'^#{2,3} (.+)$', markdown[:match.start()], re.M)[-1]
            examples.append(dict(id=example_id, page=module['id'], title=title,
                                 sql=sql, expected=expectations[example_id]))
    ids = [e['id'] for e in examples]
    if len(ids) != len(set(ids)) or set(ids) != set(expectations):
        raise ValueError('Examples and expected results must match one-to-one')
    return examples


def execute_example(example):
    con = connect_fixture()
    results = []
    try:
        for sql in statements(example['sql']):
            cursor = con.execute(sql)
            if cursor.description:
                results.append(dict(columns=[c[0] for c in cursor.description],
                                    values=[list(r) for r in cursor.fetchall()]))
        return results
    finally:
        con.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--example', help='Example ID, e.g. S16')
    parser.add_argument('--check', action='store_true', help='Check all independent expected results')
    args = parser.parse_args()
    examples = course_examples()
    if args.check:
        for example in examples:
            actual = [r['values'] for r in execute_example(example)]
            if actual != example['expected']:
                raise AssertionError(f"{example['id']}: {actual!r} != {example['expected']!r}")
        print(f'PASS: {len(examples)} SQL course examples')
    elif args.example:
        example = next((e for e in examples if e['id'] == args.example.upper()), None)
        if not example:
            parser.error('Unknown example ID')
        print(example['sql'])
        for result in execute_example(example):
            print('| '+' | '.join(result['columns'])+' |')
            print('| '+' | '.join('---' for _ in result['columns'])+' |')
            for row in result['values']:
                print('| '+' | '.join('NULL' if x is None else str(x) for x in row)+' |')
            print(f"({len(result['values'])} rows)")
    else:
        for example in examples:
            print(f"{example['id']} · {example['page']} · {example['title']}")


if __name__ == '__main__':
    main()
