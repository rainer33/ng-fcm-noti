import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { Clients }                                        from '../models/client' ;
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;
import { Validator, AbstractControl, NG_VALIDATORS }      from '@angular/forms' ;
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';


@Component({
  selector: 'client-view',
  templateUrl: '../../../templates/biz/client/client-view.component.html'
})
export class ClientViewComponent implements OnInit { 
  clients : Clients = new Clients() ;

  @ViewChild('dataForm') dataForm : NgForm ;
  
  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute   
  ) { }
  ngOnInit() {
    let url, param, queryParams;
    url = 'api/clients/data';
    param = new Clients();
    queryParams = this.route.queryParams['_value'] ;   
    if(queryParams.companySeqno > 0){
      param.companySeqno = queryParams.companySeqno ;
      this.sharedHttpService.post(url, param).then(data=> {
        this.clients = data ;        
      }) ;  
    }    
  }

  onFormValidCheck(){   // 입력 폼 유효성 검증
    if(!this.dataForm.controls.svcName.valid){  
      //this.msgSvcName = "서비스명은 반드시 입력하여 주십시오" ; 
    }else{
      //this.msgSvcName = "" ;
    }
    if (this.clients.companySeqno > 0) {
      if(!this.dataForm.controls.svcCode.valid){  
        //this.msgSvcCode = "서비스코드는 반드시 입력하여 주십시오" ; 
      }else{
        //this.msgSvcCode = "" ;
      }  
    }
  }

  onAdd(){             // 등록
    //this.onFormValidCheck() ;
    if(!this.dataForm.valid){
      return ;    
    }    

    // TODO 임시세팅
    this.clients.companySeqno = 2 ;
   //this.clients.useYn = 'N';

    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Insert Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/clients/add';
        this.onAUD(url,this.clients);  
      }
    });      
   
  }

  onUpdate(){             // 수정
    
       // this.onFormValidCheck() ;
        if(!this.dataForm.valid){
          return ;    
        }  
    
        this.confirmationService.confirm({
          message: '수정하시겠습니까?',
          header: 'Update Confirmation',
          icon: 'fa fa-question-circle',      
          accept: () => {
            let url = 'api/clients/update';
            this.onAUD(url,this.clients);  
          }
        });        
      }
    
      onDelete(){             // 삭제
        this.confirmationService.confirm({
          message: '삭제하시겠습니까?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            let url = 'api/clients/delete';
            this.onAUD(url,this.clients);  
          }
        });  
      }

  onView(){}

  onList(){
    let url;
    url = '/biz/client' ;
    this.router.navigate([url]) ;
  }

  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }
  
}
