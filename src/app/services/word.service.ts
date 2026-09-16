import { Injectable } from '@angular/core';
import { WordEntry, Category, Difficulty } from '../models/word.model';
import { WORD_LIST } from '../data/words';

@Injectable({ providedIn: 'root' })
export class WordService {
  private filterByDifficulty(words: WordEntry[], difficulty: Difficulty): WordEntry[] {
    return words.filter(w => {
      const len = w.word.length;
      switch (difficulty) {
        case 'easy': return len >= 4 && len <= 6;
        case 'medium': return len >= 7 && len <= 9;
        case 'hard': return len >= 10;
      }
    });
  }

  getRandomWord(category: Category | 'all', difficulty: Difficulty): WordEntry {
    let filtered = category === 'all'
      ? [...WORD_LIST]
      : WORD_LIST.filter(w => w.category === category);

    filtered = this.filterByDifficulty(filtered, difficulty);

    if (filtered.length === 0) {
      filtered = WORD_LIST;
    }

    const index = Math.floor(Math.random() * filtered.length);
    return filtered[index];
  }
}
