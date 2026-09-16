import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.css',
})
export class ResultModalComponent {
  won = input<boolean>(false);
  word = input<string>('');
  wrongGuesses = input<number>(0);
  maxWrong = input<number>(7);
  playAgain = output<void>();
}
