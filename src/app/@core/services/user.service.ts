import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/@shared/models/user/user.model';
import { environment } from 'src/environments/environment';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private backendService: BackendService) { }

    getAllUsers(): Observable<any> {
        return this.backendService.backendRequest('get', 'Users', null, false);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + 'users/' + id);
    }

    addNewUser(user: any): Observable<any> {
        return this.backendService.backendRequest('post', 'Account/Register', user, false);
    }

    getById(id: string): Observable<any> {
        return this.backendService.backendRequest('get', 'Users/' + id, null, true);
    }
}
