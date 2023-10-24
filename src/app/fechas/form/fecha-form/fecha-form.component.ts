import { Component } from '@angular/core';
import { Fecha } from '../../fecha';
import { Fase } from 'src/app/fases/fase';
import { FechasService } from '../../fechas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/fases/fases.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-fecha-form',
  templateUrl: './fecha-form.component.html'
})
export class FechaFormComponent {

  titulo: string = 'Registro de fechas'
  public fecha: Fecha = new Fecha();
  fases: Fase[];
  faseExiste: Fase;
  nombreFase: string;
  idFaseExiste: number;
  //nombreEvento: string;

  //fechaExistente: 

  constructor(private fechaService: FechasService,
    private router: Router,
    private activate: ActivatedRoute,
    private faseService: FasesService){}

    ngOnInit(): void {
      this.cargarFecha();
      this.cargarFase();

      this.faseService.getFases().subscribe(ca=>this.fases=ca);
    }
    cargarFase():void{
      this.activate.params.subscribe(params =>{
        var idFase =  params['idFase']
        //const n   = params['nE'];
        console.log('idFase:' +idFase)
        if(idFase){
          this.faseService.getFase(idFase).subscribe(
            (fase) => {
              this.faseExiste = fase;
              this.nombreFase= this.faseExiste.nombreFase;
              this.idFaseExiste = idFase;
            } )
          }
          //this.nombreEvento = n;
         
      })
    }

    public createFechaByFase(): void{
      this.fecha.fase = this.faseExiste;
      this.fechaService.create(this.fecha).subscribe(
        json =>{
          this.router.navigate(['/detalle/eventoFecha/'+this.faseExiste.idFase ])
          Swal.fire('Nueva Fecha', `Fecha  ${json.fecha.nombreFecha} ha sido creada con éxito! `, 'success')
        } 
      )
    }
  



    cargarFecha():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        console.log('fecha:::' )
        if(id){
          this.fechaService.getFecha(id).subscribe(
            (e) => this.fecha = e)
          }
      })
    }

    public create(): void{
      this.fechaService.create(this.fecha).subscribe(
        json =>{
          this.router.navigate(['/fechas'])
          Swal.fire('Nueva Fecha', `Fecha  ${json.fecha.nombreFecha} ha sido creada con éxito! `, 'success')
        } 
      )
    }
  
    
  
    update(): void{
      this.fechaService.updateFecha(this.fecha)
      .subscribe(p =>{
       this.router.navigate(['/detalle/eventoFecha/'+this.faseExiste.idFase ])
        Swal.fire('Fecha actualizada', `Fecha  ${p.fecha.nombreFecha} ha sido actualizada con éxito! `, 'success')
  
      }
   ) }


   compararFase(o1:Fase, o2: Fase){
    if(o1===undefined && o2===undefined){
      return true;
    
    }
      return o1==null || o2==null?false: o1.idFase===o2.idFase;
  }


}
