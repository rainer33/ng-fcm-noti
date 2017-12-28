import { Component, OnInit, ViewChild }                   from '@angular/core';
import { Routes, ActivatedRoute, RouterModule, Router}    from '@angular/router' ;
import { NgForm }                                         from '@angular/forms' ;

import { StatsBiz }                                       from './models/statsbiz' ;
import { Svc }                                            from './models/svc' ;
import { SharedHttpService }                              from '../shared/service/shared-http.service';

@Component({
  selector: 'stats-biz',
  templateUrl: '../../templates/stats/stats-biz.component.html'  
})
export class StatsBizComponent implements OnInit {
  statsBiz : StatsBiz = new StatsBiz();
  statsBizs : StatsBiz[] = [];
  monthlyStatsBizs : StatsBiz[] = [];
  yearStatsBizs : StatsBiz[] = [];
  // bussinessSelect : string = '';
  requestDate : string = '';
  todayDate: any;
  statsDay : string;
  statsMonth : string;
  statsYear : string;
  // compile error 로 임의선언
  searchField : string = '';
  conditions : string = '';
  svcCode : string = '';
  day : any ;
  month : any ;
  year : any ;
  tabIndex : number = 0 ;

  svc : Svc = new Svc();
  svcs : Svc[] = [];

  @ViewChild('dataForm') dataForm : NgForm ;

  constructor(private router : Router
    , private sharedHttpService : SharedHttpService
    , private route  : ActivatedRoute ) { }

  ngOnInit() {      // 상세조회 화면
    let url = 'api/pushstatistics/bussiness/dailyView';
    let monthlyUrl = 'api/pushstatistics/bussiness/monthlyView';
    let yearUrl = 'api/pushstatistics/bussiness/yearView';
    let svcUrl = 'api/pushstatistics/bussiness/svcDataList';
    //let param = this.route.queryParams['_value'] ;   
    // 고객사 임의세팅
    this.statsBiz.companySeqno = 2;
    
    //let today = new Date();
    //this.requestDate = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate();

    if(this.day == undefined){
      let today = new Date();
      this.day = today ;
      this.month = today ;
      this.year = today ;
    }

    // dailyView
    this.sharedHttpService.post(url, this.statsBiz).then(data=> {
      this.statsBizs = data ;
      console.log('daily',this.statsBizs);
    }) ;

    // monthlyView
    // this.sharedHttpService.post(monthlyUrl, this.statsBiz).then(data=> {
    //   this.monthlyStatsBizs = data ;  
    //   console.log('monthly',this.monthlyStatsBizs);     
    // }) ;

    // yearView
    // this.sharedHttpService.post(yearUrl, this.statsBiz).then(data=> {
    //   this.yearStatsBizs = data ;   
    //   console.log('year',this.yearStatsBizs);    
    // }) ;

    // svcDataList
    this.sharedHttpService.post(svcUrl, this.statsBiz).then(data=> {
      this.svcs = data ;
      console.log('svcs',this.svcs);
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
    let url = 'api/pushstatistics/bussiness/dailyView';
    let monthlyUrl = 'api/pushstatistics/bussiness/monthlyView';
    let yearUrl = 'api/pushstatistics/bussiness/yearView';
    
    let param = new StatsBiz();
    param.svcCode = this.svcCode ;

    
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
      this.statsBizs = data ;
      console.log('daily',this.statsBizs);
    }) ;

    // monthlyView
    this.sharedHttpService.post(monthlyUrl, param).then(data=> {
      this.monthlyStatsBizs = data ;  
      console.log('daily',this.monthlyStatsBizs);     
    }) ;

    // yearView
    this.sharedHttpService.post(yearUrl, param).then(data=> {
      this.yearStatsBizs = data ;   
      console.log('daily',this.yearStatsBizs);    
    }) ;    
  }

  onSelect(event){
    console.log('onSelect svcCode',event.svcCode);
    this.statsBiz.svcCode = event.svcCode;
    this.svcCode = event.svcCode;
  }

  onReset(){              // 초기화
        this.svcCode = '';
        this.requestDate = '';
        this.ngOnInit();
  }

  onList(){               // 목록
    this.router.navigate(['/biz/client']) ;
  }

  onRowClick(event){
    
   }

  onTabChange(event) {

    let url = 'api/pushstatistics/bussiness/dailyView';
    let monthlyUrl = 'api/pushstatistics/bussiness/monthlyView';
    let yearUrl = 'api/pushstatistics/bussiness/yearView';

    if (event.index == 0){
      this.tabIndex = 0 ;
    
    } else if (event.index == 1){
      this.tabIndex = 1 ;
      // monthlyView
      this.sharedHttpService.post(monthlyUrl, this.statsBiz).then(data=> {
        this.monthlyStatsBizs = data ;  
        console.log('daily',this.monthlyStatsBizs);     
      }) ;        
    } else if (event.index == 2){
      this.tabIndex = 2 ;
      // yearView
      this.sharedHttpService.post(yearUrl, this.statsBiz).then(data=> {
        this.yearStatsBizs = data ;   
        console.log('daily',this.yearStatsBizs);    
      }) ;      
    } 
}  
  
}
