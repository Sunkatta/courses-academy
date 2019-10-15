import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from 'src/app/@core/services/course.service';
import { Course } from '../../models/course.model';
import { Subscription, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Student } from '../../models/student.model';
import { User } from 'src/app/@shared/models/user/user.model';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
    course: Course;
    subscription: Subscription;
    canAssign: boolean;
    isAuthenticated = false;
    user: User;
    student: Student;

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private userService: UserService,
                private authService: AuthService
    ) {}

    ngOnInit() {
        this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
        const courseId = this.route.snapshot.params.id;

        if (this.authService.user) {
            this.GetCourseAndUser(courseId);
        } else {
            this.courseService.getCourseById(courseId)
            .subscribe(
                response => {
                    this.course = response.body;
                }
            );
        }
    }

    login() {
        this.authService.login();
    }

    ratingComponentClick(clickObj: any): void {
        this.courseService.rateCourse({
            CourseId: this.course.id,
            UserId: this.user.id,
            PersonalRating: clickObj.rating
        })
        .subscribe(
            updatedRating => {
                this.course.rating = updatedRating;
                if (this.student.personalRating === 0) {
                    this.student.personalRating = clickObj.rating;
                    this.course.voters++;
                }
            }
        );
    }

    onJoinCourse() {
        const userId = this.user.id;
        if (Object.keys(this.course.students).find(u => u === this.user.id) !== undefined) {
            return;
        }

        this.courseService.joinCourse({
            UserId: userId,
            CourseId: this.course.id
        })
        .subscribe(
            () => {
                this.canAssign = false;
                this.course.studentsCount++;
                this.student = {
                    id: userId,
                    personalRating: 0
                };
            }
        );
    }

    calculateWidth(courseRating: number): number {
        return (courseRating - Math.floor(courseRating)) * 100;
    }

    private GetCourseAndUser(courseId: any) {
        // if user is logged, fork join getting the course and the user.
        const courseObservable = this.courseService.getCourseById(courseId);
        const userObservable = this.userService.getById(this.authService.sub);

        forkJoin([courseObservable, userObservable])
        .subscribe(
            results => {
                this.course = results[0].body;
                this.user = results[1].body;

                const studentId = Object.keys(this.course.students).find(u => u === this.user.id);
                studentId !== undefined ?
                    this.canAssign = false : this.canAssign = true;

                this.student = {
                    id: studentId,
                    personalRating: this.course.students[studentId]
                };
            }
        );
    }
}
