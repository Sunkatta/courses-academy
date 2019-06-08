import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (!sessionStorage.getItem('loggedUserId')) {
            this.router.navigateByUrl('auth/login');
        }
        return true;
    }
}
