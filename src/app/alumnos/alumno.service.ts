import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Persona } from '../personas/persona';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

    //private url : string ='http://localhost:8080/ie/personac';
    private url: string = `${environment.apiUrl}/ie/personac`;

    private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
      private router: Router) { }


          getAlumnos(): Observable<Persona[]> {
            return this.http.get<Persona[]>(this.url + '/alumnos').pipe(
              map(r => r as Persona[])
            );
          }
}
  