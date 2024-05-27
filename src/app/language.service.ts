export enum Language {
  Romana = 'romana',
  English = 'english'
  // add other languages as needed
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSource = new BehaviorSubject<Language>(Language.Romana);
  currentLanguage = this.languageSource.asObservable();

  private buttonLabels: Record<Language, { topics: string[]; header: string }> = {
    [Language.Romana]: {
      topics: ['Bătălie', 'Dragoste', 'Prietenie', 'Suflet', 'Credință', 'Fericire', 'Reamintire', 'Timp', 'Cunoaștere de sine', 'Individualitate', 'Sănătate', 'Viață', 'Cunoașterea naturii umane', 'Înțelepciune', 'Singurătate', 'Viața de zi cu zi', 'Decizie', 'Libertate', 'Succes'],
      header: 'Citate'
    },
    [Language.English]: {
      topics: ['Battle', 'Love', 'Friendship', 'Soul', 'Faith', 'Happiness', 'Remembrance', 'Time', 'Self-Knowledge', 'Individuality', 'Health', 'Life', 'Understanding Human Nature', 'Wisdom', 'Loneliness', 'Everyday Life', 'Decision', 'Freedom', 'Success'],
      header: 'Quotes'
    }
    // add other languages as needed
  };

  changeLanguage(language: Language): void {
    this.languageSource.next(language);
  }

  getLabels(language: Language): { topics: string[]; header: string } {
    return this.buttonLabels[language];
  }
}

