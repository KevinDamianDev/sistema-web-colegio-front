import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Jugador } from './jugador';
import Swal from 'sweetalert2';
import { EquipoJugador } from './equipo-jugador';
@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private url : string ='http://localhost:8080/jugadores';
  private urlEquipoJugador : string ='http://localhost:8080/equipojugador';
  //private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getJugadores(): Observable<Jugador[]> {
      return this.http.get<Jugador[]>(this.url + '/').pipe(
        map(r => r as Jugador[])
      );
    }
    create(jugador: Jugador) : Observable<any>{
      return this.http.post<any>(this.url+ '/', jugador).pipe(
        catchError(e =>{
         // Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getJugador(id): Observable<Jugador>{
      return this.http.get<Jugador>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          //this.router.navigate(['/jugadores']);
          //Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateJugador(jugador: Jugador): Observable<any>{
      return this.http.put<any> (`${this.url}/${jugador.idJugador}`, jugador).pipe(
        catchError(e =>{
         // Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Jugador>{
      return this.http.delete<Jugador>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          //Swal.fire('Error.' , e.error.mensaje, 'error');
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
      //Swal.fire('Error' , e.error.mensaje, 'error');
      return throwError(e);
    })
  )

}

        // MUESTRA LOS EQUIPOS_JUGADORES DE UN EQUIPO
        getEquiposJugadoresByEquipo(id): Observable<any>{
          return this.http.get<any>(`${this.urlEquipoJugador}/equipos/${id}`).pipe(
            catchError(e =>{
              return throwError(e); 
            } )
          )
        }

        // CREA EQUIPO_JUGADOR
        createEquipoJugador(equipoJugador: EquipoJugador) : Observable<any>{
          //console.log('equipoJugador::: --> ', JSON.stringify(equipoJugador,     null, 2));
          return this.http.post<any>(this.urlEquipoJugador+ '/', equipoJugador).pipe(
            catchError(e =>{
              //Swal.fire('Error',e.error.mensaje, 'error');
              return throwError(e);
            } )
          )
        }

              // ELIMINA EQUIPOS DE GRUPOS
      deleteEquipoJugador(id:number): Observable<any>{
        return this.http.delete<any>(`${this.urlEquipoJugador}/${id}`).pipe(
          catchError(e =>{
           // Swal.fire('Error.' , e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }
}
