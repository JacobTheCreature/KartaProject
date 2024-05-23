import { Component, Input, OnInit } from '@angular/core';
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
export class GameframeComponent{
  game?: Game;

  constructor(
    public gameService: GameService,
    private sanitizer: DomSanitizer,
  ) {}

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  getSanitizedUrl(url: string | undefined): SafeResourceUrl | undefined {
    console.log("GameFrameComponent reloading src");
    if (url && this.isValidUrl(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.error('Invalid URL:', url);
      return undefined;
    }
  }
}
