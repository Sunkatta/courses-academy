import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from 'src/app/@modules/course/models/course.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html'
})
export class CourseTableComponent implements OnInit {
    courses: Course[];

    constructor(private courseService: CourseService,
                private router: Router
    ) { }

    ngOnInit() {
        this.courseService.getRawCourses()
        .subscribe(
            response => {
                this.courses = response.body;
            }
        );
    }

    onAddCourse(): void {
        this.router.navigateByUrl('admin/courses/add');
    }

    updateCourseTable(data: any) {
        this.courses = data.courses;
    }
}
