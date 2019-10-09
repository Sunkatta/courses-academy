import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private backendService: BackendService) { }

    addNewUser(user: any): Observable<any> {
        return this.backendService.backendRequest('post', 'Account/Register', user, false);
    }

    blockUser(data: any): Observable<any> {
        return this.backendService.backendRequest('post', 'Users/BlockUnblockUser', data, false);
    }

    getAllUsers(): Observable<any> {
        return this.backendService.backendRequest('get', 'Users', null, false);
    }

    getById(id: string): Observable<any> {
        return this.backendService.backendRequest('get', 'Users/' + id, null, false);
    }
}
