import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/@modules/course/models/course.model';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/@core/services/course.service';

@Component({
    selector: 'app-course-actions',
    templateUrl: './course-actions.component.html'
})
export class CourseActionsComponent {
    @Input() course: Course;
    @Output() courseDeleted: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router,
                private courseService: CourseService
    ) { }

    onDeleteClicked() {
        this.courseService.deleteCourse({
            CourseId: this.course.id
        })
        .subscribe(
            response => {
                this.courseDeleted.emit({
                    courses: response,
                    message: 'Course \'' + this.course.title + '\' successfully deleted!'
                });
            }
        );
    }

    onCourseEdit() {
        this.router.navigate(['admin/courses/edit', this.course.id]);
    }
}
