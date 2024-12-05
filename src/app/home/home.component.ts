import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { TicketInfoService } from '../ticket-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  movies: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  isLoggedIn = false;
  selectedMovie: any = null;

  constructor(private movieApiService:MovieApiService,private authService:AuthentificationService ,private router:Router,
    public ticketInfo:TicketInfoService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLoginStatus();
    if (this.isLoggedIn) {
      this.userName = this.authService.getUserName(); // Get the username
    }
    this.loadMovies(this.searchQuery, this.currentPage);
    
  }

  // Function to load movies based on search query and page
  loadMovies(query: string, page: number): void {
    this.movieApiService.getMovies(query, page).subscribe((response: any) => {
      this.movies = response.results;
      this.totalPages = response.total_pages;
    });
  }

  // This method is triggered when the user types something in the search input
  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page when the search query changes
    this.loadMovies(this.searchQuery, this.currentPage);
  }
  viewDetails(movie: any) {
    this.selectedMovie = movie; // Pass the selected movie
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies(this.searchQuery, this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.searchQuery, this.currentPage);
    }
  }
  buyTicket(movie: any): void {
    // Fetch availability before navigating to buy ticket page
    this.movieApiService.getMovieAvailability(movie.id).subscribe(
      (response) => {
        if (response && response.availableDates.length > 0) {
          console.log(`Movie is available on: ${response.availableDates.join(', ')}`);
          // Proceed to the buy ticket page with available dates
          this.router.navigate(['/buy-ticket'], { state: { movie, availableDates: response.availableDates } });
        } else {
          console.log('No availability for this movie');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This movie is not available on the selected date.',
        });
        }
      },
      (error) => {
        console.error('Error fetching availability', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch movie availability.',
      });
      }
    );
  }
  checkAvailability(movieId: number): void {
    this.movieApiService.getMovieAvailability(movieId).subscribe((response: any) => {
      console.log(`Available Dates for Movie ID ${movieId}:`, response.availableDates);
    });
  }
  
  
}