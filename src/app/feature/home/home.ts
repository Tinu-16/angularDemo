import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../service/hotel';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelSearchParams } from '../../shared/models/LoginModel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  cities: string[] = [];
  searchForm!: FormGroup; 
  minDate = new Date().toISOString().split('T')[0];

  
  constructor(
    private fb: FormBuilder, 
    private hotelService: Hotel, 
    private router: Router,
    private route: ActivatedRoute) {}  

  ngOnInit(): void {
    this.hotelService.getDistinctCities().subscribe(data => {
      this.cities = data;
    });

     this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', {
        validators: Validators.required,
        updateOn: 'change' 
      }]
    }, { 
      validators: this.dateValidator
    });
    this.route.queryParams.subscribe(params => {
      if (params['destination'] || params['checkin'] || params['checkout']) {
        this.searchForm.patchValue({
          destination: params['destination'] || '',
          checkin: params['checkin'] || '',
          checkout: params['checkout'] || ''
        });
      }
    });
  
  }

  dateValidator(form: FormGroup): ValidationErrors | null {
    const checkin = form.get('checkin')?.value;
    const checkout = form.get('checkout')?.value;

    if (checkin && checkout && checkout <= checkin) {
      return { dateError: true };
    }
    return null;
  }
  
  
  getImagePath(city: string): string {
    const fileName = city.toLowerCase().replace(/\s+/g, '') + '.jpg';
    return 'assets/' + fileName;
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchData = this.searchForm.value; 

      const criteria: HotelSearchParams = {
      destination: searchData.destination,
      checkin: searchData.checkin,
      checkout: searchData.checkout,
      sort: 'recommended',     
      maxPrice: 100000           
    };
      this.hotelService.setCriteria(criteria);
      this.router.navigate(['search-results']);  
    }
  }
}
