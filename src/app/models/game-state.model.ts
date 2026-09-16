import { Category, Difficulty } from './word.model';

export interface GameState {
  word: string;
  category: Category;
  hint: string;
  difficulty: Difficulty;
  guessedLetters: Set<string>;
  wrongGuesses: number;
  maxWrongGuesses: number;
  timerValue: number;
  isGameOver: boolean;
  isWon: boolean;
  hintUsed: boolean;
  currentScreen: 'start' | 'game' | 'result';
}
