import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelList } from './hotel-list/hotel-list';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
