import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoGrupoService {
 

  private urlEquipoGrupoByGrupo : string ='http://localhost:8080/equipogrupos/grupos';  

  constructor(private http: HttpClient) { }
  
        // MUESTRA LOS EQUIPOS_GRUPOS DE UN GRUPO
        getEquiposGruposByGrupo(id): Observable<any>{
          return this.http.get<any>(`${this.urlEquipoGrupoByGrupo}/${id}`).pipe(
            catchError(e =>{
              return throwError(e); 
            } )
          )
        }


}
