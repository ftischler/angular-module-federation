import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([
    {
      path: '',
      loadChildren: () => loadRemoteModule({
        remoteName: 'app1',
        remoteEntry: '/remotes/app1/remoteEntry.js',
        exposedModule: './Module'
      }).then(m => m.RemoteModule)
    }
  ] )],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
