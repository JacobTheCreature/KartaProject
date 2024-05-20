import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { Game } from '../../game';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [DropdownComponent, FormsModule, NgIf]
})
export class HeaderComponent implements OnInit{
  @Output() add = new EventEmitter<Game>();
  @Output() edit = new EventEmitter<Game>();
  @Output() delete = new EventEmitter<Game>();

  selectedGame: Game | undefined;
  games: Game[] = [];
  newGame: Game = { id: 0, title: '', url: '' }; // Initialize new game object

  constructor(public gameService: GameService) {}

  onGameSelected(game: Game) {
    this.selectedGame = game;
  }

  createGame(): void {
    this.gameService.createGame(this.newGame).subscribe((createdGame) => {
      // Optionally, you can perform any action after the game is created
      console.log('Game created successfully:', createdGame);
      // Clear the form fields after successful creation
      this.games.push(createdGame);
      this.newGame = { id: 0, title: '', url: '' };
      
    }, error => {
      console.error('Error creating game:', error);
    });
  }

  updateGame(): void {
    if (this.selectedGame) {
      this.gameService.updateGame(this.selectedGame).subscribe(() => {
        // Optionally, you can perform any action after the game is updated
        console.log('Game updated successfully!');
      }, error => {
        console.error('Error updating game:', error);
      });
    }
  }

  deleteGame(): void {
    if (this.selectedGame) {
      this.gameService.deleteGame(this.selectedGame.id).subscribe(() => {
        // Optionally, you can perform any action after the game is updated
        console.log('Game deleted successfully!');
      }, error => {
        console.error('Error delete game:', error);
      });
    }
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      if (this.games.length > 0) {
        const firstGameId = this.games[0].id;
        this.gameService.getGame(firstGameId).subscribe(selectedGame => {
          this.selectedGame = selectedGame;
        });
      }
    });
  }
}
