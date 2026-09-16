import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  value = input<number>(10);
  max = input<number>(10);

  percentage = computed(() => (this.value() / this.max()) * 100);

  isUrgent = computed(() => this.value() <= 3);
}
