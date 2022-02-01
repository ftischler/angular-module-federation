const mf = require('@angular-architects/module-federation/webpack');

const sharedMappings = [];

const sharedModules = mf.shareAll(
  {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    eager: false,
    includeSecondaries: {
      skip: ['@angular/common/http/testing']
    }
  },
  [
    'tslib',
    'zone.js',
    '@angular-architects/module-federation',
    '@angular-architects/module-federation-runtime'
  ]
);

const shell = {
  name: 'shell',
  publicPath: ''
};

const remotes = {
  app1: {
    name: 'app1',
    publicPath: 'auto',
    url: '/remotes/app1',
    entry: 'remoteEntry.js',
    exposes: {
      './Module': 'apps/app1/src/app/remote/remote.module.ts'
    }
  }
};

const getSharedMappings = () => sharedMappings;
const getRemote = (remote) => remotes[remote];
const getRemotes = () =>
  Object.fromEntries(Object.entries(remotes).map(([key, { name, url, entry }]) => [key, `${name}@${url}/${entry}`]));

module.exports = {
  getSharedMappings,
  sharedModules,
  shell,
  getRemote,
  getRemotes
};
