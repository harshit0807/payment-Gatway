import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'payment',
    loadComponent: () =>
      import('./payment/payment-page/payment-page.component')
        .then(m => m.PaymentPageComponent)
  },

  {
    path: 'payment-success',
    loadComponent: () =>
      import('./payment/payment-success/payment-success.component')
        .then(m => m.PaymentSuccessComponent)
  },

  {
    path: 'payment-failed',
    loadComponent: () =>
      import('./payment/payment-failure/payment-failure.component')
        .then(m => m.PaymentFailureComponent)
  },

  { path: '', redirectTo: 'payment', pathMatch: 'full' },

  { path: '**', redirectTo: 'payment' }

];
