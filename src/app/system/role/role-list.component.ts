import { Component, OnInit } from '@angular/core';
import { Router}             from '@angular/router' ;
import { Role }              from '../models/role';
import { SharedHttpService } from '../../shared/service/shared-http.service';

@Component({
  selector: 'role-list',
  templateUrl: '../../../templates/system/role/role-list.component.html'  
})
export class RoleListComponent implements OnInit {
  roles : Role[] = [];  

  constructor(
    private router:Router
    , private sharedHttpService : SharedHttpService
  ) { }

  ngOnInit() {
    let url = 'api/role/list';
    let param = new Role();
    this.sharedHttpService.post(url, param).then(data=> {
        this.roles = data ;        
    }) ;  
  }
  onView(){
    let url = '/system/roleview';
    this.router.navigate([url],{skipLocationChange:true});
  }
  onRowClick(event){
    let role:Role = new Role();
    let url = '/system/roleview';
    console.log('even onRowClick', event);
    role.rolegroupId = event.data.rolegroupId;
    this.router.navigate([url],{queryParams:role, skipLocationChange:true});
  }
}
