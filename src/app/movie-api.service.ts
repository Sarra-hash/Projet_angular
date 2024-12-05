import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private myapiUrl='http://localhost:3000/api';
  private apiKey: string = '779929622dcdfc642d6f87148898f860'; // Replace with your TMDB API key
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Fetch popular movies
  getPopularMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  // Fetch movies based on a search query
  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1`;
    return this.http.get(url);
  }
  getMovies(query: string, page: number): Observable<any> {
    const searchUrl = query
      ? `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`
      : `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get(searchUrl);
  }
  getMoviess(): Observable<any> {
    return this.http.get(`${this.myapiUrl}/movies`);
  }

  // Fetch movie availability
  getMovieAvailability(movieId: number): Observable<any> {
    return this.http.get(`${this.myapiUrl}/movies/${movieId}/availability`);
  }
  purchaseTicket(details: any): Observable<any> {
    return this.http.post(`${this.myapiUrl}/movies/purchase`, details);
  }

  }

