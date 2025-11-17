import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Hotel } from '../../../../service/hotel';

@Component({
  selector: 'app-add-hotel',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-hotel.html',
  styleUrl: './add-hotel.scss',
})
export class AddHotel {
  hotelForm!: FormGroup;
  isEditMode =false;

  constructor(private fb: FormBuilder,private hotelService: Hotel ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
  });

  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    const hotelData = this.hotelForm.value;

    if (this.isEditMode) {
      // this.hotelService.updateHotel(1, hotelData).subscribe({
      //   next: (res) => console.log('Hotel updated:', res),
      //   error: (err) => console.error('Update failed:', err)
      // });
    } else {
      this.hotelService.addHotel(hotelData).subscribe({
        next: (res) => console.log('Hotel added:', res),
        error: (err) => console.error('Add failed:', err)
      });
    }
  }
}
