import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Reservation } from '../reservation';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditReservationDialog } from '../edit-reservation-dialog/edit-reservation-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [ReservationService]
})
export class StudentReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading:boolean = false;
  private reservationService= inject(ReservationService);


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => this.reservations = reservations,
      error: () => this.showMessage('Error loading reservations')
    });
  }

  editReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(EditReservationDialog, {
      data: { reservation }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadReservations();
      }
    });
  }

  cancelReservation(id: number): void {
    this.loading= true;
    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.showMessage('Reservation cancelled successfully');
        this.loadReservations();
        this.loading= false;
      },
      error: () => {
        this.showMessage('Error cancelling reservation')
        this.loading=false;
      }
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  goToCourses() {
    this.router.navigate(['/courses']);
  }

  logout() {
    this.authService.logout(); // Assuming logout method in AuthService
    this.router.navigate(['/login']);
  }
}
