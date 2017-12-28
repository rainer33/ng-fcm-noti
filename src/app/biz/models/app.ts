export class App{
    appSeqno        : number ;      // app Sequence
    appId           : string ;      // app ID    
    appName         : string ;      // app명    
    platformType    : string ;      // OS 종류
    pushApiType     : string ;      // 푸시 API 타입
    remark          : string ;      // 앱설명
    searchField     : string ;      // 검색필드
    searchKey       : string ;      // 검색조건
    companySeqno    : number ;      // 고객사 ID
    companyName     : string ;      // 고객사명
    validCertFile   : boolean ;     // 인증서파일 확인
    expiryDate      : string ;      // 인증서파일 만료일
    pushApiCertFileExistYn      : string ;      // 인증서파일 유무

    // 이용여부는 제외
    useYn           : string ;      // 이용여부
    constructor(){}
}