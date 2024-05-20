import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GAMES } from '../../mock-games';
import { NgFor, NgIf } from '@angular/common';
import { Game } from '../../game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  @Output() gameSelected = new EventEmitter<Game>();
  
  
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  getGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.games = games);
  }

  onSelect(game: Game) {
    this.gameService.getGame(game.id).subscribe(selectedGame => {
      this.gameSelected.emit(selectedGame);
    });
  }

  updateDropdown(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      if (this.games.length > 0) {
        const firstGameId = this.games[0].id;
        this.gameService.getGame(firstGameId).subscribe(selectedGame => {
          this.gameSelected.emit(selectedGame);
        });
      }
    });
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      if (this.games.length > 0) {
        const firstGameId = this.games[0].id;
        this.gameService.getGame(firstGameId).subscribe(selectedGame => {
          this.gameSelected.emit(selectedGame);
        });
      }
    });
  }
}
