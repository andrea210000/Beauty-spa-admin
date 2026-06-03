import { Component, signal, computed } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { Costumer } from '../services/costumer';
import { ClientesResponseDto } from '../services/cliente-response.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-management-component',
  standalone: true,
  imports: [],
  templateUrl: './customer-management-component.html',
  styleUrl: './customer-management-component.css',
})
export class CustomerManagementComponent implements OnInit {
  showFilter = signal(false);
  selectedFilters = signal<string[]>([]);
  private costumerService = inject(Costumer); //Crea una propiedad privada con la instancia única del servicio Costumer
  currentPage = signal(1);
  itemsPerPage = 8;

  filterOptions = ['Activo', 'Inactivo'];

  allClients = signal<ClientesResponseDto[]>([]); //signal que guarda el array vacío [] inicialmente. Cuando la API responda, se llenará con datos reales.

  filteredClients = computed(() => {
    const filters = this.selectedFilters();
    if (filters.length === 0) return this.allClients();
    return this.allClients().filter((c) => {
      return filters.includes(this.getEstadoLabel(c.estado));
    });
  });

  totalClients = computed(() => this.filteredClients().length);

  activeClients = computed(() => this.filteredClients().filter((c) => c.estado === 2).length);

  inactiveClients = computed(() => this.filteredClients().filter((c) => c.estado === 1).length);

  totalPages = computed(() => Math.ceil(this.totalClients() / this.itemsPerPage));

  paginatedClients = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredClients().slice(start, start + this.itemsPerPage);
  });

  toggleFilter(option: string): void {
    const current = this.selectedFilters();
    if (current.includes(option)) {
      this.selectedFilters.set(current.filter((f) => f !== option));
    } else {
      this.selectedFilters.set([...current, option]);
    }
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  //Aqui se cambia el estado del cliente comunicandose a la api por medio de un PUT, la api recibe y actualiza en la bd y angular repinta.
  toggleStatus(client: ClientesResponseDto): void {
    const nuevoEstado = client.estado === 2 ? 1 : 2;
    this.costumerService.updateStatus(client.idCliente, nuevoEstado).subscribe({
      next: () => (client.estado = nuevoEstado),
      error: (err) => console.error('Error al actualizar estado', err),
    });
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }

  getEstadoLabel(estado: number): string {
    //
    return estado === 2 ? 'Activo' : 'Inactivo';
  }

  ngOnInit(): void {
    //Llama al servicio, y cuando la API responde (next), guarda los datos en allClients.
    this.costumerService.getAll().subscribe({
      next: (data) => this.allClients.set(data),
      error: (err) => console.error('Error al cargar clientes', err),
    });
  }

  getIniciales(cliente: ClientesResponseDto): string {
    return (cliente.nombres.charAt(0) + cliente.apellidos.charAt(0)).toUpperCase(); //toma primera letra de nombre y apellido en mayus
  }

  getTipoIdentificacion(id: number): string { //Para asignar nombre a los int que entrega api del tipo de identificacion
    const tipos: Record<number, string> = { 1: 'TI', 2: 'CC', 3: 'CE' };
    return tipos[id] || 'Desconocido';
  }

  
}
