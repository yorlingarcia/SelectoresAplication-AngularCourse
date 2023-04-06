import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServicesService } from '../../services/paises-services.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  });
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServicesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
      console.log(region);
      this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
        console.log(paises);
        this.paises = paises;
      });
    });
  }
  guardar() {
    console.log(this.miFormulario);
  }
}
