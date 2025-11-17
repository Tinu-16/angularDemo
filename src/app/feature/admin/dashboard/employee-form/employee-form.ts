import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../service/employee/employee-service';
import { Hotel } from '../../../../service/hotel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {
  employeeForm!: FormGroup;
  hotels: any[] = []; 
  isEditMode = false;
  empId: number=0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private hotelService: Hotel,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      hotelId: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;

        const employee = history.state.employee;
        if (employee) {
          this.isEditMode = true;
          this.empId = Number(this.route.snapshot.paramMap.get('id'));

          this.employeeForm.patchValue({
            fullName: employee.fullName,
            email: employee.email,
            role: employee.role,
            hotelId: employee.hotelId 
          });

          if (!employee.hotelId && employee.hotelName) {
            const selectedHotel = this.hotels.find(h => h.name === employee.hotelName);
            this.employeeForm.patchValue({
              hotelId: selectedHotel ? selectedHotel.id : ''
            });
          }
          this.employeeForm.get('fullName')?.disable();
          this.employeeForm.get('email')?.disable();
        }
      },
      error: (err) => console.error('Failed to load hotels:', err)
    });
  }

  onSubmit(): void {
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  const employeeData = this.employeeForm.getRawValue(); // ✅ includes disabled fields

  if (this.isEditMode) {
    this.employeeService.updateEmployee(this.empId, employeeData).subscribe({
      next: () => this.router.navigate(['/dashboard/employee-list']),
      error: (err) => console.error('Update employee failed:', err)
    });
  } else {
    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => this.router.navigate(['/dashboard/employee-list']),
      error: (err) => console.error('Add employee failed:', err)
    });
  }
}

}
