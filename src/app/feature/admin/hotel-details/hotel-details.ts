import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../service/hotel';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelDetailsDto } from '../../../shared/models/HotelDetailsDto';
import { CommonModule, NgFor } from '@angular/common';
import { RoomService } from '../../../service/room/room-service';

@Component({
  selector: 'app-hotel-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.scss',
})
export class HotelDetails implements OnInit {
  hotelId!: number;
  hotel! : HotelDetailsDto;

  constructor(
    private route: ActivatedRoute,
    private hotelService: Hotel,
    private router:Router,
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.hotelId = Number(params.get('id'));
    this.loadHotelDetails();
  });
}

private loadHotelDetails(): void {
  this.hotelService.getHotelById(this.hotelId).subscribe({
    next: (data) => { this.hotel = data },
    error: (err) => console.log(err)
  });
}

deleteHotel(id: number): void {
  if (confirm('Are you sure you want to delete this Hotel?')) {
    this.hotelService.deleteHotel(id).subscribe({
      next: () => this.router.navigate(['/dashboard/hotel-list']), 
      error: (err) => console.error('Delete hotel failed:', err)
    });
  }
}

deleteRoom(id: number): void {
  if (confirm('Are you sure you want to delete this Room?')) {
    this.roomService.deleteRoom(id).subscribe({
      next: () => this.loadHotelDetails(), 
      error: (err) => console.error('Delete room failed:', err)
    });
  }
}

}
