import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomType } from '../../shared/models/RoomType';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {
  private apiUrl = 'https://localhost:7181/api/RoomType';
  constructor(private http: HttpClient){}

  getRoomTypes(): Observable<any[]> {
      return this.http.get<RoomType[]>(`${this.apiUrl}`);
  }

  addRoomType(roomType: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, roomType);
  }

  updateRoomType(id: number, roomType: RoomType): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, roomType);
  }

  deleteRoomType(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
