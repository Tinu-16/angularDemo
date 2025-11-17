import { Component, OnInit } from '@angular/core';
import { RoomType } from '../../../../shared/models/RoomType';
import { RoomTypeService } from '../../../../service/room-type/room-type-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-type-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './room-type-list.html',
  styleUrl: './room-type-list.scss',
})
export class RoomTypeList implements OnInit {
  roomTypes: RoomType[] = [];

  constructor(
    private roomTypeService: RoomTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoomTypes();
  }

  private loadRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe({
      next: (data) => this.roomTypes = data,
      error: (err) => console.error('Failed to load room types:', err)
    });
  }

  deleteRoomType(id: number): void {
  if (confirm('Are you sure you want to delete this room type?')) {
    this.roomTypeService.deleteRoomType(id).subscribe({
      next: () =>  this.loadRoomTypes(),
      error: (err) => console.error('Delete roomType failed:', err)
    });
  }
}
}
