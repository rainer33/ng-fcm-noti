import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { DialogModule, CalendarModule }                   from 'primeng/primeng';
import { NgForm }                                         from '@angular/forms' ;
import { StatsDept }                                      from './models/statsdept' ;
import { SharedHttpService }                              from '../shared/service/shared-http.service';
import { Org }                                            from '../system/models/org' ;
@Component({
  selector: 'stats-dept',
  templateUrl: '../../templates/stats/stats-dept.component.html'  
})
export class StatsDeptComponent implements OnInit {

  statsDept : StatsDept = new StatsDept();
  statsDepts : StatsDept[] = [];
  monthlyStatsDepts : StatsDept[] = [];
  yearStatsDepts : StatsDept[] = [];
  org    : Org = new Org();

  requestDate : string = '';
  schDept : string = '';  
  orgId : number = 0 ;  
  display : boolean = false;
  todayDate: any;
  statsDay : string;
  statsMonth : string;
  statsYear : string;
  
  // compile error 로 임의선언
  searchField : string = '';
  day : any ;
  month : any ;
  year : any ;
  conditions : string = '';
  tabIndex : number = 0 ;

  @ViewChild('dataForm') dataForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {      // 상세조회 화면
    let url = 'api/statsDept/dailyView';
    let monthlyUrl = 'api/statsDept/monthlyView';
    let yearUrl = 'api/statsDept/yearView';

    // 고객사 임의세팅
    this.statsDept.companySeqno = 2;

    if(this.day == undefined){
      let today = new Date();
      this.day = today ;
      this.month = today ;
      this.year = today ;
    }
    
    // dailyView
    this.sharedHttpService.post(url, this.statsDept).then(data=> {
      this.statsDepts = data ;
      console.log('daily',this.statsDepts);
    }) ;  
    
  }

  availRate(pushRequestCnt, pushAvailCnt){
    let resultValue = 0;
    if (pushAvailCnt > 0)
      resultValue = pushAvailCnt / pushRequestCnt;
    return resultValue;
  }

  totalCnt(sendSuccessCnt, sendFailCnt){
    let resultValue = 0;
    resultValue = sendSuccessCnt + sendFailCnt;
    return resultValue;
  }

  accessRate(accessCnt, sendSuccessCnt, sendFailCnt){
    let resultValue = 0;
    let total = this.totalCnt(sendSuccessCnt, sendFailCnt);
    if (total > 0) {
      resultValue = accessCnt / total ;
    }
    return resultValue;
  }

  onSearch(){             // 조회
    let url = 'api/statsDept/dailyView';
    let monthlyUrl = 'api/statsDept/monthlyView';
    let yearUrl = 'api/statsDept/yearView';
    
    let param = new StatsDept();
    param.schDept = this.schDept ;
    param.orgId = this.orgId ;
    
    if (this.day != this.todayDate) {
      param.requestDate = (this.day.getMonth()+1) + '-' + this.day.getDate() + '-' + this.day.getFullYear() ;
    } else {
      param.requestDate = this.day;
    }
    
    let dateArray = param.requestDate.split('-');
    this.statsMonth = dateArray[0];
    this.statsDay = dateArray[1];
    this.statsYear = dateArray[2];

    param.statsMonth = this.statsMonth ;
    param.statsDay = this.statsDay ;
    param.statsYear = this.statsYear ;

    param.companySeqno = 2;

    // this.sharedHttpService.post(url,param).then(data=> {
    //     this.statsDepts = data ;        
    // }) ;

    // dailyView
    this.sharedHttpService.post(url, param).then(data=> {
      this.statsDepts = data ;
      console.log('daily',this.statsDepts);
    }) ;

    // monthlyView
    this.sharedHttpService.post(monthlyUrl, param).then(data=> {
      this.monthlyStatsDepts = data ;  
      console.log('daily',this.monthlyStatsDepts);     
    }) ;

    // yearView
    this.sharedHttpService.post(yearUrl, param).then(data=> {
      this.yearStatsDepts = data ;   
      console.log('daily',this.yearStatsDepts);    
    }) ;    
  }

  onReset(){              // 초기화
        this.schDept = '';
        this.day = this.todayDate ;
        this.ngOnInit();
  }

  onList(){               // 목록
    this.router.navigate(['/biz/client']) ;
  }

  onSelectDept(){
    this.display = true ;
  }
  
  onSetOrg(param:Org){
    this.schDept = param.orgName;
    this.orgId = param.orgId;
    this.display = false;
  }
  
  onClose(){
    this.display = false ;
  }  
  
  onRowClick(event){
   
  }

  onTabChange(event) {
    let url = 'api/statsDept/dailyView';
    let monthlyUrl = 'api/statsDept/monthlyView';
    let yearUrl = 'api/statsDept/yearView';
      
    if (event.index == 0){
      this.tabIndex = 0 ;
     
    } else if (event.index == 1){
      this.tabIndex = 1 ;
      // monthlyView
      this.sharedHttpService.post(monthlyUrl, this.statsDept).then(data=> {
        this.monthlyStatsDepts = data ;  
        console.log('daily',this.monthlyStatsDepts);     
      }) ;        
    } else if (event.index == 2){
      this.tabIndex = 2 ;
      // yearView
      this.sharedHttpService.post(yearUrl, this.statsDept).then(data=> {
        this.yearStatsDepts = data ;   
        console.log('daily',this.yearStatsDepts);    
      }) ;      
    } 
 }
}
