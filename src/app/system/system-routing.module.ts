import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';

import { MenuTreeComponent }      from './menu/menu-tree.component';
import { UserListComponent }      from './user/user-list.component';
import { UserViewComponent }      from './user/user-view.component';
import { CodeTreeComponent }      from './code/code-tree.component';
import { OrgListComponent }       from './org/org-list.component';
import { RoleListComponent }      from './role/role-list.component';
import { RoleViewComponent }      from './role/role-view.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path:'', redirectTo:'menu',pathMatch:'full'}
        ,{path:'menu', component: MenuTreeComponent} 
        ,{path:'user', component: UserListComponent}   
        ,{path:'userview', component: UserViewComponent}   
        ,{path:'code', component: CodeTreeComponent} 
        ,{path:'org', component: OrgListComponent} 
        ,{path:'role', component: RoleListComponent}   
        ,{path:'roleview', component: RoleViewComponent}   
    ])
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule { }