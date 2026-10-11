import {mkdirSync, readFileSync, writeFileSync, copyFileSync} from 'node:fs';
mkdirSync('dist/fonts', {recursive:true});
for (const file of ['index.html','guide.html','privacy.html','repair.html','robots.txt','sitemap.xml','style.css','app.mjs','metrics.mjs','button-labels.mjs']) {
  const text = readFileSync(file,'utf8').replaceAll('https://stickcheck.niftycrow5.chatgpt.site','https://stickchecktest.app');
  writeFileSync('dist/'+file,text);
}
for(let i=0;i<9;i++) copyFileSync('font-'+i+'.ttf','dist/fonts/font-'+i+'.ttf');
console.log('Prepared StickCheck static assets in dist/');
