import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { DialogModule, 
  PasswordModule,
  BreadcrumbModule,  
  ConfirmDialogModule }             from 'primeng/primeng';
import { ConfirmationService }      from 'primeng/components/common/api';
import { AppComponent }             from './app.component';
import { MsgboxService }            from './shared/service/msgbox.service' ;
import { UserDetailsService }       from './shared/service/user-details.service';
import { SharedHttpService }        from './shared/service/shared-http.service';
import { AppRoutingModule }         from './app-routing.module' ;
import { LoginComponent }           from './home/login.component';
import { MenubarModule }            from 'primeng/primeng';
import { UserInfoModalComponent }   from './system/user/user-info-modal.component' ;
import { EqualsValidator }          from './system/user/equals-validator.directive';
import { CookieService }            from 'angular2-cookie/services/cookies.service';

@NgModule({
  declarations: [
    AppComponent
    , LoginComponent
    , UserInfoModalComponent    
    , EqualsValidator    
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,       
    DialogModule,  
    MenubarModule,
    AppRoutingModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    HttpModule
  ],
  providers: [   
    MsgboxService   
    , UserDetailsService
    , SharedHttpService
    , ConfirmationService
    , CookieService
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
