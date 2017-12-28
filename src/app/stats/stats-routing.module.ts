import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';

import { StatsBizComponent }      from './stats-biz.component';
import { StatsDeptComponent }     from './stats-dept.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path:'', redirectTo:'biz',pathMatch:'full'}
        , {path:'biz', component: StatsBizComponent}   
        , {path:'dept', component: StatsDeptComponent}   
    ])
  ],
  exports: [RouterModule]
})
export class StatsRoutingModule { }