import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { AppComponent }           from './app.component';

const appRoutes: Routes = [
 { path: 'biz', loadChildren:'./biz/biz.module#BizModule' } 
 , { path: 'system', loadChildren:'./system/system.module#SystemModule' }
 , { path: 'message', loadChildren:'./message/message.module#MessageModule' }
 , { path: 'stats', loadChildren:'./stats/stats.module#StatsModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } 
  )],// <-- debugging purposes only
  exports: [RouterModule]
})
export class AppRoutingModule { }