import { Component, inject } from '@angular/core';
import { GameService } from './services/game.service';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { GameComponent } from './components/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StartScreenComponent, GameComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private gameService = inject(GameService);

  get currentScreen() {
    return this.gameService.gameState().currentScreen;
  }
}
