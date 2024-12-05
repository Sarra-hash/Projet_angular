
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: any[] = [];
constructor(private http:HttpClient){}
ngOnInit() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('UserId is not set in localStorage.');
    return; // Avoid making the API call if userId is null
  }
  this.http.get(`http://localhost:3000/auth/watchlist/${userId}`).subscribe(
    (response: any) => {
      this.watchlist = response.watchlist;
    },
    (error: any) => {
      console.error('Error fetching watchlist:', error);
    }
  );
}
removeFromWatchlist(movieId: string) {
  console.log('Removing movie from watchlist:', movieId);
  // Logic to remove the movie from the watchlist
  this.watchlist = this.watchlist.filter((movie) => movie.movieId !== movieId);
}

}
