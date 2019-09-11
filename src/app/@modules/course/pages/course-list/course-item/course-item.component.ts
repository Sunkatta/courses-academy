import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../models/course.model';
import { CourseService } from 'src/app/@core/services/course.service';
import { UserService } from 'src/app/@core/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/@shared/models/user/user.model';
import { Student } from '../../../models/student.model';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() delete = new EventEmitter<string>();

  ratingClicked: number;
  user: User;
  isLogged = false;
  isAdmin = false;

  constructor(private courseService: CourseService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.isLogged = sessionStorage.getItem('loggedUserId') ? true : false;

    // if (this.isLogged) {
    //   this.userService.getById(+sessionStorage.getItem('loggedUserId'))
    //     .subscribe((response: User) => {
    //       this.user = response;
    //       this.isAdmin = this.user.role === UserRole.Admin;
    //     });
    // }
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

  onDeleteClicked() {
    this.delete.emit(this.course.id);
  }

  onCourseEdit() {
    this.router.navigate(['courses/edit', this.course.id]);
  }

  onJoinCourse() {
    const userId = this.user.id;
    if (this.course.students.findIndex(u => u.id === userId) !== -1) {
      return;
    }

    const student: Student = {
      name: this.user.name,
      id: userId
    };

    this.course.students.push(student);

    this.courseService.joinCourse(this.course)
      .subscribe(() => {
        console.log('SUCCESS!!!');
      });
  }

  get canAssign(): boolean {
    if (!this.user) {
      return false;
    }

    const userId = this.user.id;

    return this.course.students.findIndex(u => u.id === userId) === -1;
  }
}
