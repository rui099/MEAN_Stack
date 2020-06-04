import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'

import { PedidoService } from '../pedido.service';
import { Pedido } from '../models/pedido.model';



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService]
})
export class PedidoComponent implements OnInit {
  

  
  
  constructor(public pedidoService: PedidoService) { }

  

  ngOnInit() {
    this.resetForm();
    this.refreshPedidoList();
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
      grupo: false ,
      tLocalRisco: false ,
      inicio: null,
      fim: null,
      user: "",
      estado: null,
      resultado: null,
    }
    this.refreshPedidoList();
  }

  Submit(form: NgForm) {
    if (form.value._id == null ) {
      this.pedidoService.postPedido(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPedidoList();
      });
    }
    else {
      this.pedidoService.putPedido(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPedidoList();
      });
    }
  }

  refreshPedidoList() {
    this.pedidoService.getPedidoList().subscribe((res) => {
      this.pedidoService.pedidos = res as Pedido[];
    });
  }

  Edit(ped: Pedido) {
    this.pedidoService.selectedPedido = ped;
  }

  Delete(_id: string, form: NgForm) {
    if (confirm('Quer mesmo apagar este Pedido ?') == true) {
      this.pedidoService.deletePedido(_id).subscribe((res) => {
        this.refreshPedidoList();
        this.resetForm(form);
      });
    }
  }

    
}
