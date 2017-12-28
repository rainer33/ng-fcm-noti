import { Component, OnInit }              from '@angular/core';
import { Routes, RouterModule, Router}    from '@angular/router' ;

import { BizInfo }                        from '../models/bizinfo' ;
import { SharedHttpService }              from '../../shared/service/shared-http.service';

@Component({
  selector: 'app-list',
  templateUrl: '../../../templates/biz/info/biz-info.component.html'  
})
export class BizInfoComponent implements OnInit {

  bizinfos : BizInfo[] = [] ;
  conditions : any = [];
  searchField : string = '1';
  searchkey : string = '';
  constructor(
      private router : Router
      , private sharedHttpService : SharedHttpService
    ) { }

  ngOnInit(){
    let url = 'api/bizinfo/list';
    let param = new BizInfo();
    this.sharedHttpService.post(url,param).then(data=> {
        this.bizinfos = data ;        
    }) ;  
    this.onInitCondition();
  }

  onInitCondition(){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;    
    param.codeParentId = 1050 ;   
    this.sharedHttpService.post(url, param).then(
      data => {
        this.conditions = data ;
      } // data
    ); // then
  }

  onSearch(){             // 조회
    let url = 'api/bizinfo/list';
    let param = new BizInfo();
    
    param.searchField = this.searchField ;
    param.searchKey = this.searchkey ;
    this.sharedHttpService.post(url,param).then(data=> {
        this.bizinfos = data ;        
    }) ;
  }

  onReset(){              // 초기화
        this.searchkey = '';
        this.ngOnInit();
  }

  onView(){
    let url = '/biz/bizview';        
    this.router.navigate([url],{ skipLocationChange : true}) ;
  }

  onRowClick(event){   
    let bizinfo:BizInfo = new BizInfo();
    let url = '/biz/bizview';        
    console.log('even onRowClick', event);
    bizinfo.svcSeqno = event.data.svcSeqno;
    this.router.navigate([url],{queryParams:bizinfo, skipLocationChange:true});    
  }

}