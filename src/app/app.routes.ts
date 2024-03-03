import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-page',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'profile-page/:id',
    loadComponent: () =>
      import('./profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
  },
  {
    path: 'admin-page',
    loadComponent: () =>
      import('./admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent
      ),
  },
  {
    path: 'users-page',
    loadComponent: () =>
      import('./users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
];
