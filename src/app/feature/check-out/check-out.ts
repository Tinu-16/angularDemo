import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../service/booking/booking';
declare var Razorpay: any;
@Component({
  selector: 'app-check-out',
  imports: [FormsModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.scss',
})
export class CheckOut implements OnInit {
  roomId!: number;
  checkInDate!: string;
  checkOutDate!: string;
  price!:number;
  guestName: string = '';
  guestEmail: string = '';
  guestPhone: string = '';
  Razorpay: any; 


  constructor(private route: ActivatedRoute, private router: Router,private bookingService: BookingService) {}

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.queryParamMap.get('roomId'));
    this.checkInDate = this.route.snapshot.queryParamMap.get('checkInDate')!;
    this.checkOutDate = this.route.snapshot.queryParamMap.get('checkOutDate')!;
    this.price = Number(this.route.snapshot.queryParamMap.get('price'));
  }


confirmBooking(): void {
  const options = {
    key: 'rzp_test_w7o9q4cpmPaEqQ', 
    amount: this.price * 100,   
    currency: 'INR',
    name: 'Hotel Booking',
    description: `Booking for Room ${this.roomId}`,
    image: 'https://yourlogo.com/logo.png', 
    handler: (response: any) => {
      console.log('Payment successful:', response);

      this.router.navigate(['/confirmation'], {
        queryParams: {
          roomId: this.roomId,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          price: this.price,
          paymentId: response.razorpay_payment_id,
          status: 'success'
        }
      });
    },
    prefill: {
      name: this.guestName,
      email: this.guestEmail,
      contact: this.guestPhone
    },
    theme: {
      color: '#3399cc'
    }
  };

  const rzp = new Razorpay(options);
  rzp.open(); // ✅ opens Razorpay dummy checkout popup
}
}