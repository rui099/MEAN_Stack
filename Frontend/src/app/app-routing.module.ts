import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ResgistroComponent } from './User/registro/resgistro.component';
import { LoginComponent } from './User/login/login.component';
import { UmanageComponent } from './User/umanage/umanage.component';
import { AuthGuard } from './guards/auth.guard';
import { UserinfoComponent } from './User/login/userinfo/userinfo.component';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';



const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'pedido', component: PedidoComponent, canActivate: [AuthGuard]},
  {path: 'user/registo', component: ResgistroComponent, canActivate: [AuthGuard]}, 
  {path: 'user/login', component: LoginComponent,},
  {path: 'user', component: UmanageComponent,canActivate: [AuthGuard] },
  {path: 'user/perfil', component: UserinfoComponent,canActivate: [AuthGuard] },
  {path: 'agendamento', component: AgendamentoComponent,canActivate: [AuthGuard] },
  {path: 'refresh',  component: HomeComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
