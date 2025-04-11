import { Component } from '@angular/core';
import { Periodo } from '../periodo';
import { PeriodoService } from '../periodo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/personas/auth.service';
@Component({
  selector: 'app-form-periodo',
  templateUrl: './form-periodo.component.html'
})
export class FormPeriodoComponent {

  titulo: string = 'Registro de periodos'
    public periodo: Periodo = new Periodo();
  
    ngOnInit(): void {
      this.cargarPeriodo();
    }
  
    constructor(private periodoService: PeriodoService,
      private router: Router,
      private activate: ActivatedRoute,  public auth: AuthService) { }
  
  
  
  /*  cargarPeriodo(): void {
      this.activate.params.subscribe(params => {
        var id = params['id']
        console.log(' ID ->' + id);
        if (id) {
          this.periodoService.getPeriodo(id).subscribe(
            (e) => this.periodo = e)
        }
      })
    }*/
      cargarPeriodo(): void {
        this.activate.params.subscribe(params => {
          var id = params['id'];
          console.log('ID ->', id); // Muestra el ID obtenido de la URL
          
          if (id) {
            this.periodoService.getPeriodo(id).subscribe(
              (e) => {
                console.log('this.PERIODO 2 ::::', e); // Muestra los datos obtenidos del servicio
                this.periodo = e;
              },
              error => console.error('Error al obtener el periodo', error) // Captura errores
            );
          }
        });
      }
      



    public create(): void {
      console.log(' this.PERIODO ::::'+JSON.stringify(this.periodo, null, 2));
      this.periodoService.create(this.periodo).subscribe(
        json => {
          Swal.fire('Nuevo Periodo', `Periodo  ${json.periodo.nombrePeriodo} ha sido creado con éxito! `, 'success')
          this.router.navigate(['/periodos'])
        }
      )
    }
  
  
    update(): void {
      this.periodoService.updatePeriodo(this.periodo)
        .subscribe(p => {
          this.router.navigate(['/periodos'])
          Swal.fire('Periodo actualizado', `Periodo  ${p.periodo.nombrePeriodo} ha sido actualizado con éxito! `, 'success')
  
        }
        )
    }
  

}
