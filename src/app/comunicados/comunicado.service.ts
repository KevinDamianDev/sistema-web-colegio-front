import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Comunicado } from './comunicado';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private url : string =`${environment.apiUrl}/ie/comunicado`;

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getComunicados(): Observable<Comunicado[]> {
      return this.http.get<Comunicado[]>(this.url + '/').pipe(
        map(r => r as Comunicado[])
      );
    }



    create(comunicado: Comunicado) : Observable<any>{
      return this.http.post<any>(this.url+ '/', comunicado, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getComunicado(id): Observable<Comunicado>{
      return this.http.get<Comunicado>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/comunicados']);
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateComunicado(comunicado: Comunicado): Observable<any>{
      return this.http.put<any> (`${this.url}/${comunicado.idComunicado}`, comunicado,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Comunicado>{
      return this.http.delete<Comunicado>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

}
