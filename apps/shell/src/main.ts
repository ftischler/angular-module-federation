import { loadRemoteEntry } from '@angular-architects/module-federation';
const { error } = console;

loadRemoteEntry( '/remotes/app1/remoteEntry.js', 'app1')
  .catch((err) => error('Error loading remote entries', err))
  .then(() => import('./bootstrap'))
  .catch((err) => error(err));
