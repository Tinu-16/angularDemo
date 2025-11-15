import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-hotel',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-hotel.html',
  styleUrl: './add-hotel.scss',
})
export class AddHotel {
  hotelForm!: FormGroup;
  isEditMode =false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      console.log('Hotel data:', this.hotelForm.value);
      // call your service here
    }
  }
}
