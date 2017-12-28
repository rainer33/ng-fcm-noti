import { Component
        , OnInit
        , ViewChild
       }                         from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router' ;
import { NgForm }                from '@angular/forms' ;
import { SharedHttpService }     from '../../shared/service/shared-http.service';
import { Bizuser }               from '../models/bizuser' ;
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';

@Component({
  selector: 'bizuser-view',
  templateUrl: '../../../templates/biz/bizuser/bizuser-view.component.html'  
})
export class BizuserViewComponent implements OnInit {
  bizuser = new Bizuser();
  platformTypes = [] ;
  msgSvcUserKey  : string = "" ; 
  hButtonDoubleCheck : string = "중복확인" ;
  checkYN : boolean = false;
  @ViewChild('dataForm') dataForm : NgForm ;

  constructor(
    private route: ActivatedRoute
    , private sharedHttpService: SharedHttpService
    , private msgBoxService : MsgboxService    
    , private confirmationService : ConfirmationService    
    , private router: Router
  ) {}
  
  ngOnInit() {
    this.onInitBizuser();        // 상세조회 데이터
    this.onInitPlatformTypes() ; // os구분 코드바인딩
  } // ngOnInit

  onFormValidCheck(){   // 입력 폼 유효성 검증
    if(!this.dataForm.controls.svcUserKey.valid){  
      this.msgSvcUserKey = "이용자Key는 반드시 입력하여 주십시오" ; 
    }else{
      this.msgSvcUserKey = "" ;
    }
  }

  onInitBizuser(){
    let url, param ;
    url = 'api/svcuser/data' ;
    param = this.route.queryParams['_value'];
    if(param.svcUserSeqno > 0){
      this.sharedHttpService.post(url, param).then(
        data => {
          this.bizuser = data ;
        } // data
      ); // then      
    } else { //if
      this.bizuser.platformType = 'A';
    }
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

  onAdd(){  // 등록
    this.onFormValidCheck() ;
    if(!this.dataForm.valid){
      return ;    
    }  

    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/svcuser/add';
        this.onAUD(url,this.bizuser);  
      }
    });  
  }

  onUpdate(){  // 수정
    this.onFormValidCheck() ;
    if(!this.dataForm.valid){
      return ;    
    }  

    this.confirmationService.confirm({
      message: '수정하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/svcuser/update';
        this.onAUD(url,this.bizuser);  
      }
    });  
  }
  
  onDelete(){  // 삭제
    this.confirmationService.confirm({
      message: '삭제하시겠습니까?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let url = 'api/svcuser/delete';
        this.onAUD(url,this.bizuser);  
      }
    });  
  }

  onCheckId(){             // 중복체크
    if(!this.dataForm.controls.svcUserKey.valid){  
      this.msgSvcUserKey = "이용자Key는 반드시 입력하여 주십시오" ; 
      return;
    }else{
      this.msgSvcUserKey = "" ;
    }    

    let url = 'api/svcuser/checkUserKey';
    this.sharedHttpService.post(url, this.bizuser).then(data=> {
    //this.app = data ;
    let title, msg ;
   
    if(data.success){
      title='SUCCESS!';
      msg='사용가능한 Key입니다.';        
    }else{
      title='FAIL';
      msg='이미 사용중인 Key입니다.';
    } 
    this.msgBoxService.onResponse(title, msg) ; 
    }) ;
    
    this.checkYN = true;
  }

  onList(){  // 목록
    let url;
    url = '/biz/bizuser' ;
    this.router.navigate([url]) ;
  }

  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }
}
