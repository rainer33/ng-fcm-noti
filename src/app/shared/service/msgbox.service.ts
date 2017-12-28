import { Injectable } from '@angular/core';

@Injectable()
export class MsgboxService {
  display: boolean = false ;
  title  : string = '' ;
  message: string = '' ;

  constructor() { }

  onResponse(title, message){
    this.display = true;
    this.title = title;
    this.message = message;
  }

}
