import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/@shared/models/user/user.model';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    user: User;

    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable<boolean>((observer) => {
            this.authService.getLoggedUser()
                .subscribe((response: User) => {
                    this.user = response;
                    if (this.user.role !== UserRole.Admin) {
                        this.router.navigateByUrl('courses');
                    }
                    observer.next(true);
                    observer.complete();
                });
        });
    }

    canActivate(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivateChild(route, segments);
    }
}
