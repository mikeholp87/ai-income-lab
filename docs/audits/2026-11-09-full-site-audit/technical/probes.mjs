import {writeFile} from 'node:fs/promises';
const base='https://www.ai-automation-station.com';
const paths=['http://ai-automation-station.com/','http://www.ai-automation-station.com/','https://ai-automation-station.com/',base+'/index.html',base+'/guides',base+'/guides/9router-setup',base+'/guides/9router-setup.html/',base+'/audit-missing-20261109',base+'/watch/invalid',base+'/videos/9999',base+'/search?q=make',base+'/llms.txt',base+'/llms-full.txt'];
const results=[];
for (const url of paths) {
 try{const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(25000)});const body=await r.text();results.push({url,status:r.status,headers:Object.fromEntries(r.headers),title:body.match(/<title>(.*?)<\/title>/s)?.[1],robots:[...body.matchAll(/<meta name="robots" content="([^"]*)"/g)].map(m=>m[1])});if(url.endsWith('.txt'))await writeFile(new URL(url.split('/').at(-1),import.meta.url),body);}catch(e){results.push({url,error:e.message});}
 await new Promise(r=>setTimeout(r,1000));
}
await writeFile(new URL('route-probes.json',import.meta.url),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));console.log(JSON.stringify(results.map(r=>({url:r.url,status:r.status,location:r.headers?.location,robots:r.robots})),null,2));
