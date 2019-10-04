import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from 'src/app/@modules/course/models/course.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {
    courses: Course[];
    successMessage = false;
    message: string;

    constructor(private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.title) {
            this.successMessage = true;
            this.message = 'Course \'' + this.route.snapshot.queryParams.title + '\' created successfuly!';
        }

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
        window.scroll(0, 0);
        this.courses = data.courses;
        this.message = data.message;
        this.successMessage = true;
    }
}
