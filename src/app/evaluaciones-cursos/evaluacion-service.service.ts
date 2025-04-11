import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Evaluacion } from './evaluacion';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionServiceService {

  //private url: string = 'http://localhost:8080/ie/evaluacion';
  private url: string = `${environment.apiUrl}/ie/evaluacion`;
  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient,
    private router: Router) { }

  getEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.url + '/').pipe(
      map(r => r as Evaluacion[])
    );
  }


  getEvaluacionesCursoPersonaPeriodoGrado(idPersona: number, idGrado: number, idPeriodo: number, idCurso: number): Observable<Evaluacion[]> {
    const params = new HttpParams()
      .set('idPersona', idPersona.toString())
      .set('idGrado', idGrado.toString())
      .set('idPeriodo', idPeriodo.toString())
      .set('idCurso', idCurso.toString());

    return this.http.get<Evaluacion[]>(this.url + '/evaluacioncurso', { params });
  }


  /*
      create(docente: Docente) : Observable<any>{
        return this.http.post<any>(this.url+ '/', docente, {headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }
  
  
      getDocente(id): Observable<Docente>{
        return this.http.get<Docente>(`${this.url}/${id}`).pipe(
          catchError(e =>{
            this.router.navigate(['/docentes']);
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          })
        )
      }
  
      updateDocente(docente: Docente): Observable<any>{
        return this.http.put<any> (`${this.url}/${docente.idDocente}`, docente,{headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }
      
      delete(id:number): Observable<Docente>{
        return this.http.delete<Docente>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
          catchError(e =>{
            Swal.fire('Error',e.error.mensaje, 'error');
            return throwError(e);
          } )
        )
      }*/


}
