import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HotelDetailsDto } from '../../shared/models/HotelDetailsDto';
import { Hotel } from '../../service/hotel'; // your service that wraps HttpClient
import {BookingService } from '../../service/booking/booking';
import { AuthService } from '../../service/auth-service';
import { CreateBookingCommand } from '../../shared/models/CreateBookingCommand ';

@Component({
  selector: 'app-view-details',
  standalone: true, // ✅ if you’re using standalone components
  imports: [CommonModule],
  templateUrl: './view-details.html',
  styleUrls: ['./view-details.scss'],
})
export class ViewDetails implements OnInit {
  hotel!: HotelDetailsDto;
  checkin = 'yyyy-mm-dd';
  checkout = 'yyyy-mm-dd';

  constructor(
    private route: ActivatedRoute,
    private hotelService: Hotel,
    private router:Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.hotelService.criteria$.subscribe(criteria => {
      if (criteria) {
        this.checkin = criteria.checkin;
        this.checkout = criteria.checkout;

        this.hotelService.getHotelDetailsWithAvailability(id, this.checkin, this.checkout)
          .subscribe({
            next: (data) => {
              this.hotel = data;
            },
            error: (err) => {
              console.error('Error fetching hotel details:', err);
            }
          });
      }
    });
  }

  bookRoom(roomId: number,price:number): void {
  const token = localStorage.getItem('token');

  if (!token) {
    this.router.navigate(['/user-login'], {
      queryParams: { returnUrl: this.router.url } 
    });
  } else {
    const customerId = this.authService.getUserId();
    if (!customerId) {
      console.error('Could not decode userId from token');
      return;
    }

    const command: CreateBookingCommand = {
      customerId: customerId,
      roomId: roomId,
      checkInDate: this.checkin,
      checkOutDate: this.checkout,
      totalAmount: price
    };

    this.bookingService.addBooking(command).subscribe({
      next: (booking) => {
        console.log('Booking created (Pending):', booking);
        this.router.navigate(['/checkout'], {
          queryParams: {
            bookingId: booking.id,
            roomId: booking.roomId,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            price: booking.totalAmount
          }
        });
      },
      error: (err) => {
        console.error('Booking creation failed:', err);
      }
    });
  }
  }
}

