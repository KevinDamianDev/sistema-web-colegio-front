import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from './equipo';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { EventoEquipo } from './evento-equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private url : string ='http://localhost:8080/equipos';
  private urlEquipoEvento : string ='http://localhost:8080/eventoequipos/'; 

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
    // CREAR EQUIPOS DE UN EVENTO
    createEquipoEvento(eventoEquipo: EventoEquipo) : Observable<any>{

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  const requestBody = JSON.stringify({ idEvento, idEquipo }); // Convierte a una cadena JSON
     //const requestBody2 = {
    //  'idEvento': idEvento,
    //  'idEquipo': idEquipo,
   // };

     console.log('idEvento 1-->' + eventoEquipo.evento.idEvento)
      console.log('idEquipo 1-->' + eventoEquipo.equipo.idEquipo)
      eventoEquipo.equipo.idEquipo = 5;
      eventoEquipo.evento.idEvento = 1;
      //console.log('requestBody-->' + requestBody2.idEquipo + requestBody2.idEvento)
     // console.log('this.urlEquipoEvento-->' +this.urlEquipoEvento)
      return this.http.post<any>(this.urlEquipoEvento, eventoEquipo, { headers:   this.httpHeaders })
    /*  .pipe(
       // map((response: any) => response.equipo as Equipo),
        catchError(e =>{
          //Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )*/
    }


    getEquipo(id): Observable<Equipo>{
      return this.http.get<Equipo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
         // this.router.navigate(['/equipos']);
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
