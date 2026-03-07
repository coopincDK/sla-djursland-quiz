const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets', 'images');
const MAX_WIDTH = 1200;  // max bredde for scene/baggrundsbilleder
const ICON_WIDTH = 512;  // max bredde for ikoner
const HOST_WIDTH = 800;  // max bredde for host-billeder
const QUALITY = 80;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function optimizeFile(filePath) {
  const stat = fs.statSync(filePath);
  const sizeMB = stat.size / 1024 / 1024;
  
  // Spring over filer under 500KB
  if (stat.size < 500 * 1024) return;
  
  const rel = path.relative(ASSETS, filePath);
  const isIcon = rel.startsWith('icons');
  const isHost = rel.startsWith('host');
  const maxW = isIcon ? ICON_WIDTH : isHost ? HOST_WIDTH : MAX_WIDTH;
  
  try {
    const img = sharp(filePath);
    const meta = await img.metadata();
    
    const buf = await sharp(filePath)
      .resize({ width: Math.min(meta.width, maxW), withoutEnlargement: true })
      .png({ quality: QUALITY, compressionLevel: 9, effort: 10 })
      .toBuffer();
    
    totalBefore += stat.size;
    totalAfter += buf.length;
    
    if (buf.length < stat.size) {
      fs.writeFileSync(filePath, buf);
      count++;
      console.log(`  ${rel}: ${sizeMB.toFixed(1)}MB -> ${(buf.length/1024/1024).toFixed(1)}MB`);
    }
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
      await optimizeFile(full);
    }
  }
}

async function main() {
  console.log('Optimerer billeder...\n');
  await walkDir(ASSETS);
  console.log(`\nFaerdig! ${count} filer optimeret`);
  console.log(`Foer: ${(totalBefore/1024/1024).toFixed(0)} MB`);
  console.log(`Efter: ${(totalAfter/1024/1024).toFixed(0)} MB`);
  console.log(`Sparet: ${((totalBefore-totalAfter)/1024/1024).toFixed(0)} MB`);
}

main();
