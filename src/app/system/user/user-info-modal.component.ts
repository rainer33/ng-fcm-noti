import { Component
        , EventEmitter
        , ViewChild
        , Input
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';
import { EqualsValidator }                                from '../../system/user/equals-validator.directive';
import { SharedHttpService }                              from '../../shared/service/shared-http.service';
import { MsgboxService }                                  from '../../shared/service/msgbox.service' ;
import { User }                                           from '../models/user';

@Component({
  selector: 'user-info-modal',
  templateUrl: '../../../templates/system/user/user-info-modal.component.html'
})
export class UserInfoModalComponent {  
  user    : User = new User(); 
  @Input() userIdPop = String;
  @Input() userNamePop = String;
  @Output() close = new EventEmitter(); 
  @Output() updateUser = new EventEmitter<User>();
  isClickAdd : boolean = false;
 
  msgUserPassword  : string = "비밀번호는 반드시 입력하여 주십시오" ; 
  msgNotMatch : string = "비밀번호가 일치하지 않습니다." ; 

  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private router : Router,
              private sharedHttpService:SharedHttpService,
              private confirmationService : ConfirmationService,
              private msgBoxService : MsgboxService,             
              private route  : ActivatedRoute) {    
  }
  ngOnInit() {

  }

  onUpdate(){ 
    this.updateUser.emit(this.user);   
    this.user = new User();    
  }
  onClose(){
    this.close.emit();
    this.user = new User();
  }

}
