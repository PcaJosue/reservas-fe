import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Course } from '../course';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { ReservationService } from '../../reservation/reservation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [ReservationService],
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.scss']
})
export class CourseDetailDialogComponent {
  reservationForm: FormGroup;
  reservationMessage: string | null = null;
  loading:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: Course,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>
  ) {
    this.reservationForm = this.fb.group({
      date: [new Date(), Validators.required],
    });
  }

  onReserve() {
    if (this.reservationForm.valid) {
      const reservationData = {
        courseId: this.course.id,
        date: this.reservationForm.value.date,
      };
      this.loading=true;
      this.reservationService.reserveCourse(reservationData).subscribe({
        next: () => {
          this.reservationMessage = 'Reservation confirmed!';
          this.dialogRef.close()
          this.loading=false;
        },
        error: (error) => {

          this.reservationMessage = error.error.message || 'Reservation failed. Please try again.';
          this.loading=false;
        }
      });
    }
  }
}
