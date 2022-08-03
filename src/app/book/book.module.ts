import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import { BookRoutingModule } from './book-routing.module';
import { BookListPage } from './pages/book-list/book-list.page';
import { BookComponent } from './book.component';
import { FormsModule } from '@angular/forms';
import { BookDetailPage } from './pages/book-detail/book-detail.page';
import { TooltipDirective } from './directives/tooltip.directive';


@NgModule({
  declarations: [
    BookListPage,
    BookComponent,
    BookDetailPage,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  exports: [
    TooltipDirective
  ],
  bootstrap: [BookComponent]
})
export class BookModule { }
