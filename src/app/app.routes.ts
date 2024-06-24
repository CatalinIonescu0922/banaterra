import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TopicsComponent } from './topics/topics.component';
import { AuthorsComponent } from './authors/authors.component';
import { LearnComponent } from './learn/learn.component';
import { DonateComponent } from './donate/donate.component';
import { MMComponent } from './mm/mm.component';
import { LoginComponent } from './login/login.component';
import { AddAuthorsComponent } from './add-authors/add-authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
export const routes: Routes = [
    {path : "" , component : HomeComponentComponent},
    {path : "topics" ,component: TopicsComponent},
    {path : "authors" , component : AuthorsComponent},
    {path : "authors" , children :[{path : "details/:authorId/:languageId", component : AuthorDetailsComponent}]},
    {path : "learn", component : LearnComponent},
    {path : "donate" , component : DonateComponent},
    {path : "mm" , component : MMComponent},
    {path : "login" , component : LoginComponent},
    {path : "add-authors",component : AddAuthorsComponent}
];
