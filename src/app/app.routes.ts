import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'GetFit - Unleash Your Peak Physique | AI Fitness',
  },
  {
    path: 'ahmedamr/login',
    component: AdminLoginComponent,
    title: 'Admin Terminal Login | GetFit',
  },
  {
    path: 'ahmedamr/dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
    title: 'Master Control Dashboard | GetFit Admin',
  },
  {
    path: 'ahmedamr/dashboard/:tab',
    component: DashboardComponent,
    canActivate: [adminGuard],
    title: 'Master Control Dashboard | GetFit Admin',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
