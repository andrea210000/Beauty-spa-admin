import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgStyle, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  username = signal('');
  password = signal('');

  showPassword = signal(false);
  usernameError = signal(false);
  passwordError = signal(false);

  private specialChars = /[!@#$%^&*()_+\-=\[\]{}|;':",.\/<>?]/;

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 30) {
      input.value = value.slice(0, 30);
      return;
    }

    if (this.specialChars.test(value)) {
      this.usernameError.set(true);
      input.value = value.replace(this.specialChars, '');
    } else {
      this.usernameError.set(false);
      this.username.set(input.value);
    }
  }

  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 12) {
      input.value = value.slice(0, 12);
      return;
    }

    if (this.specialChars.test(value)) {
      this.passwordError.set(true);
      input.value = value.replace(this.specialChars, '');
    } else {
      this.passwordError.set(false);
      this.password.set(input.value);
    }
  }

  onEnter(event: Event): void {
    event.preventDefault();
    if (this.isValid()) {
      this.login();
    }
  }

  isValid(): boolean {
    return (
      this.username().length > 0 &&
      this.password().length > 0 &&
      !this.usernameError() &&
      !this.passwordError()
    );
  }

  private rolesPermitidos = [1, 2, 3];

  login(): void {
    const datoslogin = {
      usuario: this.username(),
      contrasena: this.password(),
    };

    this.authService.login(datoslogin).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.accessToken);

        const usuario = this.authService.getUserFromToken();
        if (!usuario) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de autenticación',
            detail: 'No se pudo leer la información del usuario',
            life: 4000,
          });
          return;
        }

        const rolRaw =
          usuario['idrol'] ??
          usuario['rol'] ??
          usuario['role'] ??
          usuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
          0;
        const rol = Number(rolRaw);

        if (!this.rolesPermitidos.includes(rol)) {
          localStorage.removeItem('token');
          this.messageService.add({
            severity: 'error',
            summary: 'Acceso denegado',
            detail: 'No tienes permisos para acceder al sistema',
            life: 4000,
          });
          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Inicio de sesión exitoso',
          detail: 'Bienvenido de nuevo al santuario',
          life: 3000,
        });

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1200);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Credenciales incorrectas',
          detail: 'Verifica tu usuario y contraseña',
          life: 4000,
        });
      },
    });
  }
}
