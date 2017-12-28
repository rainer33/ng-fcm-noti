import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;

import { Role }                                           from '../models/role' ;
import { RoleAuth }                                       from '../models/roleauth';

import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';


@Component({
  selector: 'role-view',
  templateUrl: '../../../templates/system/role/role-view.component.html'
})
export class RoleViewComponent implements OnInit {
  role : Role = new Role() ;
  roleauth : RoleAuth = new RoleAuth();
  roleauthlist : RoleAuth[]=[]; 
  msgRolegroupName='역할명을 입력하세요.';
  display : boolean = false ;
  @ViewChild('dataForm') dataForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService    
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {      // 상세조회 화면, 메뉴별접근권한화면
    let url = 'api/role/data';
    let param = this.route.queryParams['_value'] ;   
    let authUrl = 'api/roleacl/roleauth';
    if(param.rolegroupId > 0){
      this.sharedHttpService.post(url, param).then(data=> {
        this.role = data ;       
      }) ;
      this.roleauth.rolegroupId = param.rolegroupId;      
      this.sharedHttpService.post(authUrl, this.roleauth).then(data=> {       
        this.roleauthlist = data ;
        console.log('this.roleauthlist', this.roleauthlist) ;
      }) ;
    } 
    
    console.log('this.roleauthlist', this.roleauthlist) ;
  }

  onAdd(){             // 등록    
    this.confirmationService.confirm({
      message: '등록하시겠습니까?',
      header: 'Insert Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/role/add';
        this.onAUD(url,this.role);  
      }
    });       
  }

  onUpdate(){             // 수정
    this.confirmationService.confirm({
      message: '수정하시겠습니까?',
      header: 'Update Confirmation',
      icon: 'fa fa-question-circle',      
      accept: () => {
        let url = 'api/role/update';
        this.onAUD(url,this.role);  
      }
    });      
  }

  onDelete(){             // 삭제
    this.confirmationService.confirm({
      message: '삭제하시겠습니까?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let url = 'api/role/delete';
        this.onAUD(url,this.role);  
      }
    });      
  }

  onList(){               // 목록
    this.router.navigate(['/system/role']) ;
  }

  private onAUD(url:string, param:any){
    this.sharedHttpService.postMsg(url,param) ;
    setTimeout(()=>this.onList(),300);
  }

  setChanged(menu){      // 읽기 쓰기 체크박스 이벤트
    if(menu.authRead == menu.authReadOld && menu.authWrite == menu.authWriteOld){
      menu.isChanged=false;
    }else{
      menu.isChanged=true;
    }     
  }

  onUpdateRoleMenu(){
    let cnt, url, len, roleauth, roleauthlist:RoleAuth[]=[], param ;
    if(this.role.cnt == 0){    // 접근권한 등록여부 따져서 0 이면 등록, 아니면 수정
      url = 'api/roleacl/add' ;
      param = this.roleauthlist ;
    }else{
      url='api/roleacl/update';      
      len = this.roleauthlist.length ;   // 수정한 열만 컬렉션에 추가한다
      for(let i=0; i < len; i++){
        roleauth=this.roleauthlist[i] ;
        if(roleauth.isChanged){
          roleauthlist.push(roleauth);
        }
      }
      param = roleauthlist;
    }
    
    this.sharedHttpService.postMsg(url,param) ;
  }

  onUpdateRoleUser(){
    this.display = true ;
  }
  onDeleteRoleUser(){}

  onAddChildMenu($event){

  }

  onClose(){
    this.display = false ;
  }
}
