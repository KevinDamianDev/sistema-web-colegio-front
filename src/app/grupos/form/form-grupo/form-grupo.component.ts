import { Component } from '@angular/core';
import { Grupo } from '../../grupo';
import { Fase } from 'src/app/fases/fase';
import { GrupoService } from '../../grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/fases/fases.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html'
})
export class FormGrupoComponent {

  titulo: string = 'Registro de grupos'
  public grupo: Grupo = new Grupo();
  fases: Fase[];
  faseExiste: Fase;
  nombreFase: string;
  idFaseExiste: number;
  ngOnInit(): void {
    this.cargarGrupo();
    this.cargarFase();
    //this.faseService.getFases().subscribe(ca=>this.fases=ca);
  }

  constructor(private grupoService: GrupoService,
    private router: Router,
    private activate: ActivatedRoute,
    private faseService: FasesService){}

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

    public createGrupoByFase(): void{
      this.grupo.fase = this.faseExiste;
      this.grupoService.create(this.grupo).subscribe(
        json =>{
          this.router.navigate(['/detalle/eventoFecha/'+this.faseExiste.idFase ])
          Swal.fire('Nuevo Grupo', `Grupo  ${json.grupo.nombreGrupo} ha sido creado con éxito! `, 'success')
        } 
      )
    }

    cargarGrupo():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.grupoService.getGrupo(id).subscribe(
            (e) => this.grupo = e)
          }
      })
    }
    public create(): void{
      this.grupoService.create(this.grupo).subscribe(
        json =>{
          this.router.navigate(['/grupos'])
          Swal.fire('Nuevo Grupo', `Grupo  ${json.grupo.nombreGrupo} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.grupoService.updateGrupo(this.grupo)
      .subscribe(p =>{
        this.router.navigate(['/detalle/eventoFecha/'+this.faseExiste.idFase ])
        Swal.fire('Grupo actualizado', `Grupo  ${p.grupo.nombreGrupo} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }


   compararFase(o1:Fase, o2: Fase){
    if(o1===undefined && o2===undefined){
      return true;
    
    }
      return o1==null || o2==null?false: o1.idFase===o2.idFase;
  }

}
