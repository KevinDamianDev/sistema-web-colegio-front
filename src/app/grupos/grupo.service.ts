import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from './grupo';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url : string ='http://localhost:8080/grupos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getGrupos(): Observable<Grupo[]> {
      return this.http.get<Grupo[]>(this.url + '/').pipe(
        map(r => r as Grupo[])
      );
    }
    create(grupo: Grupo) : Observable<any>{
      return this.http.post<any>(this.url+ '/', grupo, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getGrupo(id): Observable<Grupo>{
      return this.http.get<Grupo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/grupos']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateGrupo(grupo: Grupo): Observable<any>{
      return this.http.put<any> (`${this.url}/${grupo.idGrupo}`, grupo,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Grupo>{
      return this.http.delete<Grupo>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
}
