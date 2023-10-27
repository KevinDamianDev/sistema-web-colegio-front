import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { EventoPersona } from './evento-persona';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class EventoPersonaServiceService {

  private urlPersonaEvento : string ='http://localhost:8080/personaevento';

  constructor(
    private http: HttpClient) { }



  getPersonaEvento(id): Observable<any> {
    return this.http.get<any>(`${this.urlPersonaEvento}/${id}`).pipe(
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

    // EVENTOS QUE TIENE UNA PERSONA
    getEventosByPersona(id): Observable<any> {
      return this.http.get<any>(`${this.urlPersonaEvento}/personas/${id}`).pipe(
        catchError(e => {
          if (e.status == 404) {
            return throwError(e);
          }
          return throwError(e);
        })
      )
    }

    
    deletePersonaEvento(id:number): Observable<EventoPersona>{
      return this.http.delete<EventoPersona>(`${this.urlPersonaEvento}/${id}`).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

    createPersonaEvento(personaEvento: EventoPersona) : Observable<any>{
      return this.http.post<any>(this.urlPersonaEvento+ '/', personaEvento).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

}

