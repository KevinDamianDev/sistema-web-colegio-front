import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = 'http://localhost:8080/report';


  constructor(private http: HttpClient) { }

  descargarReporte(categoria: number, tipo: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', tipo === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    return this.http.get(`${this.baseUrl+ '/eventos/download'}?categoria=${categoria}&tipo=${tipo}`, { headers: headers, responseType: 'blob' });
  }
}
