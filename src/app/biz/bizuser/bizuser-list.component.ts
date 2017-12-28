import { Component, OnInit } from '@angular/core';
import { Router}             from '@angular/router' ;
import { Bizuser } from '../models/bizuser' ;
import { SharedHttpService } from '../../shared/service/shared-http.service' ;

@Component({
  selector: 'bizuser-list',
  templateUrl: '../../../templates/biz/bizuser/bizuser-list.component.html'  
})
export class BizuserListComponent implements OnInit {
  bizusers = [];
  constructor(
    private sharedHttpService: SharedHttpService
    , private router: Router
  ) {}
  ngOnInit() {
    let url, param ;
    url = 'api/svcuser/list' ;
    param = new Bizuser() ;
    this.sharedHttpService.post(url, param).then(
      data =>{
        this.bizusers = data ;
      } // data
    ) // then
  } // ngOnInit
  onView(){
    let url;
    url = '/biz/bizuserview';
    this.router.navigate([url],{skipLocationChange:true});
  }
  onRowClick(event){
    let url, param;
    url = '/biz/bizuserview';
    param = new Bizuser() ;
    param.svcUserSeqno = event.data.svcUserSeqno;
    this.router.navigate([url],{queryParams:param, skipLocationChange:true});
  }
}
