import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http' ;
import { Headers, RequestOptions }  from '@angular/http' ;
import { Observable }               from 'rxjs/Observable' ;
import { MsgboxService }            from './msgbox.service' ;
import 'rxjs/add/operator/toPromise' ;

@Injectable()
export class SharedHttpService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers }); 
  
  hButtonAdd :string='';

  constructor(
    private http : Http
    , private msgBoxService : MsgboxService
  ) { }
  
  get buttonAdd(){
    return this.hButtonAdd;
  }
  
  set buttonAdd(value:string){
    this.buttonAdd = value;
  }

  get(url:string){
    if(!this.authCheck()){
      return;
    }
    return this.http.get(url)    
    .toPromise()
    .then(res=>res.json()) 
    .catch(this.handleError) ;
  }

  post(url:string, param:any){
    if(!this.authCheck()){
      return;
    }
    return this.http.post(url, param, this.options)    
    .toPromise()
    .then(res=>res.json()) 
    .catch(this.handleError) ;
  }

  postMsg(url:string, param:any):Promise<any>{
    let data : any = {} ;
    if(!this.authCheck()){
      return;
    }
    return this.http.post(url, param, this.options)    
    .toPromise()
    .then(res=>{
      let title, msg ;
      data = res.json();        
      console.log('whatisresult', data);  
      if(data.success){
        title='SUCCESS!';
        msg='성공하였습니다.';        
      }else{
        title='FAIL';
        msg='실패하였습니다.';
      } 
      this.msgBoxService.onResponse(title, msg) ;           
    }) 
    .catch(err => console.log(err));    
  }

  postSend(url:string, param:any, headers:any){
    if(!this.authCheck()){
      return;
    }
    headers = new Headers(headers);
    headers = new RequestOptions({ headers: headers }); 
    return this.http.post(url, param, headers)    
    .toPromise()
    .then(res=>res.json()) 
    .catch(this.handleError) ;
  }

  /* private extractData(res : Response){
    let body = res.json() ;
    console.log('body is?', body) ;
    return body.data || {} ;
  } */

  private handleError(error : any){    
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private authCheck(){         // 권한 및 로그인 여부 체크
    let hasAuth:boolean = false ;
    hasAuth = true;
    return hasAuth ;
  }
}
