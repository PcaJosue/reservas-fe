import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../course';
import { CourseDetailDialogComponent } from '../course-detail-dialog/course-detail-dialog.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  isLoading = true;

  constructor(private courseService: CourseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error('Failed to fetch courses');
      }
    });
  }

  openCourseDetail(course: Course) {
    const detailRef = this.dialog.open(CourseDetailDialogComponent, {
      width: '400px',
      data: course
    });

    detailRef.beforeClosed().subscribe((course: Course | null)=>{
      if(!course) return;
    })
  }

}
