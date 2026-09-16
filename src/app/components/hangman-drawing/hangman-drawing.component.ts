import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hangman-drawing',
  standalone: true,
  templateUrl: './hangman-drawing.component.html',
  styleUrl: './hangman-drawing.component.css',
})
export class HangmanDrawingComponent {
  wrongGuesses = input<number>(0);
}
