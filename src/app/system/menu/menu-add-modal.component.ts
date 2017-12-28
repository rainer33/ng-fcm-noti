import { Component
        , EventEmitter
        , ViewChild
        , Output } from '@angular/core';
import { NgForm }  from '@angular/forms';

import { SharedHttpService }      from '../../shared/service/shared-http.service';
import { Menu }                   from '../models/menu';

@Component({
  selector: 'menu-add-modal',
  templateUrl: '../../../templates/system/menu/menu-add-modal.component.html'
})
export class MenuAddModalComponent {  
  menu    : Menu = new Menu(); 
  @Output() close = new EventEmitter(); 
  @Output() addMenu = new EventEmitter<Menu>();
  isClickAdd : boolean = false;
  msgMenuName : string;
  msgMenuUrl  : string;
  @ViewChild('dataForm')
  private dataForm: NgForm;
  constructor(private sharedHttpService:SharedHttpService) {    
  }
  ngOnInit() {
    this.msgMenuName='메뉴명을 입력하세요';
    this.msgMenuUrl='메뉴URL을 입력하세요';
  }
  onAdd(){ 
    this.addMenu.emit(this.menu);   
    this.menu = new Menu(); 
  }
  onClose(){
    this.close.emit();
    this.menu = new Menu();
  }
}
