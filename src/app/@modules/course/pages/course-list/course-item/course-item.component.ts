import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() delete = new EventEmitter<string>();

  ratingClicked: number;
  isAdmin = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onCourseSelected(id: string) {
    this.router.navigateByUrl('courses/' + id);
  }
}
