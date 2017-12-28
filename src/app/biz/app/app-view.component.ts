import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;
import { Validator, AbstractControl, NG_VALIDATORS }      from '@angular/forms' ;

import { App }                                            from '../models/app' ;
import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';

@Component({
  selector: 'app-view',
  templateUrl: '../../../templates/biz/app/app-view.component.html'  
})
export class AppViewComponent implements OnInit {
  app : App = new App();
  platformTypes : any = [];
  pushApiTypes : any = [];
  msgAppId='';
  msgAppName='';

  hButtonSearch   : string = "검색" ;
  hButtonDoubleCheck : string = "중복확인" ;

  hButtonAdd      : string = "등록" ;
  hButtonUpdate   : string = "수정" ;
  hButtonReset    : string = "초기화" ;
  hButtonList     : string = "목록" ;
  hButtonDelete   : string = "삭제" ;

  hAppView : string = "APP 상세정보" ;

  checkYN : boolean = false;

  //msgs: Message[];
  msgs: any[];
  uploadedFiles: any[] = [];

  @ViewChild('appForm') appForm : NgForm ;
  
  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {      // 상세조회 화면
    let url, param, queryParams;
    url = 'api/app/data';
    param = new App();
    queryParams = this.route.queryParams['_value'];
    if (queryParams.appSeqno > 0) {
      param.appSeqno = queryParams.appSeqno;
      this.sharedHttpService.post(url, param).then(data=> {
        this.app = data;
        if (this.app.appSeqno > 0) {
          this.onInitPushApiTypes(this.app.platformType) ; // OS에 따른 API TYPE
        }
      });
    } else {
      this.app.platformType = 'A';
    }

    this.authInfo();
    
    this.onInitPlatformTypes() ; // OS종류
    this.onInitPushApiTypes(this.app.platformType) ; // OS에 따른 API TYPE
  }

  onInitPushApiTypes(platformType){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;
    if (platformType == 'A' || platformType == null) {
      param.codeParentId = 1110 ; 
    } else if (platformType == 'I') {
      param.codeParentId = 1041 ; 
    } else if (platformType == 'W') {
      // 웹앱은 임의로 안드로이드와 동일하게 세팅함.
      param.codeParentId = 1110 ; 
    }    
    this.sharedHttpService.post(url, param).then(
      data => {
        this.pushApiTypes = data ;
      } // data
    ); // then
  }

  onInitPlatformTypes(){
    let url, param ;   
    url = 'api/code/dropdown' ;
    param = {} ;    
    param.codeParentId = 1038 ;   
    this.sharedHttpService.post(url, param).then(
      data => {
        this.platformTypes = data ;
      } // data
    ); // then
  }

  authInfo() {
    if ( this.app.validCertFile == true && this.app.expiryDate != ''){
			var expiryDate = new Date(this.app.expiryDate);
			var nowDate = new Date();
			expiryDate.setMonth(expiryDate.getMonth()-1);
			if ( expiryDate.getTime() <= nowDate.getTime()){
				//$('#expiryDateFormat').css('font-color' , 'red');
			}
    }
  }

  onFormValidCheck(){   // 입력 폼 유효성 검증
    if(!this.appForm.controls.appId.valid){  
      this.msgAppId = "ID는 반드시 입력하여 주십시오" ; 
    }else{
      this.msgAppId = "" ;
    }
    if(!this.appForm.controls.appName.valid){  
      this.msgAppName = "이름은 반드시 입력하여 주십시오" ; 
    }else{
      this.msgAppName = "" ;
    }      
  }

  onAdd(){             // 등록
    this.onFormValidCheck() ;
    if(!this.appForm.valid || !this.checkYN){
      return ;    
    }  

    // 이용여부는 제외
    this.app.useYn = 'N';
    // 고객사 임의세팅
    this.app.companySeqno = 2;

    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Insert Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/app/add';
        this.onAUD(url,this.app);  
      }
    });      
  }

  onUpdate(){             // 수정
    this.onFormValidCheck() ;
    if(!this.appForm.valid){
      return ;    
    }  

    // 이용여부는 제외
    this.app.useYn = 'N';
    // 고객사 임의세팅
    this.app.companySeqno = 2;

    this.confirmationService.confirm({
      message: '수정하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/app/update';
        this.onAUD(url,this.app);  
      }
    }); 
  }

  onDelete(){             // 삭제
    this.confirmationService.confirm({
      message: '삭제하시겠습니까?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let url = 'api/app/delete';
        this.onAUD(url,this.app);  
      }
    });  
  }

  onList(){               // 목록
    this.router.navigate(['/biz/app']) ;
  }

  onCheckId(){             // 중복체크
    if(!this.appForm.controls.appId.valid){  
      this.msgAppId = "ID는 반드시 입력하여 주십시오" ; 
      return;
    }else{
      this.msgAppId = "" ;
    }    

    let url = 'api/app/checkId';
    this.sharedHttpService.post(url, this.app).then(data=> {
    //this.app = data ;
    let title, msg ;
   
    if(data.success){
      title='SUCCESS!';
      msg='사용가능한 ID입니다.';        
    }else{
      title='FAIL';
      msg='이미 사용중인 ID입니다.';
    } 
    this.msgBoxService.onResponse(title, msg) ; 
    }) ;
    
    this.checkYN = true;
  }

  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }

  changedPlatformType (event) {
    this.onInitPushApiTypes(event) ; // OS에 따른 API TYPE
  }

  onBasicUpload(event) {        
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
  }

}