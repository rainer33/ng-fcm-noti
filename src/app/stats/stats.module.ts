import { NgModule }                 from '@angular/core';
import { CommonSharedModule }       from '../shared/common-shared.module';
import { SharedHttpService }        from '../shared/service/shared-http.service';
import { DialogModule, CalendarModule }  from 'primeng/primeng';
import { StatsRoutingModule }       from './stats-routing.module' ;
import { StatsBizComponent }        from './stats-biz.component';
import { StatsDeptComponent }       from './stats-dept.component';
import { OrgModalComponent }        from './org-modal.component';

@NgModule({
  imports: [
    StatsRoutingModule
    , CommonSharedModule
    , CalendarModule  
    , DialogModule      
  ],
  declarations: [
    StatsBizComponent  
    , StatsDeptComponent
    , OrgModalComponent    
  ],
  providers:[ 
    SharedHttpService
  ]
})
export class StatsModule { }
