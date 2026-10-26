"""FD tools with trace; attribute names separated by commas; <=12 attributes."""
import argparse
from itertools import combinations

def parse_attributes(text):
    attrs={x.strip() for x in text.split(',') if x.strip()}
    if not attrs or len(attrs)>12:
        raise ValueError('Use 1..12 attributes, separated by commas')
    return attrs

def parse_fds(text, universe):
    result=[]
    for part in text.split(';'):
        if not part.strip():
            continue
        sides=part.replace('→','->').split('->')
        if len(sides)!=2:
            raise ValueError('FD format: A,B->C; C->D')
        left,right=map(parse_attributes,sides)
        if not (left|right)<=universe:
            raise ValueError('FD contains unknown attributes')
        result.append((frozenset(left),frozenset(right)))
    return result

def closure(start, fds):
    known=set(start)
    trace=[('start',sorted(known))]
    while True:
        before=known.copy()
        for left,right in fds:
            if left<=known and not right<=known:
                known.update(right)
                trace.append((','.join(sorted(left))+'->'+','.join(sorted(right)),sorted(known)))
        if known==before:
            return known,trace

def candidate_keys(universe, fds):
    if len(universe)>12:
        raise ValueError('Enumeration limited to 12 attributes')
    keys=[]
    attrs=sorted(universe)
    for n in range(len(attrs)+1):
        for parts in combinations(attrs,n):
            x=set(parts)
            if any(key<=x for key in keys):
                continue
            if closure(x,fds)[0]>=universe:
                keys.append(x)
    return keys

def minimal_cover(fds):
    # Singleton RHS, left minimization, then redundant FD removal.
    f=list(dict.fromkeys((frozenset(l),frozenset({a})) for l,r in fds for a in sorted(r)))
    for i in range(len(f)):
        l,r=f[i]
        for a in sorted(l):
            reduced=l-{a}
            if r<=closure(reduced,f)[0]:
                l=frozenset(reduced)
                f[i]=(l,r)
    i=0
    while i<len(f):
        l,r=f[i]
        rest=f[:i]+f[i+1:]
        if r<=closure(l,rest)[0]:
            f=rest
        else:
            i+=1
    return f

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--attrs',default='A,B,C,D,E')
    p.add_argument('--fds',default='A->B,C;B->D;C,D->E')
    p.add_argument('--start',default='A')
    a=p.parse_args()
    try:
        u=parse_attributes(a.attrs); f=parse_fds(a.fds,u); start=parse_attributes(a.start)
        if not start<=u:
            raise ValueError('Start contains unknown attributes')
        result,trace=closure(start,f)
        for rule,known in trace:
            print(rule,':',','.join(known))
        print('Closure:',','.join(sorted(result)))
        print('Candidate keys:',[','.join(sorted(x)) for x in candidate_keys(u,f)])
        print('Minimal cover:',[(sorted(l),sorted(r)) for l,r in minimal_cover(f)])
    except ValueError as e:
        p.error(str(e))
if __name__=='__main__':
    main()
