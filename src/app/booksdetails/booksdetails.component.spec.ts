import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksdetailsComponent } from './booksdetails.component';

describe('BooksdetailsComponent', () => {
  let component: BooksdetailsComponent;
  let fixture: ComponentFixture<BooksdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
