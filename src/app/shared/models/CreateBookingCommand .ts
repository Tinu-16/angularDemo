export interface CreateBookingCommand {
  customerId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
}

export interface Booking {
  id: number;
  customerId: number;
  roomId: number;
  checkInDate: string;   
  checkOutDate: string;  
  status: string;        
  totalAmount: number;
}
