import { NgModule }                 from '@angular/core';
import { CommonSharedModule }       from '../shared/common-shared.module';
import { SharedHttpService }        from '../shared/service/shared-http.service';

import { MessageRoutingModule }     from './message-routing.module' ;
import { MessageInfoComponent }     from './message-info.component';
import { MessageSendComponent }     from './message-send.component';

@NgModule({
  imports: [
    MessageRoutingModule
    , CommonSharedModule
  ],
  declarations: [
    MessageInfoComponent
    , MessageSendComponent
  ],
  providers:[ 
    SharedHttpService
  ]
})
export class MessageModule { }
