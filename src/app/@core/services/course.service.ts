import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/@modules/course/models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {}

    getAllCourses(): Observable<Course[]> {
      return this.http.get<Course[]>('http://localhost:3000/courses');
    }

    getCourseById(id: string): Observable<Course> {
      return this.http.get<Course>(`http://localhost:3000/courses/${id}`);
    }

    addNewCourse(course: Course): Observable<any> {
      if (course.id) {
        return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
      }
      return this.http.post('http://localhost:3000/courses', course);
    }

    deleteCourse(id: string): Observable<any> {
      return this.http.delete('http://localhost:3000/courses/' + id);
    }

    joinCourse(course: Course): Observable<any> {
      return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
    }
}
