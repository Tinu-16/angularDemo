import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotelSearchParams } from '../shared/models/LoginModel';
import { HotelModel } from '../shared/models/HotelModel';

@Injectable({
  providedIn: 'root',
})
export class Hotel {
  private criteriaSource = new BehaviorSubject<HotelSearchParams | null>(null);
  criteria$ = this.criteriaSource.asObservable();

  private resultsSource = new BehaviorSubject<any[]>([]);
  results$ = this.resultsSource.asObservable();

  private apiUrl = 'https://localhost:7181/api/Hotel';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDistinctCities(): Observable<string[]> {
    return this.getHotels().pipe(
      map((hotels) => {
        const cities = hotels.map((hotel) => hotel.city);
        return [...new Set(cities)];
      })
    );
  }

  searchHotels(searchParams: HotelSearchParams): Observable<HotelModel[]> {
    let params = new HttpParams()
      .set('destination', searchParams.destination)
      .set('checkin', searchParams.checkin)
      .set('checkout', searchParams.checkout)
      .set('sort', searchParams.sort);

    if (searchParams.maxPrice) {
      params = params.set('maxPrice', searchParams.maxPrice);
    }

    return this.http.get<HotelModel[]>(`${this.apiUrl}/search`, { params });
  }

  setCriteria(criteria: HotelSearchParams) {
  this.criteriaSource.next(criteria);

  this.searchHotels(criteria).subscribe({
    next: (response) => {
      this.resultsSource.next(response);
    },
    error: (err) => {
      console.error('Error fetching hotels:', err);
      this.resultsSource.next([]); 
    }
  });
}

  updateCriteria(updated: Partial<HotelSearchParams>) {
  const currentCriteria = this.criteriaSource.value;
  if (currentCriteria) {
    const newCriteria = { ...currentCriteria, ...updated };
    this.setCriteria(newCriteria);
  }
}

getHotelDetails(id: number, searchParams: HotelSearchParams): Observable<HotelModel> {
  let params = new HttpParams()
    .set('destination', searchParams.destination)
    .set('checkin', searchParams.checkin)
    .set('checkout', searchParams.checkout)
    
  if (searchParams.maxPrice) {
    params = params.set('maxPrice', searchParams.maxPrice.toString());
  }

  return this.http.get<HotelModel>(`${this.apiUrl}/${id}/details`, { params });
}


}
