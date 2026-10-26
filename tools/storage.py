"""Textbook unspanned records + sparse multilevel index model."""
import argparse

def ceildiv(a,b):
    return (a+b-1)//b

def calculate(records=30000,record_bytes=100,block_bytes=4096,key_bytes=8,pointer_bytes=8,overhead=0):
    values=[records,record_bytes,block_bytes,key_bytes,pointer_bytes]
    if any(type(x) is not int or x<=0 for x in values) or type(overhead) is not int or not 0<=overhead<block_bytes:
        raise ValueError('Positive integers; 0 <= overhead < block size')
    usable=block_bytes-overhead
    bfr=usable//record_bytes
    fanout=usable//(key_bytes+pointer_bytes)
    if bfr<1 or fanout<2:
        raise ValueError('Record must fit, and index fan-out must be >=2')
    blocks=ceildiv(records,bfr)
    entries=blocks
    levels=[]
    while True:
        count=ceildiv(entries,fanout)
        levels.append({'entries':entries,'blocks':count})
        if count==1:
            break
        entries=count
    return {'usable_bytes':usable,'bfr':bfr,'data_blocks':blocks,'index_capacity':fanout,
            'index_levels_bottom_up':levels,'index_levels':len(levels),'accesses_no_cache':len(levels)+1}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for key,default in [('records',30000),('record-bytes',100),('block-bytes',4096),('key-bytes',8),('pointer-bytes',8),('overhead',0)]:
        p.add_argument('--'+key,type=int,default=default)
    a=p.parse_args()
    try:
        result=calculate(**vars(a))
    except ValueError as e:
        p.error(str(e))
    for key,value in result.items():
        print(key,':',value)
    print('Assumptions: unspanned, sparse primary index, no cache, fixed overhead per data/index block.')
if __name__=='__main__':
    main()
