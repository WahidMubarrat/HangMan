import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { GameService } from '../../services/game.service';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { TimerComponent } from '../timer/timer.component';
import { HangmanDrawingComponent } from '../hangman-drawing/hangman-drawing.component';
import { ResultModalComponent } from '../result-modal/result-modal.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    TitleCasePipe,
    WordDisplayComponent,
    KeyboardComponent,
    TimerComponent,
    HangmanDrawingComponent,
    ResultModalComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  readonly gameService = inject(GameService);
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  get state() {
    return this.gameService.gameState();
  }

  get displayWord() {
    return this.gameService.displayWord();
  }

  get usedLetters() {
    return this.gameService.usedLetters();
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      const s = this.gameService.gameState();
      if (s.isGameOver) {
        this.stopTimer();
        return;
      }
      if (s.timerValue <= 1) {
        this.gameService.timeUp();
        const newState = this.gameService.gameState();
        if (newState.isGameOver) {
          this.stopTimer();
        }
      } else {
        this.gameService.decrementTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  onLetterGuess(letter: string): void {
    this.gameService.guessLetter(letter);
    const s = this.gameService.gameState();
    if (s.isGameOver) {
      this.stopTimer();
    }
  }

  onHint(): void {
    this.gameService.useHint();
  }

  onPlayAgain(): void {
    this.gameService.goToStart();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      this.onLetterGuess(key);
    }
  }
}
