import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Periodo } from './periodo';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

 //private url : string ='http://localhost:8080/ie/periodo';
 private url: string = `${environment.apiUrl}/ie/periodo`;


  constructor(private http: HttpClient,
    private router: Router) { }

    getPeriodos(): Observable<Periodo[]> {
      return this.http.get<Periodo[]>(this.url + '/').pipe(
        map(r => r as Periodo[])
      );
    }
    create(curso: Periodo) : Observable<any>{
      return this.http.post<any>(this.url+ '/', curso).pipe(
        catchError(e =>{
         // Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

    public periodo: Periodo = new Periodo();
     
    getPeriodo(id): Observable<Periodo> {
      return this.http.get<Periodo>(`${this.url}/${id}`).pipe(
        tap(data => console.log(' this.PERIODO :::: ', data)), // Aquí se muestra la respuesta antes de cualquier otra operación
        catchError(e => {
          console.error('Error al obtener el periodo:', e);
          return throwError(e);
        })
      );
    }
    


    updatePeriodo(periodo: Periodo): Observable<any>{
      return this.http.put<any> (`${this.url}/${periodo.idPeriodo}`, periodo).pipe(
        catchError(e =>{
         // Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Periodo>{
      return this.http.delete<Periodo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          //Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

}
 