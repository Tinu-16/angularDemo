import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../service/hotel';
import { ActivatedRoute } from '@angular/router';
import { HotelDetailsDto } from '../../../shared/models/HotelDetailsDto';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-hotel-details',
  imports: [CommonModule],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.scss',
})
export class HotelDetails implements OnInit {
  hotelId!: number;
  hotel! : HotelDetailsDto;

  constructor(
    private route: ActivatedRoute,
    private hotelService: Hotel
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {this.hotel = data},
      error:(err)=>{
        console.log(err);
      }
    });
  }

  // private loadHotel(id: number): void {
  // this.hotelService.getHotelById(id).subscribe({
  //     next: (data) => this.hotel = data,
  //     error: (err) => console.error('Error loading hotel details', err)
  //   });
  // }
}
