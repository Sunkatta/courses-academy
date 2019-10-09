import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/@modules/course/models/course.model';
import { environment } from '../../../environments/environment';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private backendService: BackendService) { }

  getRawCourses(): Observable<any> {
    return this.backendService.backendRequest('get', 'Courses/GetRawCourses', null, false);
  }

  getCoursesPreview(): Observable<any> {
    return this.backendService.backendRequest('get', 'Courses', null, false);
  }

  getCourseById(id: string): Observable<any> {
    return this.backendService.backendRequest('get', 'Courses/' + id, null, false);
  }

  addNewCourse(data: any): Observable<any> {
    return this.backendService.backendRequest('post', 'Courses/CreateCourse', data, false);
  }

  deleteCourse(data: any): Observable<any> {
    return this.backendService.backendRequest('post', 'Courses/DeleteCourse', data, false);
  }

  updateCourse(data: any): Observable<any> {
    return this.backendService.backendRequest('post', 'Courses/UpdateCourse', data, false);
  }

  joinCourse(data: any): Observable<any> {
    return this.backendService.backendRequest('post', 'Courses/JoinCourse', data, false);
  }

  rateCourse(data: any): Observable<any> {
    return this.backendService.backendRequest('post', 'Courses/RateCourse', data, false);
  }
}
