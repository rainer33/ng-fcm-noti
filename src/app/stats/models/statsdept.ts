export class StatsDept {
    schDept         : string ;      // 조직검색조건
    orgId           : number ;      // 조직코드
    requestDate     : string ;      // 검색일자
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

    statsDay      : string ;      // 검색 일
    statsMonth      : string ;      // 검색 월
    statsYear      : string ;      // 검색 년

    constructor(){}
}