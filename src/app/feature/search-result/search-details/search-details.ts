import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Hotel } from '../../../service/hotel';
import { FormsModule } from '@angular/forms';
import { HotelModel } from '../../../shared/models/HotelModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-details.html',
  styleUrl: './search-details.scss',
})
export class SearchDetails {
  hotels: HotelModel[] = [];
  sortOption = 'recommended';
  destination = ''; 

  constructor(private hotelService: Hotel, private router: Router) {
    this.hotelService.results$.subscribe(results => {
    this.hotels = results;
    });

    this.hotelService.criteria$.subscribe(criteria => {
      if (criteria) {
        this.destination = criteria.destination;
      }
    });
  }

 onSort(option: string) {
  this.hotelService.updateCriteria({ sort: option });
}


  viewDetails(id: number) {
    this.router.navigate(['/hotel', id]);
  }

}
