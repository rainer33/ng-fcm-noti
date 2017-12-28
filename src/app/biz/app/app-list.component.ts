import { Component, OnInit }              from '@angular/core';
import { Routes, RouterModule, Router}    from '@angular/router' ;

import { App }                            from '../models/app' ;
import { SharedHttpService }              from '../../shared/service/shared-http.service';

@Component({
  selector: 'app-list',
  templateUrl: '../../../templates/biz/app/app-list.component.html'  
})
export class AppListComponent implements OnInit {
  private viewUrl : string = '/biz/app/appview';
  apps : App[] = [] ;
  conditions : any = [];
  platformTypes : any = [];
  platformType : string = '';
  searchField : string = '1';
  searchkey : string = '';
  
  constructor(
      private router : Router
      , private sharedHttpService : SharedHttpService
    ) { }

  ngOnInit(){
    let url = 'api/app/list';
    let param = new App();
    this.sharedHttpService.post(url,param).then(data=> {
        this.apps = data ;        
    }) ;  
    this.onInitPlatformTypes() ; // OS종류
    this.onInitConditions() ; // APP 검색조건
  }

  onInitPlatformTypes(){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;    
    param.codeParentId = 1038 ;   
    this.sharedHttpService.post(url, param).then(
      data => {
        this.platformTypes = data ;
        this.platformTypes.unshift({label:'- Select -', value:''}) ;
      } // data
    ); // then
  }

  onInitConditions(){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;    
    param.codeParentId =  1057;   
    this.sharedHttpService.post(url, param).then(
      data => {
        this.conditions = data ;
      } // data
    ); // then
  }

  onSearch(){             // 조회
    let url = 'api/app/search';
    let param = new App();
    param.platformType = this.platformType;
    param.searchField = this.searchField ;
    param.searchKey = this.searchkey ;
    this.sharedHttpService.post(url,param).then(data=> {
        this.apps = data ;        
    }) ;
  }

  onReset(){              // 초기화
    this.platformType = '';
    this.searchkey = '';
    this.ngOnInit();
  }

  onView(){
    let url = '/biz/appview';        
    this.router.navigate([url],{ skipLocationChange : true}) ;
  }

  onRowClick(event){
    let url, param;   
    url = '/biz/appview';
    param = new App();
    param.appSeqno = event.data.appSeqno;
    this.router.navigate([url],{queryParams:param, skipLocationChange:true});    
  }

}
