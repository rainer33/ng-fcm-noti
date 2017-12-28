import { Component, OnInit } from '@angular/core';
import { Router}             from '@angular/router' ;
import { SharedHttpService } from '../../shared/service/shared-http.service';
import { Clients } from '../models/client' ;

@Component({
  selector: 'app-client-list',
  templateUrl: '../../../templates/biz/client/client-list.component.html'
})
export class ClientListComponent implements OnInit { 
  clients : Clients[] = [] ;
  constructor(
    private sharedHttpService : SharedHttpService
    , private router: Router
  ) { }
  ngOnInit() {
    let url = 'api/clients/list';
    let param = new Clients();
    this.sharedHttpService.post(url, param).then(data=> {
        this.clients = data ;        
    }) ;  
  }
  onRowClick(event){
    let url, param;
    url = '/biz/clientview';
    param = new Clients();
    param.companySeqno = event.data.companySeqno;
    this.router.navigate([url],{queryParams:param, skipLocationChange:true});
  }
  onView(){
    const url = '/biz/clientview' ;
    this.router.navigate([url],{skipLocationChange:true});
  }
}
