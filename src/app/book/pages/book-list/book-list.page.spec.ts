import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListPage } from './book-list.page';

describe('BookListPage', () => {
  let component: BookListPage;
  let fixture: ComponentFixture<BookListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
