export interface HotelDetailsDto {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  averageRating: number;
  totalReviews: number;
  rooms: Room[];
  reviews: Review[];
}

export interface Room {
  id: number;
  roomNumber:string;
  roomTypeName: string;
  price: number;
  status:string;
  capacity: number;
}

export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  reviewDate: Date; 
}