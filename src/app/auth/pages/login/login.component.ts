import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { HttpClient } from '@angular/common/http';

import colors from '../../../../colors.config.json';
import secrets from '../../../../secrets.config.json';

import { JwtModule } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  colors = colors;
  responseData: any;

  public myForm: FormGroup = this.fb.group({
    rut: ['', [ Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private http: HttpClient
  ) {}

  getToken() {
    // Realiza la solicitud GET
    this.http.get(secrets.api + "usuarios/login").subscribe((data) => {
      this.responseData = data;
      console.log('Respuesta de la solicitud GET:', this.responseData);
    });
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    try{
      this.http.get(secrets.api).subscribe((data) => {
        this.responseData = data;
        console.log('Respuesta de la solicitud GET:', this.responseData);
        localStorage.setItem('access_token', JSON.stringify(this.responseData.access_token));
      });
    }
    catch (e){
      console.log(e)
    }
  }

  // devuelve el error que tiene el campo field
  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return null;
  }
}
