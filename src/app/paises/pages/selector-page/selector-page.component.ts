import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServicesService } from '../../services/paises-services.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Lenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServicesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => this.miFormulario.get('pais')?.reset('')),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
      });

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe((pais) => {
        if (pais === null) {
          console.log('ooops');
        } else {
          this.fronteras = pais[0]?.borders;
        }
      });
  }
  guardar() {
    console.log(this.miFormulario);
  }
}
