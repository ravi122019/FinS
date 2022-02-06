import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/core/auth/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  constructor(private authService: AuthService, private routes: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            // redirect user to the logout page
            sessionStorage.removeItem('authToken');
            this.routes.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    )
  }
}
