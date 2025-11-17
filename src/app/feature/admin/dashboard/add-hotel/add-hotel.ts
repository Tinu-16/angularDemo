import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Hotel } from '../../../../service/hotel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-hotel.html',
  styleUrl: './add-hotel.scss',
})
export class AddHotel {
  hotelForm!: FormGroup;
  isEditMode =false;
  hotelId: number =0;

  constructor(private fb: FormBuilder,private hotelService: Hotel,private route:ActivatedRoute,private router:Router ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
       name: ['', [Validators.required, Validators.minLength(3)]],
       address: ['', [Validators.required]],
       city: ['', [Validators.required]],
       country: ['', [Validators.required]],
       phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
  });

  const hotel = history.state.hotel;
    if (hotel) {
      this.isEditMode = true;
      this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
      this.hotelForm.patchValue(hotel); 
    }
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    const hotelData = this.hotelForm.value;

    if (this.isEditMode) {
      this.hotelService.updateHotel(this.hotelId, hotelData).subscribe({
        next: (res) => {
        console.log('Hotel updated:', res);
        this.router.navigate(['/dashboard/hotel-details', this.hotelId]);
      },
        error: (err) => console.error('Update failed:', err)
      });
    } 
    else {
      this.hotelService.addHotel(hotelData).subscribe({
        next: (res) => {
        console.log('Hotel added:', res);
        const newHotelId = res.id; 
        this.router.navigate(['/dashboard/hotel-details', newHotelId]);
      },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }
}
}
