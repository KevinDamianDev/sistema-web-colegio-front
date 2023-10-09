import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private url : string ='http://localhost:8080/personas';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient,
    private router: Router) { }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.url + '/').pipe(
      map(r => r as Persona[])
    );
  }

  create(persona: Persona) : Observable<any>{
    return this.http.post<any>(this.url+ '/', persona, {headers : this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      } )
    )
  }

  getPersona(id): Observable<Persona>{
    return this.http.get<Persona>(`${this.url}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/personas']);
        Swal.fire('Error',e.error.mensaje, 'error');;
        return throwError(e);
      })
    )
  }

  updatePersona(persona: Persona): Observable<any>{
    return this.http.put<any> (`${this.url}/${persona.idPersona}`, persona,{headers : this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      } )
    )
  }

  delete(id:number): Observable<Persona>{
    return this.http.delete<Persona>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      } )
    )
  }

}
