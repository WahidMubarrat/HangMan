import { Injectable, signal, computed } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { Category, Difficulty } from '../models/word.model';
import { WordService } from './word.service';
import { StatisticsService } from './statistics.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly MAX_WRONG = 7;

  readonly gameState = signal<GameState>({
    word: '',
    category: 'programming',
    hint: '',
    difficulty: 'easy',
    guessedLetters: new Set<string>(),
    wrongGuesses: 0,
    maxWrongGuesses: this.MAX_WRONG,
    timerValue: 10,
    isGameOver: false,
    isWon: false,
    hintUsed: false,
    currentScreen: 'start',
  });

  readonly displayWord = computed(() => {
    const state = this.gameState();
    return state.word
      .split('')
      .map(letter => (state.guessedLetters.has(letter) ? letter : '_'));
  });

  readonly revealedCount = computed(() => {
    return this.displayWord().filter(l => l !== '_').length;
  });

  readonly allRevealed = computed(() => {
    return this.revealedCount() === this.gameState().word.length;
  });

  readonly usedLetters = computed(() => {
    return Array.from(this.gameState().guessedLetters);
  });

  constructor(
    private wordService: WordService,
    private statisticsService: StatisticsService
  ) {}

  startGame(category: Category | 'all', difficulty: Difficulty): void {
    const entry = this.wordService.getRandomWord(category, difficulty);
    this.gameState.set({
      word: entry.word.toUpperCase(),
      category: entry.category,
      hint: entry.hint,
      difficulty,
      guessedLetters: new Set<string>(),
      wrongGuesses: 0,
      maxWrongGuesses: this.MAX_WRONG,
      timerValue: 10,
      isGameOver: false,
      isWon: false,
      hintUsed: false,
      currentScreen: 'game',
    });
  }

  guessLetter(letter: string): void {
    const state = this.gameState();
    if (state.isGameOver || state.guessedLetters.has(letter)) return;

    const newGuessed = new Set(state.guessedLetters);
    newGuessed.add(letter);

    const isWrong = !state.word.includes(letter);
    const newWrongCount = isWrong ? state.wrongGuesses + 1 : state.wrongGuesses;

    const won = state.word.split('').every(l => newGuessed.has(l));
    const lost = newWrongCount >= this.MAX_WRONG;

    this.gameState.update(s => ({
      ...s,
      guessedLetters: newGuessed,
      wrongGuesses: newWrongCount,
      timerValue: 10,
      isGameOver: won || lost,
      isWon: won,
      currentScreen: (won || lost) ? 'result' : s.currentScreen,
    }));

    if (won) {
      this.statisticsService.recordWin(newWrongCount, this.MAX_WRONG);
    } else if (lost) {
      this.statisticsService.recordLoss();
    }
  }

  timeUp(): void {
    const state = this.gameState();
    if (state.isGameOver) return;

    const newWrongCount = state.wrongGuesses + 1;
    const lost = newWrongCount >= this.MAX_WRONG;

    this.gameState.update(s => ({
      ...s,
      wrongGuesses: newWrongCount,
      timerValue: 10,
      isGameOver: lost,
      isWon: false,
      currentScreen: lost ? 'result' : s.currentScreen,
    }));

    if (lost) {
      this.statisticsService.recordLoss();
    }
  }

  useHint(): void {
    const state = this.gameState();
    if (state.hintUsed || state.isGameOver) return;
    this.gameState.update(s => ({ ...s, hintUsed: true }));
  }

  resetTimer(): void {
    this.gameState.update(s => ({ ...s, timerValue: 10 }));
  }

  decrementTimer(): void {
    this.gameState.update(s => ({ ...s, timerValue: Math.max(0, s.timerValue - 1) }));
  }

  goToStart(): void {
    this.gameState.update(s => ({ ...s, currentScreen: 'start' }));
  }
}
