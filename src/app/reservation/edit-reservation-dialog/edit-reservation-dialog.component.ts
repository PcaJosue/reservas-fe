import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../reservation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-reservation-dialog',
  standalone: true,
  templateUrl: './edit-reservation-dialog.component.html',
  styleUrls: ['./edit-reservation-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }]
})
export class EditReservationDialog {
  private reservationService = inject(ReservationService);
  editForm: FormGroup;
  loading:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservation: any },
    private dialogRef: MatDialogRef<EditReservationDialog>,
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      date: [data.reservation.date, Validators.required]
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.loading=true;
      const updatedData:Date = this.editForm.value.date;
      this.reservationService.updateReservation(this.data.reservation.id, updatedData).subscribe({
        next: () => {
          this.dialogRef.close(true)
          this.loading=false;
        },
        error: () => {
          console.error('Error updating reservation')
          this.loading=false;
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
