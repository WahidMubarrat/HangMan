import { Component, inject } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  private statsService = inject(StatisticsService);

  get stats() {
    return this.statsService.getStatistics();
  }
}
