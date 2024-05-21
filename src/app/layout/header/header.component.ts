import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild(DropdownComponent) dropdownComponent!: DropdownComponent;

  selectedGame: Game | undefined;
  games: Game[] = [];
  newGame: Game = { id: 0, title: '', url: '', img: ''};
  gameLabel: string = '';
  gameUrl: string = '';
  gameImg: string = '';
  tempTitle: string = '';
  tempUrl: string = '';
  tempImg: string = '';

  constructor(public gameService: GameService) {}

  onGameSelected(game: Game) {
    this.selectedGame = game;
    this.gameLabel = this.selectedGame!.title;
    this.gameUrl = this.selectedGame!.url;
    this.gameImg = this.selectedGame!.img;
  }

  createGame(): void {
    this.newGame.title = this.tempTitle;
    this.newGame.url = this.tempUrl;
    this.newGame.img = this.tempImg;
    console.log(this.newGame.img);
    this.gameService.createGame(this.newGame).subscribe((createdGame) => {
      console.log('Game created successfully:', createdGame);
      this.newGame = { id: 0, title: '', url: '', img: ''};
      this.tempTitle = '';
      this.tempUrl = '';
      this.tempImg = '';
      this.dropdownComponent.updateDropdown();
    }, error => {
      console.error('Error creating game:', error);
    });
  }

  updateGame(): void {
    if (this.selectedGame) {
      this.selectedGame.title = this.gameLabel;
      this.selectedGame.url = this.gameUrl;
      this.gameService.updateGame(this.selectedGame).subscribe(() => {
        console.log('Game updated successfully!');
        this.dropdownComponent.updateDropdown();
      }, error => {
        console.error('Error updating game:', error);
      });
    }
  }

  deleteGame(): void {
    if (this.selectedGame) {
      this.gameService.deleteGame(this.selectedGame.id).subscribe(() => {
        console.log('Game deleted successfully!');
        this.dropdownComponent.updateDropdown();
        this.dropdownComponent.defaultGame();
      }, error => {
        console.error('Error delete game:', error);
      });
    }
  }

  editCancel(): void {
    if (this.selectedGame) {
      this.gameLabel = this.selectedGame.title;
      this.gameUrl = this.selectedGame.url;
    }
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      if (this.games.length > 0) {
        const firstGameId = this.games[0].id;
        this.gameService.getGame(firstGameId).subscribe(selectedGame => {
          this.selectedGame = selectedGame;
          this.gameLabel = this.selectedGame.title;
          this.gameUrl = this.selectedGame.url;
        });
      }
    });
  }
}
