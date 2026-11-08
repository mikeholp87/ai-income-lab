import { readFile, writeFile } from 'node:fs/promises';
const out = new URL('./', import.meta.url);
const base = 'https://www.ai-automation-station.com';
const crawl = JSON.parse(await readFile(new URL('crawl.json', out), 'utf8'));
async function request(url, redirect = 'manual', timeout = 25000) {
  try {
    const r = await fetch(url, { redirect, signal: AbortSignal.timeout(timeout) });
    const body = await r.text();
    return { url, status: r.status, finalUrl: r.url, headers: Object.fromEntries(['location','content-type','x-robots-tag','strict-transport-security','cache-control'].map(k=>[k,r.headers.get(k)])), body };
  } catch (e) { return { url, error:e.message }; }
}
const paths = ['http://ai-automation-station.com/', 'http://www.ai-automation-station.com/', 'https://ai-automation-station.com/', `${base}/index.html`, `${base}/guides`, `${base}/guides/9router-setup`, `${base}/guides/9router-setup.html/`, `${base}/seo-audit-missing-20261108`, `${base}/watch/invalid`, `${base}/videos/9999`, `${base}/videos?sort=popular`, `${base}/workflow-cost.html`];
const probes = [];
for(let i=0;i<paths.length;i+=4) probes.push(...await Promise.all(paths.slice(i,i+4).map(u=>request(u))));
await writeFile(new URL('route-probes.json',out),JSON.stringify(probes.map(({body,...r})=>({...r,title:body?.match(/<title>(.*?)<\/title>/s)?.[1],robots:[...body?.matchAll(/<meta name="robots" content="([^"]*)"/g)??[]].map(m=>m[1])})),null,2));
const assets = [...new Set(crawl.pages.flatMap(p=>(p.images??[]).flatMap(i=>[i.src,...(i.srcset??'').split(',').map(s=>s.trim().split(/\s/)[0])])).filter(s=>s?.startsWith('/assets/guides/')))];
const assetResults=[];
for(let i=0;i<assets.length;i+=5) assetResults.push(...await Promise.all(assets.slice(i,i+5).map(async p=>{const r=await request(base+p);return {url:r.url,status:r.status,contentType:r.headers?.['content-type'],error:r.error};})));
await writeFile(new URL('guide-image-probes.json',out),JSON.stringify(assetResults,null,2));
console.log(JSON.stringify({routes:probes.map(({body,...r})=>({...r,robots:[...body?.matchAll(/<meta name="robots" content="([^"]*)"/g)??[]].map(m=>m[1])})),guideImages:assets.length,imageErrors:assetResults.filter(r=>r.status!==200)},null,2));
const psi = await Promise.all(['/', '/guides/9router-setup.html', '/watch/IV6q81wRay4'].map(async p=>{
  const url=`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(base+p)}&strategy=mobile&category=performance&category=seo`;
  const r=await request(url,'follow',90000);
  let data;
  try{data=JSON.parse(r.body??'null');}catch{/* non-JSON error */}
  await writeFile(new URL(`psi-${p==='/'?'home':p.includes('/guides/')?'guide':'watch'}.json`,out),JSON.stringify({checkedAt:new Date().toISOString(),status:r.status,error:r.error,data},null,2));
  return {page:base+p,status:r.status,error:r.error??data?.error?.message,scores:data?.lighthouseResult?.categories};
}));
console.log(JSON.stringify({psi},null,2));
