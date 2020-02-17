const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: true,
      },
    },
  ],
  'minify',
]

const plugins = [
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
]

module.exports = { presets, plugins }
