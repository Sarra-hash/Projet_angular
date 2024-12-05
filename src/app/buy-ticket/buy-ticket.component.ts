// buy-ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from '../movie-api.service'; // Assuming you're using this service to interact with the backend
import { Location } from '@angular/common'; // Import Location service
import { TicketInfoService } from '../ticket-info.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  movie: any = {};
  availableDates: string[] = [];
  selectedDate: string = ''; // To store the selected date
  numberOfTickets: number | null = null;

  constructor(private router: Router, private movieApiService: MovieApiService, private location: Location,
  public TicketInfo:TicketInfoService  
   ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.movie = navigation.extras.state['movie'];
      this.availableDates = navigation.extras.state['availableDates'];
    }
  }

  ngOnInit(): void {}

  purchaseTicket(): void {
    if (!this.selectedDate || !this.numberOfTickets) {
      alert('Please select a date and specify the number of tickets!');
      return;
    }
    const purchaseDetails = {
      movieId: this.movie.id,
      date: this.selectedDate,
      numberOfTickets: this.numberOfTickets,
      
    };
    
    this.movieApiService.purchaseTicket(purchaseDetails).subscribe(
      (response) => {
        alert('Tickets purchased successfully!');
        this.router.navigate(['/']); // Redirect to home after purchase
      },
      (error) => {
        console.error('Error purchasing tickets:', error);
        //alert(error.error.message || 'An unexpected error occurred.');
      }
    );
  }
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
  ticket={
    number:'',
   movieId:'',
  }
  add() {
   
    const ticketPrice = 10; 

  this.TicketInfo.Tickets.push({
    number: this.numberOfTickets,
    movieId: this.movie.id,
    movieTitle: this.movie.title, // Movie Title
    showtime: this.selectedDate,  // Showtime
    price: ticketPrice  // Price per ticket
  });

  
  Swal.fire({
    title: 'Success!',
    text: `You added ${this.numberOfTickets} tickets for "${this.movie.title}" on ${this.selectedDate}.`,
    icon: 'success',
    timer: 3000, // Closes after 3 seconds
  timerProgressBar: true,
  showConfirmButton: false,
    confirmButtonText: 'OK',
    background: '#343a40', // Optional: Dark theme
    color: '#fff', // Optional: Text color
    confirmButtonColor: '#ff6600', // Optional: Button color
  });
    
    // Reset fields
    this.numberOfTickets = null;
    this.selectedDate = '';
  }
  
}
