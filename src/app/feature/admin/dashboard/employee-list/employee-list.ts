import { Component, OnInit } from '@angular/core';
import { EmployeeDto } from '../../../../shared/models/EmployeeDto';
import { EmployeeService } from '../../../../service/employee/employee-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit  {
  employees: EmployeeDto[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
  this.employeeService.getAllEmployees().subscribe({
    next: (data) => this.employees = data,
    error: (err) => console.error('Failed to load employees:', err)
  });
}

  deleteEmployee(id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () =>  this.loadEmployees(),
      error: (err) => console.error('Delete employee failed:', err)
    });
  }
}

}
