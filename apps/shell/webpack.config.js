const path = require('path');

const mf = require('@angular-architects/module-federation/webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { getSharedMappings, getRemotes, sharedModules, shell } = require('../../mf.config');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [...getSharedMappings()]);

module.exports = {
  output: {
    uniqueName: shell.name,
    publicPath: shell.publicPath
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ...getRemotes()
      },
      shared: {
        ...sharedModules,
        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ]
};
