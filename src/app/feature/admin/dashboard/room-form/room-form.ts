import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../service/room/room-service';
import { CommonModule } from '@angular/common';
import { RoomType } from '../../../../shared/models/RoomType';
import { RoomTypeService } from '../../../../service/room-type/room-type-service';
import { RoomStatus } from '../../../../shared/models/RoomStatus';

@Component({
  selector: 'app-room-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './room-form.html',
  styleUrl: './room-form.scss',
})
export class RoomForm implements OnInit{
  roomForm!: FormGroup;
  hotelId!: number;
  isEditMode = false;
  roomId?: number;
  roomTypes: RoomType[] = []; 
  RoomStatus = RoomStatus;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));

    this.roomForm = this.fb.group({
       roomNumber: ['', Validators.required],
       roomTypeId: ['', Validators.required],
       status: ['RoomStatus.Available', Validators.required],        
       pricePerNight: ['', [Validators.required, Validators.min(1)]],       
    });


      this.roomTypeService.getRoomTypes().subscribe({
      next: (types) => {
        this.roomTypes = types;

        const room = history.state.room;
        if (room) {
          this.isEditMode = true;
          this.roomId = room.id;

          const type = this.roomTypes.find(t => t.typeName === room.roomTypeName);

          this.roomForm.patchValue({
            roomNumber: room.roomNumber,
            roomTypeId: type ? type.id : '',
            status: room.status === 'Available'
                    ? RoomStatus.Available
                    : RoomStatus.UnderMaintenance,
            pricePerNight: room.pricePerNight ?? room.price
          });
        }
      },
      error: (err) => console.error('Failed to load room types:', err)
    });
  }

  onSubmit(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
       const roomData = {
        roomNumber: this.roomForm.value.roomNumber,
        roomTypeId: Number(this.roomForm.value.roomTypeId),
        status: Number(this.roomForm.value.status),
        pricePerNight: Number(this.roomForm.value.pricePerNight)
      };
      this.roomService.updateRoom(this.roomId!, roomData).subscribe({
        next: () => this.router.navigate(['/dashboard/hotel-details', this.hotelId]),
        error: (err) => console.error('Update room failed:', err)
      });
    } else {
       const roomData = {
        roomNumber: this.roomForm.value.roomNumber,
        hotelId:Number(this.route.snapshot.paramMap.get('hotelId')),
        roomTypeId: Number(this.roomForm.value.roomTypeId),
        status: this.roomForm.value.status as RoomStatus,
        pricePerNight: Number(this.roomForm.value.pricePerNight)
      };
      console.log(JSON.stringify(roomData));
     this.roomService.addRoom(roomData).subscribe({
        next: () => this.router.navigate(['/dashboard/hotel-details', this.hotelId]),
        error: (err) => console.error('Add room failed:', err)
      });
    }
  }
}
