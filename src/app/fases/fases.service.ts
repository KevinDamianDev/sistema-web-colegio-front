import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Fase } from './fase';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  private url : string ='http://localhost:8080/fases';
  private urlFechasFase: string = 'http://localhost:8080/fases/fechas';
  private urlGruposFase: string = 'http://localhost:8080/fases/grupos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getFases(): Observable<Fase[]> {
      return this.http.get<Fase[]>(this.url + '/').pipe(
        map(r => r as Fase[])
      );
    }
    create(fase: Fase) : Observable<any>{
      return this.http.post<any>(this.url+ '/', fase, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getFase(id): Observable<Fase>{
      return this.http.get<Fase>(`${this.url}/${id}`).pipe(
        catchError(e =>{
         // this.router.navigate(['/fases']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateFase(fase: Fase): Observable<any>{
      return this.http.put<any> (`${this.url}/${fase.idFase}`, fase,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Fase>{
      return this.http.delete<Fase>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

        // FECHAS QUE TIENE UNA FASE

        getFechasFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlFechasFase}/${id}`).pipe(
            catchError(e=>{
                console.error("error service-->" +e.error.mensaje);
              return throwError(e);
            })
          )
        }

        getGruposFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlGruposFase}/${id}`).pipe(
            catchError(e=>{
                console.error("error service-->" +e.error.mensaje);
              return throwError(e);
            })
          )
        }

    
}
