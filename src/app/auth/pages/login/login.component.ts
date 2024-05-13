import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { HttpClient } from '@angular/common/http';

import colors from '../../../../colors.config.json';
import secrets from '../../../../secrets.config.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  colors = colors;

  public formLogin: FormGroup = this.fb.group({
    rut: ['', [ Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private http: HttpClient
  ) {}

  getToken() {
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
      this.http.post(secrets.api + "usuarios/login", this.formLogin.value).subscribe((response: any) => {
        if(response.token){
          localStorage.setItem('token', JSON.stringify(response.token));
        }
        else{
          console.log(response.message);
        }
      });
    }
    else{
      console.log('Datos invalidos');
    }
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.formLogin, field );
  }

  // devuelve el error que tiene el campo field
  getFieldError(field: string): string | null {

    if (!this.formLogin.controls[field]) return null;

    const errors = this.formLogin.controls[field].errors || {};

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
