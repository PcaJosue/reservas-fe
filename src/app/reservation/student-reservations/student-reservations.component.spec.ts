import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReservationsComponent } from './student-reservations.component';

describe('StudentReservationsComponent', () => {
  let component: StudentReservationsComponent;
  let fixture: ComponentFixture<StudentReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
