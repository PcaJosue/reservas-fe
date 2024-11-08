import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Course } from '../course';

@Component({
  selector: 'app-course-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.scss']
})
export class CourseDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public course: Course,
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>
  ) {}

  onReserve() {
    console.log('Reservation for course:', this.course.name);
    this.dialogRef.close();
  }
}
