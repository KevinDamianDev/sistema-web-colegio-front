import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Fecha } from './fecha';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  private url : string ='http://localhost:8080/fechas';
  private urlDuelosByFecha : string ='http://localhost:8080/fechas/duelos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getFechas(): Observable<Fecha[]> {
      return this.http.get<Fecha[]>(this.url + '/').pipe(
        map(r => r as Fecha[])
      );
    }
    create(fecha: Fecha) : Observable<any>{
      return this.http.post<any>(this.url+ '/', fecha, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getFecha(id): Observable<Fecha>{
      return this.http.get<Fecha>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/fechas']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateFecha(fecha: Fecha): Observable<any>{
      return this.http.put<any> (`${this.url}/${fecha.idFecha}`, fecha,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Fecha>{
      return this.http.delete<Fecha>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

            // DUELOS QUE TIENE UNA FECHA
    getDuelosByFecha(id): Observable<any>{
      return this.http.get<any>(`${this.urlDuelosByFecha}/${id}`).pipe(
        catchError(e=>{              
        return throwError(e);
         })
       )
   }
    
}
