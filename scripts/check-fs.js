import { readdirSync, lstatSync, readlinkSync, existsSync } from 'fs';
import { join } from 'path';

const scaffoldDir = '/vercel/share/v0-next-shadcn';
const projectDir = '/vercel/share/v0-project';

console.log('=== Scaffold root files ===');
try {
  const files = readdirSync(scaffoldDir);
  const configFiles = files.filter(f => f.includes('config') || f.includes('postcss') || f.includes('tailwind'));
  for (const f of configFiles) {
    const fullPath = join(scaffoldDir, f);
    const stat = lstatSync(fullPath);
    const isSymlink = stat.isSymbolicLink();
    let target = '';
    if (isSymlink) {
      try { target = readlinkSync(fullPath); } catch (e) { target = 'broken'; }
    }
    const realExists = existsSync(fullPath);
    console.log(`  ${f} | symlink=${isSymlink} | target=${target} | exists=${realExists}`);
  }
} catch (e) {
  console.log('Error reading scaffold:', e.message);
}

console.log('\n=== Project root files ===');
try {
  const files = readdirSync(projectDir);
  const configFiles = files.filter(f => f.includes('config') || f.includes('postcss') || f.includes('tailwind'));
  for (const f of configFiles) {
    const fullPath = join(projectDir, f);
    const stat = lstatSync(fullPath);
    const isSymlink = stat.isSymbolicLink();
    console.log(`  ${f} | symlink=${isSymlink} | exists=${existsSync(fullPath)}`);
  }
} catch (e) {
  console.log('Error reading project:', e.message);
}

console.log('\n=== Checking for next.config.ts specifically ===');
for (const dir of [scaffoldDir, projectDir, '/vercel/share', '/vercel']) {
  const tsPath = join(dir, 'next.config.ts');
  const lExists = existsSync(tsPath);
  let isSymlink = false;
  let target = '';
  try {
    const s = lstatSync(tsPath);
    isSymlink = s.isSymbolicLink();
    if (isSymlink) target = readlinkSync(tsPath);
  } catch {}
  console.log(`  ${tsPath} | exists=${lExists} | symlink=${isSymlink} | target=${target}`);
}

// Check if findUpSync would find next.config.ts
console.log('\n=== find-up simulation from scaffold dir ===');
let searchDir = scaffoldDir;
while (searchDir !== '/') {
  const tsPath = join(searchDir, 'next.config.ts');
  let found = false;
  try {
    lstatSync(tsPath);
    found = true;
  } catch {}
  if (found) console.log(`  FOUND: ${tsPath}`);
  searchDir = join(searchDir, '..');
}
