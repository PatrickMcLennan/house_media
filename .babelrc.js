module.exports = {
  presets: ["next/babel"],
  plugins: [
      'babel-plugin-transform-typescript-metadata',
      ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true, legacy: false }],
      ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ],
}