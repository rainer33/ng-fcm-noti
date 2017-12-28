import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Directive, forwardRef, Attribute  }              from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;
import { Validator, AbstractControl, NG_VALIDATORS }      from '@angular/forms' ;

import { SendMsg }                                        from './models/sendMsg'
import { SharedHttpService }                              from '../shared/service/shared-http.service';
import { MsgboxService }                                  from '../shared/service/msgbox.service' ;
import {ConfirmDialogModule,ConfirmationService}          from 'primeng/primeng';

@Component({
  selector: 'message-info',
  templateUrl: '../../templates/message/message-send.component.html'  
})
export class MessageSendComponent implements OnInit {
  text: string;

  sendMsg: SendMsg = new SendMsg();

  @ViewChild('dataForm') appForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private msgBoxService : MsgboxService
    , private confirmationService : ConfirmationService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {
    this.sendMsg.click_action = 'https://fianmi-93.firebaseapp.com/';
    this.sendMsg.authorization = 'key=AAAAmofEqRo:APA91bHjloqcW7kUHJ_Y4h7CRbpARppDFqJDgFGlGnrOUSKtxELzYIZHJFKUX0nVdahNNA1MdflA-ViUYO4ujdlsSdpw8IXWFHyBhDmSvYQh__tsgRc00OzdZJ5NRPVWQ7v--4IicYfN';
  }

  onSend(){
    this.sendMsg;

    let url = 'https://fcm.googleapis.com/fcm/send';

    let sendData = { notification: {title:this.sendMsg.title, body:this.sendMsg.body,click_action:this.sendMsg.click_action}, to:this.sendMsg.to};
    let headers = { 'Authorization': this.sendMsg.authorization, 'Content-Type': 'application/json' };
    
    
    this.sharedHttpService.postSend(url,sendData, headers) ;
    
  }
  
}
