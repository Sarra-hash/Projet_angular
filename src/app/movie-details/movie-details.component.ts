import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MovieApiService } from '../movie-api.service';
import { WatchListService } from '../watch-list.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string = ''; // Initialized to avoid undefined errors
  movieDetails: any;
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '779929622dcdfc642d6f87148898f860';
  @Input() movie:any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location:Location,
    private movieapiservice:MovieApiService,
    private watchlistService:WatchListService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.getMovieDetails();
    
  }
  

  getMovieDetails(): void {
    const apiUrl = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=779929622dcdfc642d6f87148898f860`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.movieDetails = data;
      console.log('Fetched movie details:', data); // Check if all necessary fields are present

    });
  }
  goBack(): void {
    this.location.back(); // Navigate back to the previous page
  }
  // Modified method to accept both search query and page number
  getMovies(query: string, page: number): Observable<any> {
    const searchUrl = query
      ? `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`
      : `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get(searchUrl);
  }
  addToWatchlist(movie: any): void {
    
        console.log('Movie data being sent:',movie);
        const userId = localStorage.getItem('userId'); // Ensure userId exists in localStorage
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

   const movieData = {
    title: movie.title,
    poster_path: movie.poster_path,
    movieId: movie.id,
    vote_average: movie.vote_average,
    
  };

    this.http.post('http://localhost:3000/auth/addwatchlist', { userId, movie: movieData  }).subscribe(
      (response: any) => {
        console.log('Movie added to watchlist:', response);
      },
      (error) => {
        console.error('Error adding movie to watchlist:', error);
      }
    );
  }
  addToWatchlistt(movie: any): void {
    this.watchlistService.addMovieToWatchlist(movie);
  }
}
