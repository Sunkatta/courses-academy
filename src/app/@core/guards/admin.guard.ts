import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {

    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable<boolean>(
            (observer) => {
                this.authService.isAdmin()
                .subscribe(
                    (response: boolean) => {
                        if (response === false) {
                            this.router.navigateByUrl('courses');
                        }
                        observer.next(true);
                        observer.complete();
                    }
                );
            }
        );
    }

    canActivate(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivateChild(route, segments);
    }
}
