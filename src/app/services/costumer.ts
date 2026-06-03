import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {ClientesResponseDto} from './cliente-response.dto';

@Injectable({
  providedIn: 'root',
})
export class Costumer {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  //Devuelve observable en forma de array de clientes
  getAll(): Observable<ClientesResponseDto[]> {
    return this.http.get<ClientesResponseDto[]>(`${this.apiUrl}api/Cliente/ListClients`);
  }

  //Desde el frontend le indicamos cambiar estado segun el idCliente, Angular envia PUT a link de api y esta se encarga de recibir datos y actualizarlos
  updateStatus(idCliente: number, estado: number): Observable<any> { //Se recibe parametro de idCliente y el estado al que se actualizara
    return this.http.put(`${this.apiUrl}api/Cliente/UpdateEstadoUsuario?idCliente=${idCliente}&estado=${estado}`, 
      {},
      {responseType: 'text'}//Esto le dice a Angular que la respuesta es texto, no JSON
    );
  }

  //Conteo de registros de cliente el dia de hoy 
  getNewClientsToday(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}api/Cliente/newClienteToday`);
  }
}
