import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  isAdmin = false;
  error: boolean;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    if (this.route.snapshot.queryParams.code !== undefined) {
      await this.authService.completeAuthentication();
    }

    this.courseService.getAllCourses()
    .subscribe(
      response => {
        response.body.forEach(course => {
          this.courses.push(course);
        });
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
