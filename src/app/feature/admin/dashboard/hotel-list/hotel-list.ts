import { Component } from '@angular/core';
import { HotelModel } from '../../../../shared/models/HotelModel';
import { Hotel } from '../../../../service/hotel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss',
})
export class HotelList {

  hotels: HotelModel[] = [];

  constructor(private hotelService: Hotel, private router: Router) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data: HotelModel[]) => {
        this.hotels = data;
        console.log('Hotels loaded:', this.hotels);
      },
      error: (err) => {
        console.error('Error fetching hotels', err);
      }
    });
  }


  ViewDetails(id: number): void {
    this.router.navigate(['dashboard','hotel-details', id]);
  }
}
