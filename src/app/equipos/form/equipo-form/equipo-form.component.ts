import { Component } from '@angular/core';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../equipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html'
})
export class EquipoFormComponent {

  titulo: string = 'Registro de equipos.'
  public equipo:Equipo = new Equipo();

  constructor(private equipoService: EquipoService,
    private router: Router,
    private activate: ActivatedRoute){}


    ngOnInit(): void {
      this.cargarEquipo();
      
    }

    cargarEquipo():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.equipoService.getEquipo(id).subscribe(
            (equipo) => this.equipo = equipo)
          }
      })
    }

    public create(): void{
      this.equipoService.create(this.equipo).subscribe(
        json =>{
          this.router.navigate(['/equipos'])
          Swal.fire('Nuevo Equipo', `Equipo  ${json.equipo.nombreEquipo} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.equipoService.updateEquipo(this.equipo)
      .subscribe(p =>{
        this.router.navigate(['/equipos'])
        Swal.fire('Equipo actualizado', `Equipo  ${p.equipo.nombreEquipo} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }


}
