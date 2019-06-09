import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/@shared/models/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + 'users');
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + 'users/' + id);
    }

    addNewUser(user: User): Observable<any> {
        if (user.id) {
            return this.http.put(`${environment.apiUrl}users/${user.id}`, user);
        }
        return this.http.post(environment.apiUrl + 'users', user);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}users/${id}`);
    }
}
