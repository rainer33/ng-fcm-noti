import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';

import { MessageInfoComponent }    from './message-info.component';
import { MessageSendComponent }    from './message-send.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path:'', redirectTo:'info',pathMatch:'full'}
      , {path:'info', component: MessageInfoComponent}          
      , {path:'send', component: MessageSendComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MessageRoutingModule { }