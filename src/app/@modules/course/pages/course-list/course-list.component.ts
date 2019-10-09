import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from '../../models/course.model';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private authService: AuthService
  ) { }

  async ngOnInit() {
    if (this.route.snapshot.queryParams.code !== undefined) {
      await this.authService.completeAuthentication();
    }

    this.courseService.getCoursesPreview()
    .subscribe(
      response => {
        response.body.forEach(course => {
          this.courses.push(course);
        });
      }
    );
  }
}
