import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BookdetailsService } from '../bookdetails.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booksdetails',
  standalone: true,
  imports: [NavBarComponent, FooterComponent,CommonModule],
  templateUrl: './booksdetails.component.html',
  styleUrl: './booksdetails.component.css'
})
export class BooksdetailsComponent implements OnInit{
   bookName : string='';
   bookAuthor : string='';
   bookId : string | null = '';
   quotes: string[] = [];
   constructor (private  route: ActivatedRoute, private router : Router, private bookDetailsService : BookdetailsService){
       const navigation = this.router.getCurrentNavigation();
       const state = navigation?.extras.state as {name : string , author : string};
       if(state){
          this.bookName=state.name;
          this.bookAuthor=state.author;
       }

      }
      ngOnInit(): void {
          this.bookId = this.route.snapshot.paramMap.get('bookId');
      }
   viewAllQuotes(){
       if(this.bookId){
         this.bookDetailsService.getAllQuotes(this.bookId).subscribe(response =>{
           this.quotes=response;
         })
       }
   }
   viewByChapter(){
      
   }



}
