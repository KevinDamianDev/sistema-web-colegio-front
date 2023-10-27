import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Duelo } from './duelo';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Goles } from '../duelo-fecha/detalle/goles';

@Injectable({
  providedIn: 'root'
})
export class DueloService {

  private url : string ='http://localhost:8080/duelos';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})
  private urlDuelosByFase : string ='http://localhost:8080/duelos/fases';
  private urlDuelo : string ='http://localhost:8080/duelos'; 
  private urlEquipoGrupoDuelo : string ='http://localhost:8080/equipogrupoduelos'; 

  private urlGol : string ='http://localhost:8080/goles'; 

  constructor(private http: HttpClient,
    private router: Router) { }

    getDuelos(): Observable<Duelo[]> {
      return this.http.get<Duelo[]>(this.url + '/').pipe(
        map(r => r as Duelo[])
      );
    }
    create(duelo: Duelo) : Observable<any>{
      return this.http.post<any>(this.url+ '/', duelo, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getDuelo(id): Observable<Duelo>{
      return this.http.get<Duelo>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          //this.router.navigate(['/duelos']);
          Swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateDuelo(duelo: Duelo): Observable<any>{
      console.log('entra aqui service')
      console.log('duelo:: --> ', JSON.stringify(duelo, null, 2));
      return this.http.put<any> (`${this.url}/${duelo.idDuelo}`, duelo).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } ),
        map(response => {
          console.log('Respuesta exitosa:', response); // Esto muestra la respuesta exitosa
          return response;
        })
      );
    }
    
    delete(id:number): Observable<Duelo>{
      return this.http.delete<Duelo>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error.' , e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


        // DUELOS QUE TIENE UNA FASE
        getDuelosByFase(id): Observable<any>{
          return this.http.get<any>(`${this.urlDuelosByFase}/${id}`).pipe(
            catchError(e =>{
              //Swal.fire('Error.' , e.error.mensaje, 'error');
              return throwError(e); 
            } )
          )
        }


     // MUESTRA LOS GOLES DE UN DUELO
       getGolesByDuelo(id): Observable<any>{
        //console.log('entra aca service---')
        return this.http.get<any>(`${this.urlDuelo}/goles/${id}`).pipe(
          catchError(e =>{
            return throwError(e); 
          })
        )
      }

      
   // MUESTRA LOS EQUIPOS_GRUPOS_DUELOS DE UN DUELO
   getEquiposGruposDuelosByDuelo(id): Observable<any>{
    return this.http.get<any>(`${this.urlEquipoGrupoDuelo}/duelos/${id}`).pipe(
      catchError(e =>{
        return throwError(e); 
      })
    )
  }



  deleteGol(id:number): Observable<Goles>{
    return this.http.delete<Goles>(`${this.urlGol}/${id}`).pipe(
      catchError(e =>{
        Swal.fire('Error.' , e.error.mensaje, 'error');
        return throwError(e);
      } )
    )
  }

  getGol(id): Observable<Goles>{
    return this.http.get<Goles>(`${this.urlGol}/${id}`).pipe(
      catchError(e =>{
        //this.router.navigate(['/duelos']);
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

   createGol(gol: Goles) : Observable<any>{
      return this.http.post<any>(this.urlGol+ '/', gol).pipe(
        catchError(e =>{
          Swal.fire('Error' ,e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }

    updateGol(gol: Goles): Observable<any>{
      //console.log('entra aqui service')
      //console.log('duelo:: --> ', JSON.stringify(duelo, null, 2));
      return this.http.put<any> (`${this.urlGol}/${gol.idGol}`, gol).pipe(
        catchError(e =>{
          Swal.fire('Error.',e.error.mensaje, 'error');
          return throwError(e);
        } ),
        map(response => {
          console.log('Respuesta exitosa:', response); // Esto muestra la respuesta exitosa
          return response;
        })
      );
    }
}
