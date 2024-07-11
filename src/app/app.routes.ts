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
import { CountryComponent } from './country/country.component';
import { PeopleComponent } from './people/people.component';
import { AnimalsComponent } from './animals/animals.component';
import { PlantsComponent } from './plants/plants.component';
import { BibleComponent } from './bible/bible.component';
import { AboutUsComponent } from './about-us/about-us.component';
export const routes: Routes = [
    {path : "" , component : HomeComponentComponent},
    {path : "topics" ,component: TopicsComponent},
    {path : "authors" , component : AuthorsComponent},
    {path : "authors" , children :[{path : "details/:authorId/:languageId", component : AuthorDetailsComponent}]},
    {path : "learn", component : LearnComponent},
    {path : "donate" , component : DonateComponent},
    {path : "about_us", component : AboutUsComponent}, 
    {path : "mm" , component : MMComponent},
    {path : "mm" , children :[{path : "country", component : CountryComponent}]},
    {path : "mm" , children :[{path : "people", component : PeopleComponent}]},
    {path : "mm" , children :[{path : "animals", component : AnimalsComponent}]},
    {path : "mm" , children :[{path : "plants", component : PlantsComponent}]},
    {path : "mm" , children :[{path : "bible", component : BibleComponent}]},
    {path : "login" , component : LoginComponent},
    {path : "add-authors",component : AddAuthorsComponent}
    
];
