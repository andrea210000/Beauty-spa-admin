import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
  private router = inject(Router);

  section = signal('dashboard');

  searchLabel = computed(() => {
    const labels: Record<string, string> = {
      dashboard: 'dashboard',
      sales: 'ventas',
      appointments: 'citas',
      customers: 'clientes',
      inventory: 'inventario',
      staff: 'personal',
      settings: 'configuración',
      help: 'ayuda',
      profile: 'perfil',
    };
    return labels[this.section()] || '';
  });

  ngOnInit(): void {
    const path = this.router.url.replace('/admin/', '');
    if (path) this.section.set(path);
  }

  goTo(section: string): void {
    this.section.set(section);
    this.router.navigate([`/admin/${section}`]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}