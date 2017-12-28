export class User{
    userNo       : number ;     // 사용자시퀀스번호
    seq          : number ;     // 등록용시퀀스번호
    userKindName : string ;     // 사용자구분명
    userKind     : string ;     // 사용자구분
    userName     : string ;     // 사용자명
    userNameEnc  : string ;     // 사용자명 암호화
    userId       : string ;     // 사용자아이디
    deptName     : string ;     // 조직명
    deptId       : number ;     // 조직아이디
    timezone     : string ;     // 시간대
    mobilePhone  : string ;     // 모바일전화번호
    mobilePhoneEnc : string ;   // 모바일전화번호 암호화
    officeTel    : string ;     // 사무실전화번호
    officeTelext : string ;     // 사무실전화번호 내선
    officeTelEnc : string ;     // 사무실전화번호 암호화
    mailAddress  : string ;     // 메일주소
    mailAddressEnc : string ;   // 메일주소 암호화
    userPassword : string ;     // 비밀번호
    passwordCheck: string ;     // 비밀번호 확인
    userTitle    : string ;     // 직위
    userCode     : string ;     // 연동코드
    userLang     : string ;     // 언어
    deleteYn     : string ;     // 사용여부 삭제여부
    searchField    : string ;   // 검색필드
    searchKey    : string ;     // 검색조건
  
    constructor(){}
}