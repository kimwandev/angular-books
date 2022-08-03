import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailPage } from './pages/book-detail/book-detail.page';
import { BookListPage } from './pages/book-list/book-list.page';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: 'book-list',
        component: BookListPage
      },
      {
        path: 'detail/:id',
        component: BookDetailPage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
