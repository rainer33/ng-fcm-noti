export class RoleAuth{
    rolegroupId       : number ;     // 역할아이디
    menuNo            : number ;     // 메뉴seqno
    menuName          : string ;     // 메뉴명    
    authRead          : boolean ;     // 읽기권한
    authWrite         : boolean ;     // 쓰기권한
    tfRead            : boolean=true;
    tfWrite           : boolean=true;
    isChanged         : boolean=false;
    authReadOld       : boolean ;
    authWriteOld      : boolean ;
    constructor(){}
}