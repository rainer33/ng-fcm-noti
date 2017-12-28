import { Component
        , EventEmitter
        , ViewChild
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';

import { SharedHttpService }      from '../../shared/service/shared-http.service';
import { Code }                   from '../models/code';

@Component({
  selector: 'code-add-modal',
  templateUrl: '../../../templates/system/code/code-add-modal.component.html'
})
export class CodeAddModalComponent {  
  code    : Code = new Code(); 
  codeTypes: Code[] = [] ;
  @Output() close = new EventEmitter(); 
  @Output() addCode = new EventEmitter<Code>();
  isClickAdd : boolean = false;
  msgCodeName : string;
  msgCodeValue  : string;
  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private sharedHttpService: SharedHttpService) {}
  ngOnInit() {
    this.msgCodeName = '코드명을 입력하세요';
    this.msgCodeValue = '코드값을 입력하세요';
    this.setCodeType() ;
    this.code.codeType = 'G' ;
  }
  onAdd(){ 
    this.addCode.emit(this.code);   
    this.code = new Code();
    this.code.codeType = 'G' ; 
  }
  onClose(){
    this.close.emit();
    this.code = new Code();
    this.code.codeType = 'G' ; 
  }
  setCodeType() {
    let param: Code, url: string ;
    url = 'api/code/dropdown' ;
    param = new Code() ;
    param.codeParentId = 233 ;
    this.sharedHttpService.post(url, param).then(
      data => {
        this.codeTypes = data ;
      }
    );
  }
}
