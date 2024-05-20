import { Injectable } from '@angular/core';
import { Game } from '../game';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  selectedGame: Game | undefined;

  constructor(private _http: HttpClient) { }

  getGames(): Observable<Game[]> {
    const url = `http://localhost:3000/games`;
    return this._http.get<Game[]>(url);
  }

  getGame(gameID: number): Observable<Game> {
    const url = `http://localhost:3000/game/${gameID}`;
    return this._http.get<Game>(url).pipe(
      tap(game => this.selectedGame = game)
    );
  }

  setSelectedGame(game: Game): void {
    this.selectedGame = game;
  }

   createGame(game: Game): Observable<Game> {
     const url = `http://localhost:3000/game/`;
     return this._http.post<Game>(url, game, options);
   }

   deleteGame(gameID: number): Observable<void> {
     const url = `http://localhost:3000/game/${gameID}`;
     return this._http.delete<void>(url, options);
  }

   updateGame(game: Game): Observable<void> {
    const url = `http://localhost:3000/game/${game.id}`;
    return this._http.put<void>(url, game, options);
  }
}
