
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Pedido } from './models/pedido.model';


@Injectable()
export class AgendamentoService {



  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  putPedido(ped: Pedido) {
    return this.http.put(this.baseURL + `/agendamento/${ped._id}`, ped);
  }

}
