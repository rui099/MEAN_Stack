import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pedido } from './models/pedido.model';

@Injectable()
export class PedidoService {
  selectedPedido: Pedido;
  pedidos:  Pedido[];
  private baseURL = 'http://localhost:5000/pedido';

  constructor(private http: HttpClient) { }

  postPedido(ped: Pedido) {
    return this.http.post(this.baseURL , ped);
  }

  getPedidoList() {
    return this.http.get(this.baseURL);
  }

  putPedido(ped: Pedido) {
    return this.http.put(this.baseURL + `/find/${ped._id}`, ped);
  }

  deletePedido(_id: string) {
    return this.http.delete(this.baseURL + `/find/${_id}`);
  }

  getEstatisticas(){
    return this.http.get(this.baseURL + `/estatisticas`);
  }

}
