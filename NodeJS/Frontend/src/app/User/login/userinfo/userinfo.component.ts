import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/app/models/pedido.model';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  providers: [UserService,PedidoService]
  
})
export class UserinfoComponent implements OnInit {
  user: any;
  estatisticas:any
  constructor(public userService: UserService,public pedidoService: PedidoService) { }
  

  ngOnInit(): void {

    this.refreshPedidoList();
    this.refreshUserList();
    this.resetForm();
  }
  
  Doutor = "Doutor";
  Admin = "Admin";
  Completo:"Completo";
  
  selectPedido(ped: Pedido) {
    this.pedidoService.selectedPedido = ped;
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.pedidoService.selectedPedido = {
      _id: null,
      nomeCompleto: "",
      idade: null ,
      cidade: "",
      sintomas: "",
      encaminhado: false ,
      grupo: false  ,
      tLocalRisco: false ,
      inicio: null,
      fim: null,
      user: "",
      estado: null,
      resultado: null,
    }
  }


  Submit(form: NgForm) {
    
    if (form.value._id != null ) {
      this.pedidoService.putPedido(form.value).subscribe((res) => {
        this.resetForm(form);

      });
    }this.refreshPedidoList()
  }
  
  refreshPedidoList() {
    this.userService.getLoggedUser().subscribe((user) => {this.user = user});
  }
  
  refreshUserList(){
    this.pedidoService.getEstatisticas().subscribe((estatisticas) => {this.estatisticas = estatisticas});
  }




}
