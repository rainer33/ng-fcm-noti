import { Component
        , OnInit
        , ViewChild } from '@angular/core';
import { SharedHttpService }      from './../../shared/service/shared-http.service';
import { TREE_ACTIONS
        , KEYS
        , IActionMapping
        , IActionHandler
        , TreeComponent
        , TreeModel
        , TreeNode
        , ITreeOptions }          from 'angular-tree-component';
import { Menu }                   from '../models/menu';
import { MsgboxService }          from './../../shared/service/msgbox.service' ;

@Component({
  selector: 'app-menu-tree',
  templateUrl: '../../../templates/system/menu/menu-tree.component.html'
})
export class MenuTreeComponent implements OnInit {
  display : boolean = false;
  nodes   : any[]=[];
  menu    : Menu = new Menu();
  menulist: Menu[] = [] ;
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
          TREE_ACTIONS.FOCUS(tree, node, $event);
          if (node.hasChildren){
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);            
          }          
          this.onSelect(node.data.id, 'api/menu/data', data=>{this.menu=data;});
          this.onSelect(node.data.id, 'api/menu/datalist', data=>this.menulist=data);            
        } // click
      }   //  mouse     
    } , // actionMapping
    nodeHeight: (node: TreeNode) => node.height + 100
  } ; // options
  constructor(
    private sharedHttpService:SharedHttpService
    , private msgboxService:MsgboxService   
  ) {}  
  ngOnInit() { 
    this.setFirstTree();      
    this.onSelect(0, 'api/menu/datalist',data=>this.menulist=data);    
  }
  onAdd(): void {    
    this.display = true;
  }
  onClose(){
    this.display = false;
  }  
  onUpdate(tree){
    let url = 'api/menu/update';    
    this.sharedHttpService.postMsg(url, this.menu)
    .then(() => {
      this.setFirstTree();
      tree.treeModel.update();      
      this.display = false;
    });
  }
  onDelete(tree){
    let url = 'api/menu/delete';    
    this.sharedHttpService.postMsg(url, this.menu)
    .then(()=>{
      this.setFirstTree();
      tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/menu/datalist', data=>this.menulist=data);       
      this.display = false;
    });
  }
  onAddChildMenu(param:Menu){
    let url = 'api/menu/add';
    if(this.nodeId){
      param.menuParent = this.nodeId;
    }else{
      param.menuParent = 0;
    }    
    this.sharedHttpService.postMsg(url,param)
    .then(()=>{
      this.setFirstTree();
      this.tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/menu/datalist', data=>this.menulist=data);       
      this.display = false;
    });
  }
  onSelect(menuNo, url, callback){
    let param = new Menu();
    param.menuNo = menuNo ; 
    this.nodeId = menuNo;
    this.sharedHttpService.post(url,param).then(callback) ;
  }
  setFirstTree(){
    let url = 'api/menu/treelist';
    this.sharedHttpService.post(url,this.nodes).then(data=>{      
      this.nodes=JSON.parse(data.jsonArray);   
    }) ;
  }
  onFirstTree(){ 
    this.tree.treeModel.collapseAll() ;
    this.menu = new Menu() ;
    this.onSelect(0, 'api/menu/datalist', data=>this.menulist=data);  
  } 
}