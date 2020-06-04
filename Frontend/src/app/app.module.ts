import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PedidoComponent } from './pedido/pedido.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ResgistroComponent } from './User/registro/resgistro.component';
import { LoginComponent } from './User/login/login.component';
import { UmanageComponent } from './User/umanage/umanage.component';
import { TokenInterceptService } from './token-intercept.service';
import { AuthGuard } from './guards/auth.guard';
import { UserinfoComponent } from './User/login/userinfo/userinfo.component';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    HomeComponent,
    ResgistroComponent,
    LoginComponent,
    UmanageComponent,
    UserinfoComponent,
    AgendamentoComponent,
    NavbarComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi:true
    }, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
