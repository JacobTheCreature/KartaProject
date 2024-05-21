import { Component, Input } from '@angular/core';
import { Game } from '../../game';
import { GameService } from '../../services/game.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gameframe',
  standalone: true,
  imports: [NgIf],
  templateUrl: './gameframe.component.html',
  styleUrl: './gameframe.component.css'
})
export class GameframeComponent {
  game?: Game;

  constructor(
    public gameService: GameService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gameID = Number(this.route.snapshot.paramMap.get('id'));
    if (gameID) {
      this.gameService.getGame(gameID).subscribe(game => {
        this.gameService.setSelectedGame(game);
        this.game = game;
      });
    }
  }

  getSanitizedUrl(url: string | undefined): SafeResourceUrl | undefined {
    console.log("HERE is HOJFHEFH")
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : undefined;
  }
}
