import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GAMES } from '../../mock-games';
import { NgFor, NgIf } from '@angular/common';
import { Game } from '../../game';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  @Output() gameSelected = new EventEmitter<Game>();

  searchInput: string = '';
  
  games: Game[] = [];
  filteredList: Game[] | undefined;

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
      this.filteredList = games;
    });
  }

  defaultGame(): void {
    const firstGameId = this.games[0].id;
    this.gameService.getGame(firstGameId).subscribe(selectedGame => {
      this.gameSelected.emit(selectedGame);
    });
  }

  filter(): void {
    const query = this.searchInput.toLowerCase();
    this.filteredList = this.games.filter(game =>
      game.title.toLowerCase().includes(query)
    );
  }
  

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      this.filteredList = games;
      if (this.games.length > 0) {
        const firstGameId = this.games[0].id;
        this.gameService.getGame(firstGameId).subscribe(selectedGame => {
          this.gameSelected.emit(selectedGame);
        });
      }
    });
  }
}
