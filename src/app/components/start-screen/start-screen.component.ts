import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { StatisticsService } from '../../services/statistics.service';
import { Category, Difficulty } from '../../models/word.model';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [FormsModule, StatsComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.css',
})
export class StartScreenComponent {
  private gameService = inject(GameService);
  private statsService = inject(StatisticsService);

  selectedCategory = signal<Category | 'all'>('all');
  selectedDifficulty = signal<Difficulty>('easy');
  showStats = signal(false);

  categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'countries', label: 'Countries' },
    { value: 'animals', label: 'Animals' },
    { value: 'movies', label: 'Movies' },
    { value: 'sports', label: 'Sports' },
  ];

  difficulties: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Easy (4-6 letters)' },
    { value: 'medium', label: 'Medium (7-9 letters)' },
    { value: 'hard', label: 'Hard (10+ letters)' },
  ];

  get stats() {
    return this.statsService.getStatistics();
  }

  onCategoryChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as Category | 'all';
    this.selectedCategory.set(val);
  }

  onDifficultyChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as Difficulty;
    this.selectedDifficulty.set(val);
  }

  startGame(): void {
    this.gameService.startGame(this.selectedCategory(), this.selectedDifficulty());
  }

  toggleStats(): void {
    this.showStats.update(v => !v);
  }
}
