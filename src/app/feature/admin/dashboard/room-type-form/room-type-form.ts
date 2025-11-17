import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomTypeService } from '../../../../service/room-type/room-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-type-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './room-type-form.html',
  styleUrl: './room-type-form.scss',
})
export class RoomTypeForm  implements OnInit {
  roomTypeForm!: FormGroup;
  isEditMode = false;
  roomTypeId!: number;

  constructor(
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roomTypeForm = this.fb.group({
      typeName: ['', Validators.required],
      description: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]]
    });

    const roomType = history.state.roomType;
    const id = this.route.snapshot.paramMap.get('id');

    if (roomType) {
      this.isEditMode = true;
      this.roomTypeId = id ? +id : roomType.id;
      this.roomTypeForm.patchValue(roomType);
    } 
  }

  onSubmit(): void {
    if (this.roomTypeForm.invalid) {
      this.roomTypeForm.markAllAsTouched();
      return;
    }

    const roomTypeData = this.roomTypeForm.getRawValue();

    if (this.isEditMode) {
      this.roomTypeService.updateRoomType(this.roomTypeId, roomTypeData).subscribe({
        next: () => this.router.navigate(['/dashboard/room-type']),
        error: (err) => console.error('Update room type failed:', err)
      });
    } else {
      this.roomTypeService.addRoomType(roomTypeData).subscribe({
        next: () => this.router.navigate(['/dashboard/room-type']),
        error: (err) => console.error('Add room type failed:', err)
      });
    }
  }

}
