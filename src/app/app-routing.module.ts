import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module')
    .then(m => m.BookModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
