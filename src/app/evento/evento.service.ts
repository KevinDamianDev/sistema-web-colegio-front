import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Evento } from './evento';
import Swal from 'sweetalert2';
import { EventoEquipo } from '../equipos/evento-equipo';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private urlEquipoEventoAgregar: string = 'http://localhost:8080/eventoEquipos';
  private url: string = 'http://localhost:8080/eventos';
  // private urlFaseEvento : string ='http://localhost:8080/eventos/fases';
  // private urlEquipoEvento : string ='http://localhost:8080/eventos/equipos';

  //private urlEventosByPersona : string ='http://localhost:8080/personas/evento';

  eventoEquipo2: EventoEquipo;

  //private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }



  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url + '/')
      .pipe(
        catchError(e => {
          //this.isNoAutorizado(e);
          return throwError(e);
        })
      )
  }




  create(evento: Evento): Observable<any> {
    return this.http.post<any>(this.url + '/', evento).pipe(
      catchError(e => {
        // Swal.fire('Error' ,e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }


  getEvento(id): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/eventos']);
        }

        /*this.router.navigate(['/eventos']);
        Swal.fire('Error', e.error.mensaje, 'error');*/
        return throwError(e);
      })
    )
  }


  getEventoAgregarFase(id): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${id}`).pipe(
      catchError(e => {
        //Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  updateEvento(evento: Evento): Observable<any> {
    return this.http.put<any>(`${this.url}/${evento.idEvento}`, evento)
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      )
  }

  delete(id: number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.url}/${id}`)
      .pipe(
        catchError(e => {
          // Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
  }

  // FASES QUE TIENE UN EVENTO

  getFasesEvento(id): Observable<any> {
    return this.http.get<any>(`${this.url}/fases/${id}`).pipe(
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  // EQUIPOS QUE TIENE UN EVENTO
  getEquipoEvento(id): Observable<any> {
    return this.http.get<any>(`${this.url}/equipos/${id}`).pipe(
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  // AGREGAR EQUIPOS A UN EVENTO
  crearEquiposByEventos(eventoE: EventoEquipo): Observable<any> {
    return this.http.post<any>(this.urlEquipoEventoAgregar + '/', eventoE).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  // ELIMINAR EQUIPOS ASIGNADO A UN EVENTO.

  eliminarEventoEquipo(eventoE: EventoEquipo): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: eventoE
    };
    //console.log(' options  ::::'+JSON.stringify(options, null, 2));
    return this.http.delete(this.urlEquipoEventoAgregar + '/', options);
  }

  // GOLES QUE TIENE UN EVENTO

  getGolesByEvento(id): Observable<any> {
    return this.http.get<any>(`${this.url}/goles/${id}`).pipe(
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }
}
