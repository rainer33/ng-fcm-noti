import { Component, OnInit }              from '@angular/core';
import { Routes, RouterModule, Router}    from '@angular/router' ;

import { User }                           from '../models/user' ;
import { SharedHttpService }              from '../../shared/service/shared-http.service';


@Component({
  selector: 'user-list',
  templateUrl: '../../../templates/system/user/user-list.component.html'
})
export class UserListComponent implements OnInit {

  users : User[] = [] ;
  conditions : any = [];
  searchField : string = '';
  searchkey : string = '';
  constructor(
      private router : Router
      , private sharedHttpService : SharedHttpService
    ) { }

  ngOnInit(){
    let url = 'api/user/list';
    let param = new User();
    this.sharedHttpService.post(url,param).then(data=> {
        this.users = data ;        
    }) ; 
    this.onInitCondition(); 
  }

  onInitCondition(){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;    
    param.codeParentId = 201 ;   
    this.sharedHttpService.post(url, param).then(
      data => {
        this.conditions = data ;
      } // data
    ); // then
  }
  
  onSearch(){             // 조회
    let url = 'api/user/search';
    let param = new User();
    param.searchField = this.searchField ;
    param.searchKey = this.searchkey ;
    this.sharedHttpService.post(url,param).then(data=> {
        this.users = data ;        
    }) ;
  }

  onReset(){              // 초기화
        this.searchkey = '';
        this.ngOnInit();
  }

  onView(){
    let url = '/system/userview';        
    this.router.navigate([url],{ skipLocationChange : true}) ;
  }

  onRowClick(event){   
    let user:User = new User();
    let url = '/system/userview';
    console.log('even onRowClick', event);
    user.userNo = event.data.userNo;
    this.router.navigate([url],{queryParams:user, skipLocationChange:true});    
  }

}