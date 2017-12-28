import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';

import { ClientListComponent }    from './client/client-list.component';
import { ClientViewComponent }    from './client/client-view.component' ;
import { BizuserListComponent }   from './bizuser/bizuser-list.component';
import { BizuserViewComponent }   from './bizuser/bizuser-view.component';
import { BizInfoComponent }       from './info/biz-info.component';
import { BizViewComponent }       from './info/biz-view.component';
import { AppListComponent }       from './app/app-list.component';
import { AppViewComponent }       from './app/app-view.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path:'', redirectTo:'client',pathMatch:'full'}
        , {path:'client', component: ClientListComponent}  
        , {path:'clientview', component: ClientViewComponent}    
        , {path:'bizuser', component: BizuserListComponent}   
        , {path:'bizuserview', component: BizuserViewComponent} 
        , {path:'info', component: BizInfoComponent} 
        , {path:'bizview', component: BizViewComponent}           
        , {path:'app',component: AppListComponent}   
        , {path:'appview',component: AppViewComponent}   
    ])
  ],
  exports: [RouterModule]
})
export class BizRoutingModule { }