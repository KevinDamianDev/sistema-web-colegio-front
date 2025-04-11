import { Component } from '@angular/core';
import { Grado } from '../../grado';
import { GradoService } from '../../grado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/personas/auth.service';
@Component({
  selector: 'app-form-grado',
  templateUrl: './form-grado.component.html'
})
export class FormGradoComponent {

  titulo: string = 'Registro de grados'
  public grado: Grado = new Grado();

  ngOnInit(): void {
    this.cargarGrado();
  }

  constructor(private gradoService: GradoService,
    private router: Router,
    private activate: ActivatedRoute,  public auth: AuthService) { }

 

  cargarGrado(): void {
    this.activate.params.subscribe(params => {
      var id = params['id']
      if (id) {
        this.gradoService.getGrado(id).subscribe(
          (e) => this.grado = e)
      }
    })
  }
  public create(): void {
    this.gradoService.create(this.grado).subscribe(
      json => {
        Swal.fire('Nuevo Grado', `Grado  ${json.grado.nombreGrado} ha sido creado con éxito! `, 'success')
        this.router.navigate(['/grados'])

      }
    )
  }


  update(): void {
    this.gradoService.updateGrado(this.grado)
      .subscribe(p => {
        this.router.navigate(['/grados'])
        Swal.fire('Grado actualizado', `Grado  ${p.grado.nombreGrado} ha sido actualizado con éxito! `, 'success')

      }
      )
  }


}
