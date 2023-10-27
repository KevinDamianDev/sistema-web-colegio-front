import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private url : string ='http://localhost:8080/personas';

  private urlRol : string ='http://localhost:8080/roles';
  //private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient, 
    private router: Router) { }


   /* private agregarAutorizationHeader(){
      let token= this.auth.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization', 'Bearer '+ token);
      }
      return this.httpHeaders;
    }*/

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.url + '/')
    /*.pipe(
      catchError(e =>{
       
        return throwError(e);
      })
    )*/
  }


  create(persona: any) : Observable<any>{
    return this.http.post<any>(this.url+ '/', persona)
    .pipe(
      catchError(e =>{
        //Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      } )
    )
  }

  getPersona(id): Observable<Persona>{
    return this.http.get<Persona>(`${this.url}/${id}`)
    .pipe(     
      catchError(e =>{
        if(e.status !=401 && e.error.mensaje ){
          this.router.navigate(['/personas']);
        }
        return throwError(e);
      })
    )
  }

  updatePersona(persona: any): Observable<any>{
    console.log('this.persona service::: --> ', JSON.stringify(persona, null, 2));
    return this.http.put<any> (`${this.url}/${persona.idPersona}`, persona)
    .pipe(
      catchError(e =>{     
        return throwError(e);
      } )
    )
  }

  delete(id:number): Observable<Persona>{
    return this.http.delete<Persona>(`${this.url}/${id}`)
    .pipe(
      catchError(e =>{
       // Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      } )
    )
  }

  /*private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }*/
//METODO PAR AUTORIZACION
/*private isNoAutorizado(e): boolean{
  if (e.status==401 ){
   if(this.auth.isAuthenticated()){
      this.auth.logout();
    }
    this.router.navigate(['/login']);
    return true;
  }
  if ( e.status==403){
    Swal.fire('Acceso denegado.', `Hola ${this.auth.usuario.nombrePersona} no tienes acceso`, 'warning');
    this.router.navigate(['/eventos']);
    return true;
  }
  return false;
}*/

getRoles(): Observable<Rol[]> {
  return this.http.get<Rol[]>(this.urlRol + '/')
}

}
