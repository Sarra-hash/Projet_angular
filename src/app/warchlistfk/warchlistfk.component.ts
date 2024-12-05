import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WatchListService } from '../watch-list.service';

@Component({
  selector: 'app-warchlistfk',
  templateUrl: './warchlistfk.component.html',
  styleUrl: './warchlistfk.component.css'
})
export class WarchlistfkComponent {
  watchlist: any[] = [];

  constructor(private location:Location,private watchlistService: WatchListService){}
  movies = [
    { title: 'Moana 2', image: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg' },
    { title: 'Venom: The Last Dance', image: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg' },
    { title: 'Absolution', image: 'https://image.tmdb.org/t/p/w500/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg' },
    { title: 'Armor', image: 'https://image.tmdb.org/t/p/w500/pnXLFioDeftqjlCVlRmXvIdMsdP.jpg' }
  ];
  deleteMovie(index: number): void {
    this.movies.splice(index, 1);
  }
  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
    this.updateWatchlist();
    
  }
  updateWatchlist(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  goBack(): void {
    this.location.back();  // This will navigate the user to the previous page
  }
  removeFromWatchlist(movieId: string): void {
    this.watchlistService.removeMovieFromWatchlist(movieId);
    this.updateWatchlist(); // Refresh the watchlist after removal
  }
}
