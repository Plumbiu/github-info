import { buildSync } from 'esbuild'

buildSync({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  format: 'esm',
  minify: true,
  sourcemap: true,
  platform: 'node',
  treeShaking: true,
  bundle: true,
})
