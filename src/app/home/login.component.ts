import { Component
  , EventEmitter
  , ViewChild
  , OnInit 
  , Output }                  from '@angular/core';
import { Routes
        , RouterModule
        , Router}             from '@angular/router' ;
import { UserDetailsService } from '../shared/service/user-details.service';
import { User }               from '../system/models/user';
import { SharedHttpService }      from '../shared/service/shared-http.service';
import { MenuItem }               from 'primeng/primeng';
import { CookieService }          from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: '../../templates/home/login.component.html'
})
export class LoginComponent implements OnInit {
  user : User = new User() ;  
  userId;
  userPassword;
  isSave: boolean = false;
  
  @Output() setMenu = new EventEmitter<string>(); 

  constructor(
    private router : Router
    , private userDetailsService : UserDetailsService
    , private sharedHttpService : SharedHttpService
    , private cookieService : CookieService
  ) { }

  ngOnInit() {
    if(this.cookieService.get("cookie")){
      this.isSave = true;
      this.user.userId = this.userId;
      this.userPassword = this.userPassword;

      this.user.userId = this.cookieService.get("cookie");
     // this.isSave['checked'] = this.isSave;
    }
  }
  
  login(){    
    let url='/api/login';
    let result:any={};
    this.sharedHttpService.post(url,this.user).then(
      data => {       
        result = data;       
        if(result.success){
          this.setMenu.emit(result);           
        }
        this.user=new User();
    });    
  }
  onClick(){
    if (this.isSave) {
      this.isSave = true;
      this.userId = this.user.userId;
      this.userPassword = this.user.userPassword;

      // cookie
      this.cookieService.put("cookie", this.userId);
    } else {
      this.isSave = false;
      this.userId = null;      
      this.cookieService.remove("cookie");
    }
  }
}
