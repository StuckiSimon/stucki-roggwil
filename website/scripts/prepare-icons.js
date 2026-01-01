import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { optimize } from 'svgo';
import { transform } from '@svgr/core';

const SOURCE_ICON_PATH = 'tmp/src-icons';
const DEST_ICON_PATH = 'src/visual-components/icon/assets';
const ICON_DATA_PATH = 'src/visual-components/icon/icon-data.tsx';

const PICTO_PREFIX = 'picto-';
const PREFIX_INVALID_VAR_CHAR = '_';

const iconConfig = {
  plugins: [{ name: 'removeDimensions' }, { name: 'convertColors', params: { currentColor: true } }],
};
const pictoConfig = {
  plugins: [{ name: 'removeDimensions' }],
};

const mapFileNameToPascalCase = (file) => {
  let flag = false;
  return file
    .replace('.svg', '')
    .split('')
    .map((char, i) => {
      if (flag || i === 0) {
        flag = false;
        return char.toUpperCase();
      }
      if (char === '-') {
        flag = true;
        return '';
      }
      return char;
    })
    .join('');
};

const startsWithInvalidVarChar = (str) => {
  return !/^[$A-Za-z_]/.test(str);
};

const mapToValidVarName = (file) => {
  if (startsWithInvalidVarChar(file)) {
    return `${PREFIX_INVALID_VAR_CHAR}${file}`;
  }
  return file;
};

const mapFileName = (file) => {
  const pascal = mapFileNameToPascalCase(file);
  return mapToValidVarName(pascal);
};

const optimizeAndGenerateTsx = async (files) => {
  if (!fs.existsSync(DEST_ICON_PATH)) {
    fs.mkdirSync(DEST_ICON_PATH, { recursive: true });
  }

  for (const file of files) {
    const srcPath = path.join(SOURCE_ICON_PATH, file);
    const destTsx = path.join(DEST_ICON_PATH, file.replace(/\.svg$/, '.tsx'));
    const svg = fs.readFileSync(srcPath, 'utf8');
    const isPicto = file.startsWith(PICTO_PREFIX);
    const config = isPicto ? pictoConfig : iconConfig;
    const optimized = optimize(svg, config).data;
    const componentName = mapFileName(file);

    const tsx = await transform(
      optimized,
      {
        plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        typescript: true,
        prettier: true,
      },
      { componentName },
    );

    fs.writeFileSync(destTsx, tsx, 'utf8');
  }
};

function writeIconDataFile(files) {
  const iconFiles = files.filter((file) => !file.startsWith(PICTO_PREFIX));
  const pictoFiles = files.filter((file) => file.startsWith(PICTO_PREFIX));

  const iconVariants = iconFiles.map((file) => `'${file.replace('.svg', '')}'`).join(' | ') || 'never';
  const pictoVariants = pictoFiles.map((file) => `'${file.replace('.svg', '')}'`).join(' | ') || 'never';

  const importLines = files
    .map((file) => {
      const pascal = mapFileName(file);
      return `const ${pascal} = React.lazy(() => import('./assets/${file.replace(/\.svg$/, '.tsx')}'));\n`;
    })
    .join('');

  const mapLines = files
    .map((file) => {
      const pascal = mapFileName(file);
      const key = file.replace('.svg', '');
      return `  '${key}': ${pascal},\n`;
    })
    .join('');

  const content = `import React from 'react';

export type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconVariant = ${iconVariants};
export type PictogramVariant = ${pictoVariants};

${importLines}
export const ICON_TYPE_COMPONENT_MAP: Record<IconVariant | PictogramVariant, SVGComponent> = {
${mapLines}};
`;

  fs.writeFileSync(ICON_DATA_PATH, content, 'utf8');
}

const runPrettier = (filePath) => {
  try {
    execSync(`npx prettier --write "${filePath}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error('Prettier konnte nicht ausgeführt werden:', e);
  }
};

const main = async () => {
  const files = fs.readdirSync(SOURCE_ICON_PATH).filter((f) => f.endsWith('.svg'));
  await optimizeAndGenerateTsx(files);
  writeIconDataFile(files);
  runPrettier(ICON_DATA_PATH);
};

main();
