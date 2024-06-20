import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from "../footer/footer.component";
import { TopicContentComponent } from '../topic-content/topic-content.component';

@Component({
    selector: 'app-topics',
    standalone: true,
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css'],
    imports: [QuoteComponent, CommonModule, NavBarComponent, FooterComponent, TopicContentComponent]
})

export class TopicsComponent {
  
}
