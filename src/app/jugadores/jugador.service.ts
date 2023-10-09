import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Jugador } from './jugador';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private url : string ='http://localhost:8080/jugadores';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getJugadores(): Observable<Jugador[]> {
      return this.http.get<Jugador[]>(this.url + '/').pipe(
        map(r => r as Jugador[])
      );
    }
    create(jugador: Jugador) : Observable<any>{
      return this.http.post<any>(this.url+ '/', jugador, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getJugador(id): Observable<Jugador>{
      return this.http.get<Jugador>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/jugadores']);
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateJugador(jugador: Jugador): Observable<any>{
      return this.http.put<any> (`${this.url}/${jugador.idJugador}`, jugador,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Jugador>{
      return this.http.delete<Jugador>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
subirFoto(archivo: File, id){
  let formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("id", id);

  return this.http.post(`${this.url}/upload`, formData).pipe(
    map((response: any) => response.jugador as Jugador),
    catchError(e =>{
      Swal.fire('Error' , e.error.mensaje, 'error');
      return throwError(e);
    })
  )

}

}
