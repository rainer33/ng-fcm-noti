import { Component
        , EventEmitter
        , ViewChild
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';

import { SharedHttpService }      from '../../shared/service/shared-http.service';
import { Role }                   from '../models/role' ;

@Component({
  selector: 'role-modal',
  templateUrl: '../../../templates/system/user/role-modal.component.html'
})
export class RoleModalComponent { 
  role    : Role = new Role() ; 
  roles   : Role[] = [] ;
  xtedRoleusers : Role[] = [] ;
  @Output() close = new EventEmitter(); 
  @Output() addMenu = new EventEmitter<Role[]>();  
  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private sharedHttpService:SharedHttpService) {    
  }
  ngOnInit() {    

  }
  onAdd(){ 
    this.addMenu.emit(this.roles);   
    this.role = new Role(); 
  }
  onClose(){
    this.close.emit();
    this.role = new Role();
  }

  onSearch(){             // 조회
    let url = 'api/role/search';
    this.sharedHttpService.post(url,this.role).then(data=> {
        this.roles = data ;        
    }) ;
  }
}
