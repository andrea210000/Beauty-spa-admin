import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

// 📋 Ejemplo: Esto es como un formulario impreso que exige escribir "usuario" y "contrasena" obligatoriamente.

export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

// 📩 Ejemplo: Esto es el sobre que te devuelve C# con el mensaje y la llave (token).
export interface LoginResponse {
  mensaje: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ⚙️ Traemos la herramienta para hacer peticiones a internet
  private http = inject(HttpClient);

  // 🌐 La dirección de la ventanilla de tu API en C#
  private apiUrl = environment.apiUrl

  // 🔐 El cartero que lleva los datos a C# y trae la respuesta
  login(credenciales:LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}Auth/Login`, credenciales);
  }

  // Decodificamos el JWT para obtener el nombre del cuerpo
  getUserFromToken (): {Nombre: string; [key: string]: any} | null //esta función devuelve un objeto con tal estructura o null
   {
    const token = localStorage.getItem('token');
    if(!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); //convierte string JSON a objeto de javascript
  }
}
