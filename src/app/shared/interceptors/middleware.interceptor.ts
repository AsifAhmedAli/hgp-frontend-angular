import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {HelpersService} from '../services/helpers.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Messages} from '../constants/constants';
import {response} from '../functions/core.function';

@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor{
  isConnected = navigator.onLine;
  constructor(
    private helpersService: HelpersService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isConnected) {
      return throwError(response(Messages.internetConnectionDescription, 400));
    }

    if (req.url !== 'https://api-us.cometchat.io/v2.0/users' && this.authService.isAuthenticated()) {
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.getToken()
        })
      });
    }

    return next.handle(req).pipe(
      catchError(
        error => {
          if (error.status === 401) {
            this.authService.logout();
          }
          if (error.status === 404) {
            this.helpersService.redirectTo404();
          }
          return throwError(error);
        }
      )
    );
  }
}
