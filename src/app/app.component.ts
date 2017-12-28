import { Component }              from '@angular/core';
import { Router}                  from '@angular/router' ;
import { MsgboxService }          from './shared/service/msgbox.service' ;
import { UserDetailsService }     from './shared/service/user-details.service';
import { SharedHttpService }      from './shared/service/shared-http.service';
import { MenuItem }               from 'primeng/primeng';
import { User }                   from './system/models/user';

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html'
})
export class AppComponent {
  title = 'MPUSH 2.0'; 
  user    : User = new User();   
  menuitems:MenuItem[] = []; 
  userName : string ; 
  userId : string ; 
  userNo : number ;
  userinfoDisplay : boolean = false;
  items: MenuItem[];
  home: MenuItem;  
  
  constructor(
    public msgBoxService : MsgboxService
    , public userDetailsService : UserDetailsService
    , private sharedHttpService : SharedHttpService
    , private router : Router
  ) {}

  onUpdateUser(userName,userId){
    this.userName = userName ;  
    this.userId = userId ;      
    this.userinfoDisplay = true ;
  }  
  
  ngOnInit(){     
    this.home = {url:'#', icon: 'fa fa-home'};
  }

  setMenu(result){   
    let url = 'api/menu/topmenu', link='';
    this.sharedHttpService.post(url,this.menuitems).then(data=>{  
      this.userDetailsService.isLoggedIn=true;    
      this.menuitems=JSON.parse(data.jsonArray);
      link = this.menuitems[0].routerLink;
      this.router.navigate([link], {skipLocationChange : true}) ;   
      this.userName = result.userName ;  
      this.userId = result.userId ;  
      this.userNo = result.userNo ;  

      let len1, len2, menu, menu2, array1, array2;
      len1 = this.menuitems.length;
      for(let i = 0; i < len1; i++){
        menu = this.menuitems[i];
        menu.command = (event) => this.onClick(event);
        array1 = [];        
        array1.push(menu);
        array1.push(menu.items[0]);
        menu.array = array1;
        len2 = menu.items.length;
        if(i == 0){
          this.items = menu.array;
        }
        for(let j = 0; j < len2; j++ ){
          menu2 = menu.items[j];
          array2 = [];
          array2.push(menu);
          array2.push(menu2);
          menu2.array = array2;
          menu2.command = (event) => this.onClick(event);
        }
      }        

      console.log('this.menuitems ;;;;;', this.menuitems);
    }) ;
  }

  onUpdateUserInfo(param:User){
    let url = 'api/user/update';
    param.userId = this.userId;
    param.userName = this.userName;
    param.userNo = this.userNo;
 
    this.sharedHttpService.postMsg(url,param).then(data=>{
      this.user = data ;      
      this.userinfoDisplay = false;
    });
  }

  onClick(event){
    console.log('event is ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;') ;
    console.log(event) ;
    this.items = event.item.array;
  }  
  
  onClose(){
    this.userinfoDisplay = false;
  }    
  /* logout(){
    let title='로그아웃';
    let message='로그아웃 하시겠습니까?';
    this.msgBoxService.onResponse(title, message);
    this.userDetailsService.isFooter=true;
    //this.userDetailsService.isLoggedIn=false;
  } */
  
}
