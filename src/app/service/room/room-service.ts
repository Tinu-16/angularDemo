import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
    private apiUrl = 'https://localhost:7181/api/Room';

     constructor(private http: HttpClient) {}

    addRoom(room: any): Observable<any> {
      return this.http.post(`${this.apiUrl}`, room);
    }


    updateRoom(roomId: number, room: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${roomId}`, room);
    }

    deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
