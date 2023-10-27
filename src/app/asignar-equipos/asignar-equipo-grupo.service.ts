import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipoGrupo } from './equipo-grupo';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { EquipoGrupoDuelo } from './equipo-grupo-duelo';
@Injectable({
  providedIn: 'root'
})
export class AsignarEquipoGrupoService {

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  private urlEquipoGrupo : string ='http://localhost:8080/equipogrupos'; 
  private urlEquiposByGrupo : string ='http://localhost:8080/grupos/equipos'; 
  private urlEquipoGrupoByFase : string ='http://localhost:8080/equipogrupos/fases'; 
  //private urlEquipoGrupoDueloByFase : string ='http://localhost:8080/equipogrupoduelos/fases'; 
  private urlEquipoGrupoDuelo : string ='http://localhost:8080/equipogrupoduelos'; 



  constructor(private http: HttpClient) { }

  // AGREGAR EQUIPOS A GRUPOS 
      asignarEquiposAGrupos(equipoG: EquipoGrupo): Observable<any> {
        return this.http.post<any>(this.urlEquipoGrupo + '/', equipoG).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        );
      }
// ELIMINA EQUIPOS DE GRUPOS
      deleteEquipoByGrupo(id:number): Observable<any>{
        return this.http.delete<any>(`${this.urlEquipoGrupo}/${id}`,{headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error.' , e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }

      // ELIMINAR EQUIPO DE UN GRUPO
     /* eliminarEquiposByGrupos(equipoG: EquipoGrupo): Observable<any> {
        const options = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          }),
          body: equipoG
      };

      console.log(' options  ::::'+JSON.stringify(options, null, 2));
      return this.http.delete(this.urlEquipoGrupo+'/', options).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      );
      }*/


    // EQUIPOS QUE TIENE UN GRUPO
    getEquiposByGrupo(id): Observable<any>{
      console.log('id::' +id )
      return this.http.get<any>(`${this.urlEquiposByGrupo}/${id}`).pipe(
        catchError(e =>{
          return throwError(e); 
        } )
      )
    }


        // MUESTRA LOS EQUIPOS_GRUPOS DE UNA FASE
      getEquiposGruposByFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlEquipoGrupoByFase}/${id}`).pipe(
            catchError(e =>{
              return throwError(e); 
            } )
          )
        }

        // MUESTRA LOS EQUIPOS_GRUPOS_DUELOS DE UNA FASE
      getEquiposGruposDuelosByFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlEquipoGrupoDuelo}/fases/${id}`).pipe(
            catchError(e =>{
              return throwError(e); 
            } )
          )
      }


          // AGREGAR EQUIPOS_GRUPOS_DUELOS
      asignarEquiposGruposADuelos(equipoGD: EquipoGrupoDuelo): Observable<any> {
        return this.http.post<any>(this.urlEquipoGrupoDuelo + '/', equipoGD).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        );
      }

      // ELIMINA EQUIPOS DE GRUPOS
      deleteEquipoGrupoByDuelo(id:number): Observable<any>{
        return this.http.delete<any>(`${this.urlEquipoGrupoDuelo}/${id}`,{headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error.' , e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }



}
