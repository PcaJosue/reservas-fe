import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './auth/auth-routing.module';
import { CourseListComponent } from './course/course-list/course-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  ...authRoutes,
];

