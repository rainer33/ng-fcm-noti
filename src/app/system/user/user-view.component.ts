import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;
import { Validator, AbstractControl, NG_VALIDATORS }      from '@angular/forms' ;
import { User }                                           from '../models/user' ;
import { EqualsValidator }                                from '../../system/user/equals-validator.directive';
import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';

@Component({
  selector: 'user-view',
  templateUrl: '../../../templates/system/user/user-view.component.html'
})
export class UserViewComponent implements OnInit {
  user : User = new User() ;
  msgUserName : string = "" ;
  msgUserId   : string = "" ; 
  msgUserPassword  : string = "비밀번호는 반드시 입력하여 주십시오" ; 
  msgNotMatch : string = "비밀번호가 일치하지 않습니다." ; 

  hUser     : string = "성명" ;
  hId       : string = "ID" ;
  hPassword : string = "비밀번호" ;
  hPasswordCheck : string = "비밀번호 확인" ;
  
  hButtonSearch   : string = "검색" ;
  hButtonDoubleCheck : string = "중복확인" ;

  hButtonAdd      : string = "등록" ;
  hButtonUpdate   : string = "수정" ;
  hButtonReset    : string = "초기화" ;
  hButtonList     : string = "목록" ;
  hButtonDelete   : string = "삭제" ;

  hUserView : string = "사용자 정보" ;

  checkYN : boolean = false;
  display : boolean = false;
  rolelist = [] ;

  @ViewChild('userForm') userForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {    
    let url = 'api/user/data';
    let param = this.route.queryParams['_value'] ;   

    if(param.userNo > 0){
      this.sharedHttpService.post(url, param).then(data=> {
        this.user = data ;
        console.log('this.user userview ngOnInit after selectUser', this.user);
      }) ;
    }  
  }

  onFormValidCheck(){   // 입력 폼 유효성 검증
    if(!this.userForm.controls.userName.valid){  
      this.msgUserName = "이름은 반드시 입력하여 주십시오" ; 
    }else{
      this.msgUserName = "" ;
    }
    if(!this.userForm.controls.userId.valid){  
      this.msgUserId = "ID는 반드시 입력하여 주십시오" ; 
    }else{
      this.msgUserId = "" ;
    }
    if(!this.userForm.controls.userPassword.valid){  
      this.msgUserPassword = "비밀번호는 반드시 입력하여 주십시오" ; 
    }else{
      this.msgUserPassword = "" ;
    }         
  }

  onAdd(){             // 등록
    this.onFormValidCheck() ;
    if(!this.userForm.valid || !this.checkYN){
      return ;    
    }    
    
    this.user.deleteYn = 'Y' ; 

    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Insert Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/user/add';
        this.onAUD(url,this.user);  
      }
    });      
   
  }

  onUpdate(){             // 수정

    this.onFormValidCheck() ;
    if(!this.userForm.valid){
      return ;    
    }  

    this.confirmationService.confirm({
      message: '수정하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/user/update';
        this.onAUD(url,this.user);  
      }
    });        
  }

  onDelete(){             // 삭제
    this.confirmationService.confirm({
      message: '삭제하시겠습니까?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let url = 'api/user/delete';
        this.onAUD(url,this.user);  
      }
    });  
  }

  onList(){               // 목록
    this.router.navigate(['/system/user']) ;
  }

  onCheckId(){             // 중복체크
    if(!this.userForm.controls.userId.valid){  
      this.msgUserId = "ID는 반드시 입력하여 주십시오" ; 
      return;
    }else{
      this.msgUserId = "" ;
    }    

    let url = 'api/user/checkId';
    this.sharedHttpService.post(url, this.user).then(data=> {
    this.user = data ;
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

  onAddRole(){
    this.display = true ;
  }
  onDeleteRole(){}

  onClose(){
    this.display = false ;
  }

  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }

  onAddChildMenu(event){}

}
