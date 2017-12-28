import { NgModule }                 from '@angular/core';
import { CommonSharedModule }       from '../shared/common-shared.module';
import { SharedHttpService }        from '../shared/service/shared-http.service';
import { DialogModule, 
  ConfirmDialogModule }             from 'primeng/primeng';
import { BizRoutingModule }         from './biz-routing.module' ;
import { ClientListComponent }      from './client/client-list.component';
import { BizuserListComponent }     from './bizuser/bizuser-list.component';
import { BizuserViewComponent }     from './bizuser/bizuser-view.component';
import { AppListComponent }         from './app/app-list.component';
import { AppViewComponent }         from './app/app-view.component';
import { BizInfoComponent }         from './info/biz-info.component';
import { BizViewComponent }         from './info/biz-view.component';
import { ClientViewComponent } from './client/client-view.component' ;

@NgModule({
  imports: [
    BizRoutingModule
    , CommonSharedModule
    , DialogModule
    , ConfirmDialogModule    
  ],
  declarations: [
    ClientListComponent  
    , BizuserListComponent
    , BizuserViewComponent 
    , AppListComponent
    , AppViewComponent
    , BizInfoComponent
    , BizViewComponent
    , ClientViewComponent
  ],
  providers:[ 
    SharedHttpService
  ]
})
export class BizModule { }
