import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {
  watchlist:any[]=[];
  constructor() { }


  addMovieToWatchlist(movie: any): void {
    // Check if the movie already exists in the watchlist to avoid duplicates
    const exists = this.watchlist.some((item) => item.movieId === movie.id);
    if (!exists) {
      this.watchlist.push({
        title: movie.title,
        poster_path: movie.poster_path,
        movieId: movie.id,
        vote_average: movie.vote_average
      });
      Swal.fire({
        title: 'Success!',
        text: `Movie "${movie.title}" has been added to your watchlist.`,
        icon: 'success',
        confirmButtonText: 'Great!',
        background: '#343a40', // Dark background for a stylish look
        color: '#fff', // White text for better visibility
        confirmButtonColor: '#ff6600', // Orange button color
      });
  
      console.log('Movie added to watchlist:', movie);
    } else {
      Swal.fire({
        title: 'Already in Watchlist',
        text: `Movie "${movie.title}" is already in your watchlist.`,
        icon: 'info',
        confirmButtonText: 'Got it',
        background: '#343a40',
        color: '#fff',
        confirmButtonColor: '#ff6600',
      });
  
      console.log('Movie is already in the watchlist:', movie);
    }
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }
  removeMovieFromWatchlist(movieId: string): void {
    this.watchlist = this.watchlist.filter((movie) => movie.movieId !== movieId);
    console.log(`Movie with ID ${movieId} removed from watchlist.`);
  }
}
