const path = require('path');

const mf = require('@angular-architects/module-federation/webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { getSharedMappings, getRemote, sharedModules } = require('../../mf.config');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [...getSharedMappings()]);

const remote = getRemote('app1');

module.exports = {
  output: {
    uniqueName: remote.name,
    publicPath: remote.publicPath,
    scriptType: remote.scriptType
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
      name: remote.name,
      filename: remote.entry,
      exposes: remote.exposes,
      shared: {
        ...sharedModules,
        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ]
};
