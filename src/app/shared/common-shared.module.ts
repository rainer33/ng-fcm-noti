import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { TreeModule }                   from 'angular-tree-component';
import { 
         DataTableModule
        ,SharedModule
        ,DropdownModule      
        ,TabViewModule
        ,SelectButtonModule
        ,EditorModule
        ,FileUploadModule
        ,CalendarModule       
       }                                from 'primeng/primeng';

@NgModule({  
  imports: [ 
    CommonModule 
    , FormsModule
    , DataTableModule
    , SharedModule 
    , DropdownModule
    , TreeModule   
    , TabViewModule
    , SelectButtonModule
    , EditorModule
    , FileUploadModule
    , CalendarModule   
  ],
  exports: [
    CommonModule
    , FormsModule
    , DataTableModule
    , SharedModule 
    , DropdownModule
    , TreeModule  
    , TabViewModule
    , SelectButtonModule
    , EditorModule
    , FileUploadModule
    , CalendarModule  
  ]
})
export class CommonSharedModule { }
