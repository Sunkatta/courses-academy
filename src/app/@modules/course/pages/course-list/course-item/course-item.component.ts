import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onCourseSelected(id: string) {
    this.router.navigateByUrl('courses/' + id);
  }
}
