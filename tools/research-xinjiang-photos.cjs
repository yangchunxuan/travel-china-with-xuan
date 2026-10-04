const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const sources = [
  ['xinjiang-urumqi-hongshan', 'File:Urumqi skyline (3).jpg'],
  ['xinjiang-urumqi-midong-winter', 'File:20231217 Aerial view of Midong District, Urumqi 02.jpg'],
  ['xinjiang-jiaohe', 'File:Jiaohe City(Yarkhoto),Turpan,Xinjiang HY7.jpg'],
  ['xinjiang-tianchi', 'File:Tianshan Tianchi 2024.jpg'],
];
async function main() {
  const root = path.join(process.cwd(), 'public/images/tours/shared-scenes');
  const research = path.resolve(process.cwd(), '../product-photo-module-qa-20261002/xinjiang-sources');
  await fs.mkdir(root, {recursive:true}); await fs.mkdir(research, {recursive:true});
  const metadata = [];
  for (const [id, title] of sources) {
    const api = new URL('https://commons.wikimedia.org/w/api.php');
    api.search = new URLSearchParams({action:'query',format:'json',titles:title,prop:'imageinfo',iiprop:'url|size|extmetadata'});
    const res = await fetch(api, {headers:{'User-Agent':'HomegroundPhotoAudit/1.0'}});
    if (!res.ok) throw new Error(`metadata ${title}: ${res.status}`);
    const data = await res.json(); const info = Object.values(data.query.pages)[0]?.imageinfo?.[0];
    if (!info) throw new Error(`no imageinfo ${title}`);
    await fs.writeFile(path.join(research, id+'.json'), JSON.stringify(info,null,2));
    const media = await fetch(info.url, {headers:{'User-Agent':'HomegroundPhotoAudit/1.0'}});
    if (!media.ok) throw new Error(`image ${title}: ${media.status}`);
    const bytes = Buffer.from(await media.arrayBuffer());
    await fs.writeFile(path.join(research, id+'.jpg'),bytes);
    const output = path.join(root,id+'-1600.webp');
    await sharp(bytes).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:84}).toFile(output);
    const size = await sharp(output).metadata();
    metadata.push({id,title,sourceUrl:info.descriptionurl,downloadUrl:info.url,original:[info.width,info.height],output:[size.width,size.height],license:info.extmetadata.LicenseShortName?.value,licenseUrl:info.extmetadata.LicenseUrl?.value,artist:info.extmetadata.Artist?.value,date:info.extmetadata.DateTimeOriginal?.value});
    console.log(JSON.stringify(metadata.at(-1)));
  }
  await fs.writeFile(path.join(research,'manifest.json'),JSON.stringify(metadata,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
