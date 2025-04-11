import {Injectable} from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs'
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()

export class Auth {

    constructor(private authService: AuthService, private router: Router)
    {}
  
  
    intercept (req : HttpRequest<any> ,  next: HttpHandler):
    Observable<HttpEvent<any>>{


  
      return next.handle(req).pipe(
        catchError(e=>{
          if (e.status==401 ){
            if(this.authService.isAuthenticated()){
               this.authService.logout();
             }
             this.router.navigate(['/login']);
           }
           if ( e.status==403){
             Swal.fire('Acceso denegado.', `Hola ${this.authService.usuario.nombrePersona} no tienes acceso`, 'warning');
             this.router.navigate(['/comunicados']);
           }
           return throwError(e);                   
      })
    );
  }
}
