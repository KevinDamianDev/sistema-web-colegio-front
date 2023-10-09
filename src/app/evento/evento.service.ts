import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Evento } from './evento';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private url : string ='http://localhost:8080/eventos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }


    getEventos(): Observable<Evento[]> {
      return this.http.get<Evento[]>(this.url + '/').pipe(
        map(r => r as Evento[])
      );
    }
    create(evento: Evento) : Observable<any>{
      return this.http.post<any>(this.url+ '/', evento, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getEvento(id): Observable<Evento>{
      return this.http.get<Evento>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/eventos']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateEvento(evento: Evento): Observable<any>{
      return this.http.put<any> (`${this.url}/${evento.idEvento}`, evento,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Evento>{
      return this.http.delete<Evento>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


}
