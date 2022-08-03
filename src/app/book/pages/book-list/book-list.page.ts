import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinct, Subject } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Book } from '../book-detail/book-detail.page';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss']
})
export class BookListPage implements OnInit, AfterViewInit {

  onSearchTermChange = new Subject<string>();

  searchTerm: string = '';

  books: Book[] = [];

  dataSource: MatTableDataSource<Book> | undefined;
  
  displayedColumns: string[] = ['imageUrl', 'title', 'type', 'action'];

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private bookService: BookService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  handleSearchTermChange() {
    this.onSearchTermChange.next(this.searchTerm);
  }

  ngAfterViewInit(): void {
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe((result: any) => {
        if (!result || !result.data) {
          return;
        }
        this.books = result.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.content, 
          imageUrl: item.attributes.display_properties.image, 
          type: item.attributes.display_properties.type 
        }));

        this.dataSource = new MatTableDataSource(this.books)
        
        this.dataSource.sort = this.sort || null;
      });
    
    this.onSearchTermChange
    .pipe(
      debounceTime(300),
    ).subscribe({
      next: (searchTerm: string) => {
        if(!this.dataSource) {
          return;
        }

        if(searchTerm) {
          this.dataSource.data = this.books.filter(item => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
        } else {
          this.dataSource.data = this.books;
        }
       
      },
    });
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }

      if (!this.dataSource) {
        return;
      }
  
      const data = this.dataSource.data.slice();
      if (!sortState.active || sortState.direction === '') {
        this.dataSource.data = data;
        return;
      }
  
      this.dataSource.data = data.sort((a, b) => {
        const isAsc = sortState.direction === 'asc';

        const at = a as any;
        const bt = b as any;
        return this.compareItems(
          at[sortState.active],
          bt[sortState.active],
          isAsc,
        );
      });
    }

    
  private compareItems(
    a: string | number | boolean | Date | string[] | null | undefined,
    b: string | number | boolean | Date | string[] | null | undefined,
    isAsc: boolean,
  ) {
    a = a || '';
    b = b || '';

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
