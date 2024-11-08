import { Course } from "../course/course";

export interface Reservation {
  id: number;
  courseName: string;
  date: Date;
  status: string;
  course: Course;
}
