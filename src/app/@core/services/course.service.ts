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

    constructor(private http: HttpClient, private backendService: BackendService) {}

    getAllCourses(): Observable<any> {
      return this.backendService.backendRequest('get', 'Courses', null, false);
    }

    getCourseById(id: string): Observable<any> {
      return this.backendService.backendRequest('get', 'Courses/' + id, null, false);
    }

    addNewCourse(course: Course): Observable<any> {
      if (course.id) {
        return this.http.put(`${environment.apiUrl}courses/${course.id}`, course);
      }
      return this.http.post(environment.apiUrl + 'courses', course);
    }

    deleteCourse(id: string): Observable<any> {
      return this.http.delete(environment.apiUrl + 'courses/' + id);
    }

    joinCourse(data: any): Observable<any> {
      return this.backendService.backendRequest('post', 'Courses/JoinCourse', data, false);
    }
}
