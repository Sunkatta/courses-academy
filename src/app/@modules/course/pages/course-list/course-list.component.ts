import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  isAdmin = false;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('loggedUserId') ? true : false;

    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.courses = response;
      }
    );
  }

  onAddCourse(): void {
    this.router.navigateByUrl('/courses/add');
  }

  onCourseDeleted(id: string): void {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.courseService.deleteCourse(id).subscribe(
        response => {
          console.log('COURSE DELETED');
        }
      );
    }
  }
}
