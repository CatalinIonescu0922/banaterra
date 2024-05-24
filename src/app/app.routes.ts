import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TopicsComponent } from './topics/topics.component';
import { AuthorsComponent } from './authors/authors.component';
import { LearnComponent } from './learn/learn.component';
import { DonateComponent } from './donate/donate.component';
export const routes: Routes = [
    {path : "" , component : HomeComponentComponent},
    {path : "topics" ,component: TopicsComponent},
    {path : "authors" , component : AuthorsComponent},
    {path : "learn", component : LearnComponent},
    {path : "donate" , component : DonateComponent}
];
