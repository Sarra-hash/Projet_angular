import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WarchlistfkComponent } from './warchlistfk/warchlistfk.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'watchlist',component:WatchlistComponent
  },
  {
    path:'watchlistfk',component:WarchlistfkComponent
  },
  {
    path:'buy-ticket',component:BuyTicketComponent
  },
  {
    path:'ticket-Info',component:TicketInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
