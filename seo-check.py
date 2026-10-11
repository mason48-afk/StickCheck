from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
import json,re
root=Path('dist');checks=0
class Page(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.ids=[];self.links=[];self.canonical=[];self.description=[];self.title='';self.inTitle=False
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='h1':self.h1+=1
  if t=='title':self.inTitle=True
  if 'id' in d:self.ids.append(d['id'])
  if t=='a' and 'href' in d:self.links.append(d['href'])
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d['href'])
  if t=='meta' and d.get('name')=='description':self.description.append(d['content'])
 def handle_endtag(self,t):
  if t=='title':self.inTitle=False
 def handle_data(self,d):
  if self.inTitle:self.title+=d
pages={}
for f in root.glob('*.html'):
 p=Page();p.feed(f.read_text());pages[f.name]=p
 assert p.h1==1,(f,'one H1 required');assert len(p.ids)==len(set(p.ids)),(f,'duplicate IDs');assert len(p.canonical)==1;assert len(p.description)==1 and 40<len(p.description[0])<200;assert 15<len(p.title)<85
 checks+=5
for name,p in pages.items():
 for link in p.links:
  if link.startswith('/'):
   u=urlparse(link);target=u.path.lstrip('/') or 'index.html';assert target in pages,(name,link)
   if u.fragment:assert u.fragment in pages[target].ids,(name,link)
   checks+=1
assert len(set(p.title for p in pages.values()))==len(pages);checks+=1
site=ET.parse(root/'sitemap.xml');urls=[x.text for x in site.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')];assert set(urls)==set(p.canonical[0] for p in pages.values());checks+=1
home=(root/'index.html').read_text();assert len(re.findall('<summary>',home))>=12;assert 'Why won’t my controller work?' in home;assert 'Controller button &amp; trigger test' in home or 'Controller button & trigger test' in home;checks+=3
assert 'Sitemap:' in (root/'robots.txt').read_text();checks+=1
print(f'{checks} local SEO structure checks passed: titles, descriptions, H1s, canonical URLs, internal links/fragments, sitemap, robots and crawlable Q&A. No ranking or search-volume test was performed. Private hosting still blocks public indexing.')
