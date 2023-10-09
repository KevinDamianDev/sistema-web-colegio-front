import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from './equipo';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private url : string ='http://localhost:8080/equipos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getEquipos(): Observable<Equipo[]> {
      return this.http.get<Equipo[]>(this.url + '/').pipe(
        map(r => r as Equipo[])
      );
    }
    create(equipo: Equipo) : Observable<any>{
      return this.http.post<any>(this.url+ '/', equipo, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getEquipo(id): Observable<Equipo>{
      return this.http.get<Equipo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/equipos']);
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateEquipo(equipo: Equipo): Observable<any>{
      return this.http.put<any> (`${this.url}/${equipo.idEquipo}`, equipo,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Equipo>{
      return this.http.delete<Equipo>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
subirFoto(archivo: File, id){
  let formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("id", id);

  return this.http.post(`${this.url}/upload`, formData).pipe(
    map((response: any) => response.equipo as Equipo),
    catchError(e =>{
      Swal.fire('Error' , e.error.mensaje, 'error');
      return throwError(e);
    })
  )

}

}
