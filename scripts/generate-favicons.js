import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve('public/favicon.svg');
const publicDir = path.resolve('public');

async function createIco(pngBuffers, sizes) {
  // ICO header: 6 bytes
  // Count: pngBuffers.length
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = numImages * dirEntrySize;

  let currentOffset = headerSize + dirSize;
  const dirEntries = [];

  for (let i = 0; i < numImages; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entry = Buffer.alloc(16);

    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image data size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);

    currentOffset += buf.length;
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4); // count

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function generate() {
  console.log('Generating PNG favicons from:', svgPath);
  const svgBuffer = fs.readFileSync(svgPath);

  const pngSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Recommended by Google
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-144x144.png', size: 144 },
    { name: 'favicon-192.png', size: 192 },
    { name: 'favicon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];

  const icoSizes = [16, 32, 48];
  const icoPngBuffers = [];

  for (const { name, size } of pngSizes) {
    const outPath = path.join(publicDir, name);
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();

    fs.writeFileSync(outPath, buf);
    console.log(`✓ Created ${name} (${size}x${size})`);

    if (icoSizes.includes(size)) {
      icoPngBuffers.push(buf);
    }
  }

  // Create favicon.ico
  const icoBuffer = await createIco(icoPngBuffers, icoSizes);
  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`✓ Created favicon.ico (16x16, 32x32, 48x48)`);

  console.log('All favicons successfully generated!');
}

generate().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
