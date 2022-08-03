import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';


export interface Book {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  lastModifiedDate?: Date;
}


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit {

  book: Book | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe((result: any) => {
        if (!result || !result.data) {
          return;
        }

        console.log(result);
        this.book = result.data.map((item: any): Book => ({
          id: item.id,
          title: item.attributes.content, 
          imageUrl: item.attributes.display_properties.image, 
          type: item.attributes.display_properties.type,
          lastModifiedDate: new Date()
        })).find((item: Book) => item.id === '1');
      });
  }

}
