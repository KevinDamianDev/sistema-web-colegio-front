import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { EquipoEstadistica } from '../equipo-estadistica';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ModalEstadisticaService {

  private urlEquipoEstadistica : string ='http://localhost:8080/equipoEstadisticas/equipos'; 

  private urEstadistica : string ='http://localhost:8080/equipoEstadisticas'; 
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,  private router: Router) { }

      // ESTADISTICAS QUE TIENE UN EQUIPO
      getEstadisticaByEquipo(id): Observable<any>{
        console.log('Estadisticas_ idEquipo::' +id )
        return this.http.get<any>(`${this.urlEquipoEstadistica}/${id}`).pipe(
          catchError(e =>{
            return throwError(e); 
          } )
        )
      }

      getEquipoEstadistica(id): Observable<EquipoEstadistica>{
        return this.http.get<EquipoEstadistica>(`${this.urEstadistica}/${id}`).pipe(
          catchError(e =>{          
            Swal.fire('Error',e.error.mensaje, 'error');;
            return throwError(e);
          })
        )
      }
    
      updateEquipoEstadistica(estadistica: EquipoEstadistica): Observable<any>{
        return this.http.put<any> (`${this.urEstadistica}/${estadistica.idEquipoEstadistica}`, estadistica,{headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }

}
