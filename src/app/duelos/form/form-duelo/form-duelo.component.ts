import { Component } from '@angular/core';
import { Duelo } from '../../duelo';
import { DueloService } from '../../duelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-duelo',
  templateUrl: './form-duelo.component.html'
})
export class FormDueloComponent {
  
 /* titulo: string = 'Registro de duelos.'
  public duelo: Duelo = new Duelo();
  //fechas: Fecha[];
  fecha: Fecha;


  constructor(private dueloService: DueloService,private location: Location,
    private activate: ActivatedRoute,
    private fechaService: FechasService){}

    ngOnInit(): void {
      this.cargarDuelo();
      this.cargarFecha();
    }

    cargarDuelo():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.dueloService.getDuelo(id).subscribe(
            (e) => this.duelo = e)
          }
      })
    }

    cargarFecha():void{
      this.activate.params.subscribe(params =>{
        var idFecha =  params['idFecha']
        if(idFecha){
          this.fechaService.getFecha(idFecha).subscribe(
            (e) => this.fecha = e)
          }
      })
    }


    public create(): void{
      this.duelo.fecha = this.fecha;
      this.dueloService.create(this.duelo).subscribe(
        json =>{
          this.cancelar();
          //this.router.navigate(['/duelos'])
          Swal.fire('Nuevo Duelo', `Duelo  ${json.duelo.nombreDuelo} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.dueloService.updateDuelo(this.duelo)
      .subscribe(p =>{
        this.cancelar();
        //this.router.navigate(['/duelos'])
        Swal.fire('Duelo actualizado', `Duelo  ${p.duelo.nombreDuelo} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }

   cancelar() {
    this.location.back(); // Esto navegará hacia atrás en la historia de navegación
  }

  /* compararFecha(o1:Fecha, o2: Fecha){
    if(o1===undefined && o2===undefined){
      return true;
    
    }
      return o1==null || o2==null?false: o1.idFecha===o2.idFecha;
  }*/
}
