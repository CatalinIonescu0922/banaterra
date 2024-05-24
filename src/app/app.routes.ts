import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TopicsComponent } from './topics/topics.component';
import { AuthorsComponent } from './authors/authors.component';
import { LearnComponent } from './learn/learn.component';
import { MMComponent } from './mm/mm.component';
import { LifeExpectancyComponent } from './life-expectancy/life-expectancy.component';
import { BiblicalLongevivsComponent } from './biblical-longevivs/biblical-longevivs.component';
import { PlantsComponent } from './plants/plants.component';
import { AnimalsComponent } from './animals/animals.component';

export const routes: Routes = [
    {path : "" , component : HomeComponentComponent},
    {path : "topics" ,component: TopicsComponent},
    {path : "authors" , component : AuthorsComponent},
    {path : "learn", component : LearnComponent},
    {path : "mm", component : MMComponent},
    {path : "life-expectancy", component : LifeExpectancyComponent},
    {path : "biblical-longevivs", component : BiblicalLongevivsComponent},
    {path : "plants", component : PlantsComponent},
    {path : "animals", component : AnimalsComponent}
];
