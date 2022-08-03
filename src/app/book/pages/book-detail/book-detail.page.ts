import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe((result: any) => {
        const bookId = this.route.snapshot.paramMap.get('id');
        if (!result || !result.data || !bookId) {
          return;
        }

        this.book = result.data.map((item: any): Book => ({
          id: item.id,
          title: item.attributes.content, 
          imageUrl: item.attributes.display_properties.image, 
          type: item.attributes.display_properties.type,
          lastModifiedDate: new Date()
        })).find((item: Book) => item.id === bookId);
      });
  }

}
