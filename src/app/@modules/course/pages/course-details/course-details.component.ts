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
    ratingClicked: number;

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private userService: UserService,
                private authService: AuthService) {}

    ngOnInit() {
        this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
        const id = this.route.snapshot.params.id;

        // if user is logged, fork join getting the course and the user.
        if (this.authService.user) {
            const courseObservable = this.courseService.getCourseById(id);
            const userObservable = this.userService.getById(this.authService.name);

            forkJoin([courseObservable, userObservable])
            .subscribe(
                results => {
                    this.course = results[0].body;
                    this.user = results[1].body;
                    Object.values(this.course.students).find(u => u === this.user.id) !== undefined ?
                        this.canAssign = false : this.canAssign = true;
                }
            );
        } else {
            this.courseService.getCourseById(id)
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
        this.courseService.getAllCourses()
        .subscribe((allCourses: Course[]) => {
            const course = allCourses.find(c => c.id === clickObj.itemId);
            console.log(allCourses);
            if (!!course) {
            course.rating = clickObj.rating;
            this.ratingClicked = clickObj.rating;
            this.courseService.addNewCourse(course)
                .subscribe(
                () => {
                    console.log('Course Updated!');
                }
                );
            }
        });
    }

    onJoinCourse() {
        const userId = this.authService.name;
        if (Object.values(this.course.students).find(u => u === this.user.id) !== undefined) {
            return;
        }

        const student: Student = {
            id: userId
        };

        this.course.students.push(student);

        this.courseService.joinCourse({
            UserId: userId,
            CourseId: this.course.id
        })
        .subscribe(
            () => {
                this.canAssign = false;
            }
        );
    }

    calculateWidth(courseRating: number): number {
        console.log((courseRating - Math.floor(courseRating)) * 100);
        return (courseRating - Math.floor(courseRating)) * 100;
    }
}
