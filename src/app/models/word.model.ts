export type Category = 'programming' | 'countries' | 'animals' | 'movies' | 'sports';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface WordEntry {
  word: string;
  category: Category;
  hint: string;
}
