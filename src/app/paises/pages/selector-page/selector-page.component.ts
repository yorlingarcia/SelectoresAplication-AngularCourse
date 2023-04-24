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
  cargando: boolean = false;
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Lenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServicesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });
    // cuando cambia el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo)),
        switchMap((pais) => {
          return this.paisesService.getPaisesPorCodigos(pais[0]?.borders!);
        })
      )

      .subscribe((paises) => {
        if (paises === null) {
          console.log('ooops');
        } else {
          // this.fronteras = paises[0]?.borders;
          this.fronteras = paises;
          this.cargando = false;
        }
      });
  }
  guardar() {
    console.log(this.miFormulario);
  }
}
