import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Categoria } from './categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url : string ='http://localhost:8080/categorias';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getCategorias(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.url + '/').pipe(
        map(r => r as Categoria[])
      );
    }
    create(categoria: Categoria) : Observable<any>{
      return this.http.post<any>(this.url+ '/', categoria, {headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


    getCategoria(id): Observable<Categoria>{
      return this.http.get<Categoria>(`${this.url}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/categorias']);
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }

    updateCategoria(categoria: Categoria): Observable<any>{
      return this.http.put<any> (`${this.url}/${categoria.idCategoria}`, categoria,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }
    
    delete(id:number): Observable<Categoria>{
      return this.http.delete<Categoria>(`${this.url}/${id}`,{headers : this.httpHeaders}).pipe(
        catchError(e =>{
          Swal.fire('Error',e.error.mensaje, 'error');
          return throwError(e);
        } )
      )
    }


}
