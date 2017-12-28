import { Component
        , OnInit
        , EventEmitter
        , ViewChild
        , Output }            from '@angular/core';
import { NgForm }             from '@angular/forms';
import { TREE_ACTIONS
  , KEYS
  , IActionMapping
  , IActionHandler
  , TreeComponent
  , TreeModel
  , TreeNode
  , ITreeOptions }            from 'angular-tree-component';
import { SharedHttpService }  from '../shared/service/shared-http.service';
import { Org }                from '../system/models/org' ;
import { MsgboxService }      from './../shared/service/msgbox.service' ;

@Component({
  selector: 'org-modal',
  templateUrl: '../../templates/stats/org-modal.component.html'
})
export class OrgModalComponent implements OnInit { 
  nodes   : any[]=[];
  org    : Org = new Org();
  orglist: Org[] = [] ;
  param: Org = new Org();
  nodeId  : number ;
  @Output() close = new EventEmitter(); 
  @Output() selectOrg = new EventEmitter<Org>();  
  @ViewChild('dataForm')
  @ViewChild('tree')
  private tree: TreeComponent;
  options: ITreeOptions = {
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'id',
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          TREE_ACTIONS.FOCUS(tree, node, $event) ;
          if (node.hasChildren){
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          } 
          console.log('node is', node);
          this.onSelect(node.data.id, node.data.name, 'api/org/data', data=>{this.org = data; });
          this.onSelect(node.data.id, node.data.name, 'api/org/datalist', data=>this.orglist = data);          
        }  // click
      }  // mouse
    } , // actionMapping
    nodeHeight: (node: TreeNode) => node.height + 100,    
    allowDrag: true    
  } ;
  constructor(
    private sharedHttpService:SharedHttpService
    , private msgboxService:MsgboxService
  ) {}
  ngOnInit() {
    setTimeout(this.setFirstTree(),100);  
    this.onSelect(0, '', 'api/org/datalist',data=>this.orglist = data);    
  }
  
  onSelect(orgId, orgName, url, callback){
    //let param: Org = new Org();
    this.param.orgName = orgName ; 
    this.param.orgId = orgId ; 
    this.nodeId = orgId;    
  }
  
  setFirstTree(){
    let url = 'api/org/tree';
    this.sharedHttpService.post(url,this.org).then(data=>{      
      this.nodes=JSON.parse(data.jsonArray);      
      console.log('items is', this.nodes);
    }) ;
  }  
  onFirstTree(){ 
    this.tree.treeModel.collapseAll() ;
    this.org = new Org() ;
    this.onSelect(0, '', 'api/org/datalist', data => this.orglist = data);  
  } 

  onAdd(){
    this.selectOrg.emit(this.param);
    this.org = new Org();
  }   

  onClose(){
    this.close.emit();
    this.org = new Org();
  }  
}
