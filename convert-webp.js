const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets', 'images');
const QUALITY = 78;
const MAX_WIDTH = 1200;
const ICON_WIDTH = 512;
const HOST_WIDTH = 800;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;
const renames = []; // {old, new} for reference updates

async function convertFile(filePath) {
  const stat = fs.statSync(filePath);
  const rel = path.relative(ASSETS, filePath);
  const isIcon = rel.startsWith('icons');
  const isHost = rel.startsWith('host');
  const maxW = isIcon ? ICON_WIDTH : isHost ? HOST_WIDTH : MAX_WIDTH;
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const webpRel = path.relative(ASSETS, webpPath);

  try {
    const meta = await sharp(filePath).metadata();
    const buf = await sharp(filePath)
      .resize({ width: Math.min(meta.width, maxW), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();

    totalBefore += stat.size;
    totalAfter += buf.length;

    fs.writeFileSync(webpPath, buf);
    // Slet original PNG/JPG
    if (webpPath !== filePath) {
      fs.unlinkSync(filePath);
    }
    count++;

    const pctSaved = Math.round((1 - buf.length / stat.size) * 100);
    console.log(`  ${rel} -> ${webpRel}  (${(stat.size/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB, -${pctSaved}%)`);

    renames.push({
      old: 'assets/images/' + rel.replace(/\\/g, '/'),
      new: 'assets/images/' + webpRel.replace(/\\/g, '/')
    });
  } catch (e) {
    console.log(`  SKIP ${rel}: ${e.message}`);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(full);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      await convertFile(full);
    }
  }
}

function updateReferences(file, renames) {
  let content = fs.readFileSync(file, 'utf8');
  let changes = 0;
  for (const r of renames) {
    // Match both with and without path prefix, handle .png and .jpg
    const oldRef = r.old;
    const newRef = r.new;
    if (content.includes(oldRef)) {
      content = content.split(oldRef).join(newRef);
      changes++;
    }
    // Also try without assets/images/ prefix (some refs might be relative)
    const shortOld = oldRef.replace('assets/images/', '');
    const shortNew = newRef.replace('assets/images/', '');
    if (content.includes(shortOld) && !content.includes(newRef)) {
      content = content.split(shortOld).join(shortNew);
      changes++;
    }
  }
  if (changes > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ${path.basename(file)}: ${changes} referencer opdateret`);
  }
}

async function main() {
  console.log('Konverterer PNG/JPG -> WebP...\n');
  await walkDir(ASSETS);
  
  console.log(`\n${count} filer konverteret`);
  console.log(`Foer: ${(totalBefore/1024/1024).toFixed(0)} MB`);
  console.log(`Efter: ${(totalAfter/1024/1024).toFixed(0)} MB`);
  console.log(`Sparet: ${((totalBefore-totalAfter)/1024/1024).toFixed(0)} MB (${Math.round((1-totalAfter/totalBefore)*100)}%)\n`);

  console.log('Opdaterer referencer i kode...');
  const codeFiles = ['index.html', 'game.js', 'questions.js', 'style.css', 'admin.html', 'manifest.json', 'sw.js'];
  for (const f of codeFiles) {
    const full = path.join(__dirname, f);
    if (fs.existsSync(full)) {
      updateReferences(full, renames);
    }
  }
  console.log('\nFaerdig! Klar til deploy.');
}

main();
