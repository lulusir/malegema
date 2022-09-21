export default {
  npmClient: 'pnpm',
  jsMinifier: 'none',
  // srcTranspiler:'swc'
  mfsu: false,
  extraBabelPlugins: [
    "babel-plugin-transform-typescript-metadata",
  ]
};
