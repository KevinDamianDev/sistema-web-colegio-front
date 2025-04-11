import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Curso } from './curso';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  //private url : string ='http://localhost:8080/ie/curso';
  private url: string = `${environment.apiUrl}/ie/curso`;


  constructor(private http: HttpClient,
    private router: Router) { }

    getCursos(): Observable<Curso[]> {
      return this.http.get<Curso[]>(this.url + '/').pipe(
        map(r => r as Curso[])
      );
    }
    create(curso: Curso) : Observable<any>{
      return this.http.post<any>(this.url+ '/', curso).pipe(
        catchError(e =>{
         // Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getCurso(id): Observable<Curso>{
      return this.http.get<Curso>(`${this.url}/${id}`).pipe(
        catchError(e =>{
         // this.router.navigate(['/fases']);
         // Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }


    updateCurso(curso: Curso): Observable<any>{
      return this.http.put<any> (`${this.url}/${curso.idCurso}`, curso).pipe(
        catchError(e =>{
         // Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Curso>{
      return this.http.delete<Curso>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          //Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

        getCursosPersonaPeriodoGrado(idPersona: number, idGrado: number, idPeriodo: number): Observable<Curso[]> {
          const params = new HttpParams()
            .set('idPersona', idPersona.toString())
            .set('idGrado', idGrado.toString())
            .set('idPeriodo', idPeriodo.toString());
        
          return this.http.get<Curso[]>(this.url + '/cursogrado', { params });
        }
    
}
