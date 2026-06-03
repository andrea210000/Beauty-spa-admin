import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayout } from './admin-layout/admin-layout';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { AppointmentManagementComponent } from './appointment-management-component/appointment-management-component';
import { CustomerManagementComponent } from './customer-management-component/customer-management-component';
import { ProductsInventoryComponent } from './products-inventory-component/products-inventory-component';
import { SalesRecordComponent } from './sales-record-component/sales-record-component';
import { SettingsComponent } from './settings-component/settings-component';
import { UsersManagementComponent } from './users-management-component/users-management-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sales', component: SalesRecordComponent },
      { path: 'appointments', component: AppointmentManagementComponent },
      { path: 'customers', component: CustomerManagementComponent },
      { path: 'inventory', component: ProductsInventoryComponent },
      { path: 'staff', component: UsersManagementComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
