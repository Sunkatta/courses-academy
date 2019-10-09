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
    showAlert = false;
    message: string;
    isForDeletion: boolean;
    isSuccessful: boolean;
    courseForDeletion: Course;

    constructor(private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.title) {
            this.showAlert = true;
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

    onDeleteClicked(course: Course) {
        this.isForDeletion = true;
        this.courseForDeletion = course;
        this. message =
            'You are about to delete \'' +
            this.courseForDeletion.title +
            '\'!<br><b>This action cannot be undone!</b><br>Are you sure you want to proceed?';
        this.showAlert = true;
    }

    deleteCourse() {
        this.courseService.deleteCourse({
            CourseId: this.courseForDeletion.id
        })
        .subscribe(
            response => {
                this.courses = response,
                this.message = 'Course \'' + this.courseForDeletion.title + '\' successfully deleted!';
                this.isForDeletion = false;
                this.isSuccessful = true;
            }
        );
    }

    onCourseEdit(courseId: string) {
        this.router.navigate(['admin/courses/edit', courseId]);
    }

    closeAlert() {
        this.showAlert = !this.showAlert;
        this.router.navigateByUrl('admin/courses');
    }
}
