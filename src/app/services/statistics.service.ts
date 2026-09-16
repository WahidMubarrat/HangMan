import { Injectable } from '@angular/core';
import { Statistics } from '../models/statistics.model';

const STORAGE_KEY = 'hangman_statistics';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private defaultStats: Statistics = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    winPercentage: 0,
    bestPerformance: 'N/A',
  };

  getStatistics(): Statistics {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...this.defaultStats };
    try {
      return JSON.parse(raw) as Statistics;
    } catch {
      return { ...this.defaultStats };
    }
  }

  saveStatistics(stats: Statistics): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }

  recordWin(wrongGuesses: number, maxWrong: number): void {
    const stats = this.getStatistics();
    stats.gamesPlayed++;
    stats.gamesWon++;
    stats.winPercentage = Math.round((stats.gamesWon / stats.gamesPlayed) * 100);

    const performance = `${wrongGuesses}/${maxWrong} wrong`;
    if (stats.bestPerformance === 'N/A' || wrongGuesses < this.parseBestWrong(stats.bestPerformance)) {
      stats.bestPerformance = performance;
    }
    this.saveStatistics(stats);
  }

  recordLoss(): void {
    const stats = this.getStatistics();
    stats.gamesPlayed++;
    stats.gamesLost++;
    stats.winPercentage = stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;
    this.saveStatistics(stats);
  }

  private parseBestWrong(perf: string): number {
    const match = perf.match(/^(\d+)\//);
    return match ? parseInt(match[1], 10) : Infinity;
  }
}
