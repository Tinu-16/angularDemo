export interface Credentials {
  email: string;
  password: string;
}

export interface HotelSearchParams {
  destination: string;
  checkin: string;
  checkout: string;
  sort: string;
  maxPrice?: number;
}


