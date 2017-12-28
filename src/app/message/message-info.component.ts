import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-info',
  templateUrl: '../../templates/message/message-info.component.html'  
})
export class MessageInfoComponent implements OnInit {
  text: string;

  constructor() { }

  ngOnInit() {
  }

}
