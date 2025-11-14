import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hotel } from '../../../service/hotel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-summary',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './search-summary.html',
  styleUrl: './search-summary.scss',
})
export class SearchSummary {
destination = 'New York';
checkin = 'yyyy-mm-dd';
checkout = 'yyyy-mm-dd';
priceValue = 1000;

constructor(private hotelService: Hotel) {
  this.hotelService.criteria$.subscribe(criteria => {
    if (criteria) {
      this.destination = criteria.destination;
      this.checkin = criteria.checkin;
      this.checkout = criteria.checkout;
    }
  });
}

onPriceChange(maxPrice:number) {
  console.log('Filter applied with maxPrice:', maxPrice);
  this.hotelService.updateCriteria( { maxPrice: maxPrice } );
}


}
