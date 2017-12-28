import { NgModule }              from '@angular/core';
import { CommonSharedModule }    from '../shared/common-shared.module';

import { SystemRoutingModule }   from './system-routing.module';
import { SharedHttpService }     from '../shared/service/shared-http.service';
import { DialogModule, 
         PasswordModule,
         ConfirmDialogModule }   from 'primeng/primeng';
import { MenuTreeComponent }     from './menu/menu-tree.component';
import { MenuAddModalComponent } from './menu/menu-add-modal.component';
import { UserListComponent }     from './user/user-list.component';
import { UserViewComponent }     from './user/user-view.component';
import { CodeTreeComponent }     from './code/code-tree.component';
import { CodeAddModalComponent } from './code/code-add-modal.component' ;
import { OrgListComponent }      from './org/org-list.component';
import { OrgAddModalComponent }  from './org/org-add-modal.component' ;
import { RoleListComponent }     from './role/role-list.component';
import { RoleViewComponent }     from './role/role-view.component' ;
import { RoleUserModalComponent } from './role/roleuser-modal.component' ;
import { RoleModalComponent }     from './user/role-modal.component' ;


@NgModule({
  imports: [
    CommonSharedModule
    , SystemRoutingModule    
    , DialogModule
    , PasswordModule
    , ConfirmDialogModule    
  ],
  declarations: [
    MenuTreeComponent
    , MenuAddModalComponent 
    , UserListComponent
    , UserViewComponent
    , CodeTreeComponent 
    , CodeAddModalComponent
    , OrgListComponent
    , OrgAddModalComponent
    , RoleListComponent
    , RoleViewComponent
    , RoleUserModalComponent
    , RoleModalComponent

  ],
  providers:[ 
    SharedHttpService
  ]
})
export class SystemModule {}
