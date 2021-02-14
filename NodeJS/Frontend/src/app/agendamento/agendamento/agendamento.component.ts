import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



import { Pedido } from 'src/app/models/pedido.model';
import { User } from 'src/app/models/user.model';
import { AgendamentoService } from 'src/app/agendamento.service';
import { UserService } from 'src/app/user.service';
import { PedidoService } from 'src/app/pedido.service';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
  providers: [AgendamentoService,PedidoService,UserService ]
})


export class AgendamentoComponent implements OnInit {

  constructor(public agendamentoService: AgendamentoService,public userService: UserService , public pedidoService: PedidoService) { }

 
  ngOnInit() {
    this.resetForm();
    this.refreshUserList();
    this.refreshPedidoList();
  }

  Doutor = "Doutor";
  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.pedidoService.selectedPedido = {
      _id: "",
      nomeCompleto: "",
      idade: null,
      cidade: "",
      sintomas: "",
      encaminhado: null,
      grupo: null,
      tLocalRisco: null,
      inicio: null,
      fim: null,
      user: "",
      estado:null,
      resultado: null
    }
    this.refreshPedidoList();
  }

  Submit(form: NgForm) {
    if (form.value._id != "") {
      this.agendamentoService.putPedido(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPedidoList();
      });
    }
    else {

    }
  }

  refreshPedidoList() {
    this.pedidoService.getPedidoList().subscribe((res) => {
      this.pedidoService.pedidos = res as Pedido[];
    });
  }

  refreshUserList() {
    this.userService.getUserList().subscribe((user) => {
      this.userService.users = user as User[];
    });
  }

  selectPedido(ped: Pedido) {
    this.pedidoService.selectedPedido = ped;
  }

  selectUser(user: User) {
    this.pedidoService.selectedPedido.user = user.nome;
  }

  

}

