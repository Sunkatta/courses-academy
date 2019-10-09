import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    backendRequest(requestType, requestTarget, requestData?, useUserToken?): Observable<any> {
        return this.baseBackendRequest(requestType, requestTarget, requestData, useUserToken);
    }

    private baseBackendRequest(requestType, requestTarget, requestData?, useUserToken?): Observable<any> {
        if (requestType === 'post') {
            return this.http.post(
                environment.apiUrl + requestTarget,
                requestData,
                { headers: this.getContentHeaders(useUserToken) }
            );
        } else if (requestType === 'get') {
            return this.http.get(
                environment.apiUrl + requestTarget,
                { headers: this.getContentHeaders(useUserToken), params: requestData, observe: 'response' }
            );
        }
    }

    getContentHeaders(useUserToken?: any): HttpHeaders {
        let contentHeaders = new HttpHeaders();
        if (this.authService.user !== null) {
            let authToken = this.authService.authorizationHeaderValue;
            if (useUserToken) { authToken = this.authService.user.id_token; }
            contentHeaders = contentHeaders.set('Authorization', authToken);
        }
        return contentHeaders;
    }
}
