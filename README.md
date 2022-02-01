# Module Federation Bug Reproduction Repo

This is repo is meant to reproduce a bug with module federation in Angular 12.

- This repo uses Nrwl Nx v12 and Angular v12
- It also uses module federation powered by webpack 5 and @angular-architects/module-federation
- For building with custom webpack config the webpack-builders of Nrwl Nx are used
- IE 11 Support is enabled via .browserslistrc - this bug does not occur if IE11 Support is disabled

To Reproduce the bug please do the following steps:

1. Run `nx build shell --prod` 
2. Run `nx build app1 --prod` (this also builds the remoteEntry.js for Module Federation)
3. See the output of the file [dist/apps/app1/remoteEntry.js](dist/apps/app1/remoteEntry.js). It starts with `var app1;`
4. Start the command `yarn serve:prod`
5. Open the browser and navigate to `http://localhost:3000`
6. The app works fine
7. Run `nx build app1 --prod` again
8. See the output of the file [dist/apps/app1/remoteEntry.js](dist/apps/app1/remoteEntry.js) again. It does not start with `var app1;` anymore
9. Start the command `yarn serve:prod`
10. Open the browser and navigate to `http://localhost:3000`
11. Open the console and see the error
12. Repeat steps 7-11 again. The error persists
13. Remove the folder `node_modules/.cache/angular-build-dl` by e.g. running `rm -rf node_modules/.cache/angular-build-dl`
14. Repeat steps 1-6 and see that the app works fine again
15. If you repeat steps 7-11 again the app will be broken until the folder `node_modules/.cache/angular-build-dl` is the deleted again
