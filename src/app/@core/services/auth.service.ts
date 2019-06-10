import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'src/app/@shared/models/user/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    public getLoggedUser(): Observable<User> {
        if (+sessionStorage.getItem('loggedUserId') === 0) {
            this.router.navigateByUrl('courses');
        } else {
            return new Observable<User>((observer) => {
                this.userService.getById(+sessionStorage.getItem('loggedUserId'))
                    .subscribe((response: User) => {
                        observer.next(response);
                        observer.complete();
                    },
                    () => {
                        this.logout();
                    });
            });
        }
    }

    public login(email: string, password: string): Observable<User> {
        return new Observable((observer) => {
            this.userService.getAllUsers().subscribe((allUsers: User[]) => {
                const user = allUsers.find(u => u.email === email && u.password === password);
                if (user) {
                    if (user.isBlocked) {
                        observer.error('Your account is blocked!');
                        return;
                    }
                    sessionStorage.setItem('loggedUserId', JSON.stringify(user.id));
                    observer.next(user);
                    observer.complete();
                } else {
                    observer.error('Incorrect username or password!');
                }
            });
        });
    }

    public logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
