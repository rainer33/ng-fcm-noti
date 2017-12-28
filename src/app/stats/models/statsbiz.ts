export class StatsBiz {
    //bussinessSelect : string ;      // 검색서비스명
    requestDate     : string ;      // 검색일자
    statsYear       : string ;      // 검색년
    statsMonth      : string ;      // 검색월
    statsDay        : string ;      // 검색일
    svcCode         : string ;      // 서비스코드
    svcName         : string ;      // 서비스명
    pushRequestCnt  : number ;      // 요청건수
    pushAvailCnt    : number ;      // 가능건수
    sendSuccessCnt  : number ;      // 성공건수
    sendFailCnt     : number ;      // 실패건수
    accessCnt       : number ;      // 접속건수
    companySeqno    : number ;      // 고객사 ID
    companyName     : string ;      // 고객사명

    pushAvailRate   : number ;      // 가능율
    sendTotalCnt    : number ;      // 총발송건수
    accessRate      : number ;      // 접속율
    constructor(){}
}