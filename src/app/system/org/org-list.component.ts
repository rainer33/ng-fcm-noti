import { Component
  , OnInit
  , ViewChild }               from '@angular/core';
import { SharedHttpService }  from './../../shared/service/shared-http.service';
import { TREE_ACTIONS
  , KEYS
  , IActionMapping
  , IActionHandler
  , TreeComponent
  , TreeModel
  , TreeNode
  , ITreeOptions }            from 'angular-tree-component';
import { Org }                from '../models/org';
import { MsgboxService }      from './../../shared/service/msgbox.service' ;

@Component({
  selector: 'app-org-list',
  templateUrl: '../../../templates/system/org/org-list.component.html'  
})
export class OrgListComponent implements OnInit {
  display : boolean = false;
  nodes   : any[]=[];
  org    : Org = new Org();
  orglist: Org[] = [] ;
  nodeId  : number ;
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
          this.onSelect(node.data.id, 'api/org/data', data=>{this.org = data; });
          this.onSelect(node.data.id, 'api/org/datalist', data=>this.orglist = data);          
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
    this.onSelect(0, 'api/org/datalist',data=>this.orglist = data);    
  }
  onAdd(): void {    
    this.display = true;
  }
  onClose(){
    this.display = false;
  }
  onUpdate(tree){
    let url = 'api/org/update';    
    this.sharedHttpService.postMsg(url, this.org)
    .then(()=>{
      this.setFirstTree();
      tree.treeModel.update();      
      this.display = false;
    });
  }
  onDelete(tree){
    let url = 'api/org/delete';    
    this.sharedHttpService.postMsg(url, this.org)
    .then(()=>{
      this.setFirstTree();
      tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/org/datalist', data => this.orglist=data);       
      this.display = false;
    });
  }
  onAddChild(param:Org){    
    console.log('param is ~~', param);
    let url = 'api/org/add';
    if(this.nodeId){
      param.orgParent = this.nodeId;
    }else{
      param.orgParent = 0;
    }    
    this.sharedHttpService.postMsg(url,param)
    .then(()=>{
      this.setFirstTree();
      this.tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/org/datalist', data => this.orglist=data);       
      this.display = false;
    });
  }
  onSelect(orgId, url, callback){
    let param = new Org();
    param.orgId = orgId ; 
    this.nodeId = orgId;
    this.sharedHttpService.post(url,param).then(callback) ;
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
    this.onSelect(0, 'api/org/datalist', data => this.orglist = data);  
  } 
}
