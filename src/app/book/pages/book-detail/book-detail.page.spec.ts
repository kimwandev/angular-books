import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailPage } from './book-detail.page';

describe('BookDetailPage', () => {
  let component: BookDetailPage;
  let fixture: ComponentFixture<BookDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
