import { Component, signal, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Costumer } from '../services/costumer';
import { count } from 'rxjs';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService); //traer instancia de AuthService
  private CostumerService = inject(Costumer);//injectamos instancia de costumer
  userName = signal(''); //propiedad publica de tipo string vacia]
  newClientsToday = signal(0); //indica que empieza desde cero

  ngOnInit(): void {
    const user = this.authService.getUserFromToken(); //llama funcion que decodifica el JWT y el resultado lo guarda en user
    console.log('Payload:', user); //Muestra objeto en consola para ver claims
    this.userName.set(user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'Admin');//Si user no es null/undefined y tiene nombre, úsalo. Si no, usa 'Admin' como fallback si no coloca el nombre que encontro en el payload
  
    this.CostumerService.getNewClientsToday().subscribe({
      next: (count) => this.newClientsToday.set(count),
      error: () => console.error('Error al cargar nuevos clientes'),
    });
  
  }

  
}
