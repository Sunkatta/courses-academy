import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../models/course.model';
import { CourseService } from 'src/app/@core/services/course.service';
import { UserService } from 'src/app/@core/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/@shared/models/user/user.model';
import { Student } from '../../../models/student.model';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private courseService: CourseService,
              private router: Router) { }

  ngOnInit() {
    // this.isAuthenticated = sessionStorage.getItem('loggedUserId') ? true : false;

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

  onCourseSelected(id: string) {
    this.router.navigateByUrl('courses/' + id);
  }
}
