import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;
import { Validator, AbstractControl, NG_VALIDATORS }      from '@angular/forms' ;

import { BizInfo }                                        from '../models/bizinfo' ;
import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';

@Component({
  selector: 'biz-view',
  templateUrl: '../../../templates/biz/info/biz-view.component.html'
})
export class BizViewComponent implements OnInit {
  bizinfo : BizInfo = new BizInfo() ;
  msgSvcName : string = "서비스명을 입력하세요" ;
  msgSvcCode : string = "" ; 
  msgModeUser : string = "" ; 
  msgModeDt : string = "" ; 
  
  hButtonSearch   : string = "검색" ;
  hButtonAdd      : string = "등록" ;
  hButtonUpdate   : string = "수정" ;
  hButtonReset    : string = "초기화" ;
  hButtonList     : string = "목록" ;
  hButtonDelete   : string = "삭제" ;

  hBizView : string = "업무 정보" ;

  checkYN : boolean = false;
  display : boolean = false;

  @ViewChild('bizForm') bizForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute
    ) { }

  ngOnInit() {    
    let url = 'api/bizinfo/data';
    let param = this.route.queryParams['_value'] ;   

    if(param.svcSeqno > 0){
      this.sharedHttpService.post(url, param).then(data=> {
        this.bizinfo = data ;
        console.log('this.user userview ngOnInit after selectUser', this.bizinfo);
      }) ;
    }  
  }

  onFormValidCheck(){   // 입력 폼 유효성 검증
    if(!this.bizForm.controls.svcName.valid){  
      this.msgSvcName = "서비스명은 반드시 입력하여 주십시오" ; 
    }else{
      this.msgSvcName = "" ;
    }
    if (this.bizinfo.svcSeqno > 0) {
      if(!this.bizForm.controls.svcCode.valid){  
        this.msgSvcCode = "서비스코드는 반드시 입력하여 주십시오" ; 
      }else{
        this.msgSvcCode = "" ;
      }  
    }
  }

  onAdd(){             // 등록
    this.onFormValidCheck() ;
    if(!this.bizForm.valid){
      return ;    
    }    

    // TODO 임시세팅
    this.bizinfo.companySeqno = 2 ;
    this.bizinfo.useYn = 'N';

    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Insert Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/bizinfo/add';
        this.onAUD(url,this.bizinfo);  
      }
    });      
   
  }

  onUpdate(){             // 수정

    this.onFormValidCheck() ;
    if(!this.bizForm.valid || !this.checkYN){
      return ;    
    }  

    this.confirmationService.confirm({
      message: '수정하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/bizinfo/update';
        this.onAUD(url,this.bizinfo);  
      }
    });        
  }

  onDelete(){             // 삭제
    this.confirmationService.confirm({
      message: '삭제하시겠습니까?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let url = 'api/bizinfo/delete';
        this.onAUD(url,this.bizinfo);  
      }
    });  
  }

  onList(){               // 목록
    this.router.navigate(['/biz/info']) ;
  }

  onCheckId(){             // 중복체크
    if(!this.bizForm.controls.svcCode.valid){  
      this.msgSvcCode = "서비스코드는 반드시 입력하여 주십시오" ; 
      return;
    }else{
      this.msgSvcCode = "" ;
    }    

    let url = 'api/bizinfo/checkId';
    this.sharedHttpService.post(url, this.bizinfo).then(data=> {
    this.bizinfo = data ;
    let title, msg ;
   
    if(data.success){
      title='SUCCESS!';
      msg='사용가능한 코드입니다.';        
    }else{
      title='FAIL';
      msg='이미 사용중인 코드입니다.';
    } 
    this.msgBoxService.onResponse(title, msg) ; 
    }) ;
    
    this.checkYN = true;
  }


  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }

}
