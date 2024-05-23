import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GAMES } from '../../mock-games';
import { NgFor, NgIf } from '@angular/common';
import { Game } from '../../game';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GameUpdateService } from '../../services/game-update.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  @Output() gameSelected = new EventEmitter<Game>();

  searchInput: string = '';
  
  games: Game[] = [];
  filteredList: Game[] | undefined;

  constructor(private gameService: GameService, private gameUpdateService: GameUpdateService) {}

  getGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.games = games);
  }

  onSelect(game: Game) {
    this.gameService.getGame(game.id).subscribe(selectedGame => {
      this.gameSelected.emit(selectedGame);
      this.gameService.emitGameChange();
      console.log(selectedGame.image, "This is on select");
    });
  }

  updateDropdown(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      this.filteredList = games;
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
      this.gameUpdateService.gameUpdate$.subscribe(() => {
        this.updateDropdown();
      });
    });
  }
}
