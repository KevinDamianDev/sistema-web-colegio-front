import { Component, Input } from '@angular/core';
import { Equipo } from '../equipo';
import { EquipoService } from '../equipo.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  @Input() equipo: Equipo;
  titulo: string = "Detalle del equipo."

  constructor(private equipoService: EquipoService,
    private activate: ActivatedRoute,
    public modalService: ModalService){}
    public fotoS: File;

    ngOnInit(): void {
      /*this.activate.paramMap.subscribe(p =>{
        let id: number = +p.get('id');
        if(id){
          this.equipoService.getEquipo(id).subscribe(c =>{
            this.equipo = c;
          });
        }
      })*/
      
    }
    cerrarModal(){
      this.modalService.cerrarModal();
      this.fotoS=null;
    }

    seleccionarFoto(event){
      this.fotoS = event.target.files[0];
      console.log(this.fotoS);
        if(this.fotoS.type.indexOf('image')<0 ){
          //this.fotoS = null;
          Swal.fire('Error!','El archivo debe ser de tipo imagen.','error');
          this.fotoS = null;
      }
    }

    subirFoto(){
      console.log(" subirFoto" +this.fotoS);
      if(!this.fotoS){
        Swal.fire('Error!','Debe seleccionar una foto.','error');
      }else{
      this.equipoService.subirFoto(this.fotoS, this.equipo.idEquipo)
      .subscribe(equipo =>{
        this.equipo = equipo;
        this.modalService._notifica.emit(this.equipo);
        Swal.fire('Subido exitosa.!','La foto se ha subido correctamente.','success')
        this.fotoS = null;
      });
    }

    }

}
