import { Component
        , OnInit
        , ViewChild } from '@angular/core';
import { SharedHttpService } from './../../shared/service/shared-http.service';
import { TREE_ACTIONS
        , KEYS
        , IActionMapping
        , IActionHandler
        , TreeComponent
        , TreeModel
        , TreeNode
        , ITreeOptions } from 'angular-tree-component';
import { Code } from '../models/code';
import { MsgboxService } from './../../shared/service/msgbox.service' ;

@Component({
  selector: 'app-code-tree',
  templateUrl: '../../../templates/system/code/code-tree.component.html'
})
export class CodeTreeComponent implements OnInit {
  display = false;
  nodes: any[]= [];
  code: Code = new Code();
  codelist: Code[] = [] ;
  codeTypes: Code[] = [] ;
  nodeId: number ;
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
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          }
          console.log('node is', node);
          this.onSelect(node.data.id, 'api/code/tree', data => {
            node.data.children = JSON.parse(data.jsonArray);            
            this.tree.treeModel.update();
          });
          this.onSelect(node.data.id, 'api/code/data', data => {this.code = data; });
          this.onSelect(node.data.id, 'api/code/datalist', data => {this.codelist = data; });
        } // click
      } // mouse
    } , // actionMapping
    nodeHeight: (node: TreeNode) => node.height + 100,    
    allowDrag: true    
  };
  constructor(
    private sharedHttpService: SharedHttpService
    , private msgboxService: MsgboxService
  ) { }

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

  ngOnInit() {
    this.setTree(0);
    this.onSelect(0, 'api/code/datalist',data=>this.codelist=data);
    this.setCodeType() ;
    this.code.codeType = 'G' ;
  }

  onAdd() {
    this.display = true;
  }

  onClose() {
    this.display = false;
  }

  onUpdate(tree) {
    const url = 'api/code/update';
    this.sharedHttpService.postMsg(url, this.code)
    .then(() => {
      this.setTree(0);
      tree.treeModel.update();
      this.display = false;
    });
  }

  onDelete(tree) {
    const url = 'api/code/delete';
    this.sharedHttpService.postMsg(url, this.code)
    .then(() => {
      this.setTree(0);
      tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/code/datalist', data => this.codelist = data);
      this.display = false;
    });
  }

  onAddChildCode(param: Code) {    
    let url ;
    url = 'api/code/add';
    if (this.nodeId) {
      param.codeParentId = this.nodeId;
    }else {
      param.codeParentId = 0;
    }
    this.sharedHttpService.postMsg(url, param)
    .then(() => {
      this.setTree(0);
      this.tree.treeModel.update();
      this.onSelect(this.nodeId, 'api/code/datalist', data => this.codelist = data);
      this.display = false;
    });
  }

  onSelect(codeId, url, callback) {
    const param = new Code();
    param.codeId = codeId ;
    this.nodeId = codeId;
    this.sharedHttpService.post(url, param).then(callback) ;
  }

  setTree(codeId) {
    let url, param ;
    url = 'api/code/tree' ;
    param = new Code() ;
    param.codeId = codeId ;
    this.sharedHttpService.post(url, param).then(data => {
      this.nodes = JSON.parse(data.jsonArray);
      // console.log('items is', this.nodes);
    }) ;
  }

  onFirstTree() {
    this.tree.treeModel.collapseAll() ;
    this.code = new Code() ;
    this.code.codeType = 'G' ;
    this.onSelect(0, 'api/code/datalist', data=>this.codelist = data);  
  }
}
