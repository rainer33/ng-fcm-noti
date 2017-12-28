import { Injectable }               from '@angular/core';
import { User }                     from '../../system/models/user';
import { SharedHttpService }        from './shared-http.service';

@Injectable()
export class UserDetailsService {  
  isLoggedIn:boolean = false;
  isFooter  :boolean = false;

  constructor(private sharedHttpService:SharedHttpService) {}
  
  /* login(user:User, callback){
    let url='/api/login';
    let result:any={};
    this.sharedHttpService.post(url,user).then(
      data => {       
        result = data;
        console.log('result login', result);
      if(result.success){
        callback;
        //this.isLoggedIn = true;
      }else{
        //this.isLoggedIn = false;
      }
    });    
  }

  private authCheck(){         // 권한 및 로그인 여부 체크
    let hasAuth:boolean = false ;
    hasAuth = true;
    return hasAuth ;
  } */
}
