import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Grado } from './grado';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  //private url : string ='http://localhost:8080/ie/grado';
  private url: string = `${environment.apiUrl}/ie/grado`;
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getGrados(): Observable<Grado[]> {
      return this.http.get<Grado[]>(this.url + '/').pipe(
        map(r => r as Grado[])
      );
    }

    create(grado: Grado) : Observable<any>{
      return this.http.post<any>(this.url+ '/', grado, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getGrado(id): Observable<Grado>{
      return this.http.get<Grado>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/grados']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateGrado(grado: Grado): Observable<any>{
      return this.http.put<any> (`${this.url}/${grado.idGrado}`, grado,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Grado>{
      return this.http.delete<Grado>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

    getGradosPersonaPeriodo(idPersona: number, idPeriodo: number): Observable<Grado[]> {
      const params = new HttpParams()
        .set('idPersona', idPersona.toString())
        .set('idPeriodo', idPeriodo.toString());
    
      return this.http.get<Grado[]>(this.url + '/personas', { params });
    }
    
}
