import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/@modules/course/models/course.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {}

    getAllCourses(): Observable<Course[]> {
      return this.http.get<Course[]>(environment.apiUrl + 'courses');
    }

    getCourseById(id: string): Observable<Course> {
      return this.http.get<Course>(`${environment.apiUrl}courses/${id}`);
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

    joinCourse(course: Course): Observable<any> {
      return this.http.put(`${environment.apiUrl}courses/${course.id}`, course);
    }
}
