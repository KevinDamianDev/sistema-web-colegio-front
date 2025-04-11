import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Docente } from './docente';
import { Persona } from '../personas/persona';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  //private url : string ='http://localhost:8080/ie/docentes';
  //private url2 : string ='http://localhost:8080/ie/personac';
  
  private url: string = `${environment.apiUrl}/ie/docentes`;
  private url2: string = `${environment.apiUrl}/ie/personac`;


  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getDocentes(): Observable<Persona[]> {
      return this.http.get<Persona[]>(this.url2 + '/docentes').pipe(
        map(r => r as Persona[])
      );
    }



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
    }


}
