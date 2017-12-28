import { Component
        , EventEmitter
        , ViewChild
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';

import { SharedHttpService }      from '../../shared/service/shared-http.service';
import { Org }                   from '../models/org';

@Component({
  selector: 'org-add-modal',
  templateUrl: '../../../templates/system/org/org-add-modal.component.html'
})
export class OrgAddModalComponent {  
  org    : Org = new Org();   
  @Output() close = new EventEmitter(); 
  @Output() addOrg = new EventEmitter<Org>();
  isClickAdd : boolean = false;
  msgOrgName : string;  
  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private sharedHttpService: SharedHttpService) {}
  ngOnInit() {
    this.msgOrgName = '조직명을 입력하세요';  
  }
  onAdd(){ 
    this.addOrg.emit(this.org);   
    this.org = new Org();  
  }
  onClose(){
    this.close.emit();
    this.org = new Org();    
  } 
}
