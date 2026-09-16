import { Component, input } from '@angular/core';

@Component({
  selector: 'app-word-display',
  standalone: true,
  templateUrl: './word-display.component.html',
  styleUrl: './word-display.component.css',
})
export class WordDisplayComponent {
  word = input<string[]>([]);
}
