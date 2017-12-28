import { Component
        , EventEmitter
        , ViewChild
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';

import { SharedHttpService }      from '../../shared/service/shared-http.service';
import { Code }                   from '../models/code' ;
import { User }                   from '../models/user' ;

@Component({
  selector: 'roleuser-modal',
  templateUrl: '../../../templates/system/role/roleuser-modal.component.html'
})
export class RoleUserModalComponent { 
  user    : User = new User() ; 
  users   : User[] = [] ;
  xtedRoleusers : User[] = [] ;
  searchFields : Code[] = [] ;
  @Output() close = new EventEmitter(); 
  @Output() addMenu = new EventEmitter<User[]>();  
  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private sharedHttpService:SharedHttpService) {    
  }
  ngOnInit() {    
    let param : Code, url:string ;
    url = 'api/code/dropdown' ;
    param = new Code() ;
    param.codeParentId = 201 ;
    this.sharedHttpService.post(url, param).then(   // 
      data=>{
        this.searchFields = data ;
        console.log('this.codelist', this.searchFields) ;
      }
    );
  }
  onAdd(){                // 등록
    this.addMenu.emit(this.users);   
    this.user = new User(); 
  }
  onClose(){              // 닫기
    this.close.emit();
    this.user = new User();
  }

  onSearch(){             // 조회
    let url = 'api/user/search';
    this.sharedHttpService.post(url,this.user).then(data=> {
        this.users = data ;        
    }) ;
  }
}
