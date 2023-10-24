import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Duelo } from './duelo';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DueloService {

  private url : string ='http://localhost:8080/duelos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})
  private urlDuelosByFase : string ='http://localhost:8080/duelos/fases';

  constructor(private http: HttpClient,
    private router: Router) { }

    getDuelos(): Observable<Duelo[]> {
      return this.http.get<Duelo[]>(this.url + '/').pipe(
        map(r => r as Duelo[])
      );
    }
    create(duelo: Duelo) : Observable<any>{
      return this.http.post<any>(this.url+ '/', duelo, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getDuelo(id): Observable<Duelo>{
      return this.http.get<Duelo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/duelos']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateDuelo(duelo: Duelo): Observable<any>{
      return this.http.put<any> (`${this.url}/${duelo.idDuelo}`, duelo,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Duelo>{
      return this.http.delete<Duelo>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


        // DUELOS QUE TIENE UNA FASE
        getDuelosByFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlDuelosByFase}/${id}`).pipe(
            catchError(e =>{
              //Swal.fire('Error.' , e.error.mensaje, 'error');
              return throwError(e); 
            } )
          )
        }
}
