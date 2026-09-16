import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css',
})
export class KeyboardComponent {
  usedLetters = input<string[]>([]);
  disabled = input<boolean>(false);
  letterGuessed = output<string>();

  rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  isUsed(letter: string): boolean {
    return this.usedLetters().includes(letter);
  }

  onKeyPress(letter: string): void {
    if (this.disabled() || this.isUsed(letter)) return;
    this.letterGuessed.emit(letter);
  }
}
