"""Create a deterministic ZIP without git history, caches, or dependencies for tests."""
from pathlib import Path
import argparse,zipfile
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('--output',type=Path,default=ROOT.parent/'Database_Learning_Lab.zip')
 a=p.parse_args();out=a.output.resolve()
 if out.is_relative_to(ROOT):p.error('Write the archive outside the project directory')
 out.parent.mkdir(parents=True,exist_ok=True)
 count=0
 with zipfile.ZipFile(out,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for f in sorted(ROOT.rglob('*')):
   if not f.is_file() or any(x in {'.git','__pycache__','node_modules','test-results'} for x in f.relative_to(ROOT).parts) or f.suffix in {'.pyc','.pyo'}:continue
   info=zipfile.ZipInfo(str(Path(ROOT.name)/f.relative_to(ROOT)),date_time=(2026,10,26,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16
   z.writestr(info,f.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9);count+=1
 print(f'{count} files; {out.stat().st_size:,} bytes; {out}')
if __name__=='__main__':main()
