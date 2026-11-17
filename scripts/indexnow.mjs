// Usage: node scripts/indexnow.mjs   (after a production deploy)
// Pings IndexNow (Bing, Yandex and others) with every URL in the live sitemap.
const host = 'solentmarineoutboards.co.uk';
const key = 'om-indexnow-solent-marine-key';
const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList })
});
console.log('IndexNow submitted', urlList.length, 'URLs, status', res.status);
