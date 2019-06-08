import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/@shared/models/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete('http://localhost:3000/users/' + id);
    }

    addNewUser(user: User): Observable<any> {
        if (user.id) {
            return this.http.put(`http://localhost:3000/users/${user.id}`, user);
        }
        return this.http.post('http://localhost:3000/users', user);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }
}
