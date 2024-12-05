import { Component } from '@angular/core';
import { TicketInfoService } from '../ticket-info.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrl: './ticket-info.component.css'
})
export class TicketInfoComponent {
  constructor(public ticketInfo:TicketInfoService ,private location:Location){}
  goBack(): void {
    this.location.back(); // Navigate back to the previous page
  }
  cancelTicket(index: number): void {
    // Confirm if the user wants to cancel the ticket
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this ticket?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      background: '#343a40', // Dark background
      color: '#fff', // White text
      confirmButtonColor: '#ff6600', // Orange button
      cancelButtonColor: '#d33', // Red cancel button
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the ticket from the tickets array
        this.ticketInfo.Tickets.splice(index, 1);
  
        // Notify the user that the ticket was canceled successfully
        Swal.fire({
          title: 'Canceled!',
          text: 'Your ticket has been canceled.',
          icon: 'success',
          background: '#343a40',
          color: '#fff',
          confirmButtonColor: '#ff6600',
        });
      }
    });
  }
  
  
}
