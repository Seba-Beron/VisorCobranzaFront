import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';


import colors from '../../../../colors.config.json';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService
  ) {}

  getToken(){
    console.log(this.formLogin.value) // todo
    this.authService.getToken(this.formLogin.get('rut')?.value, this.formLogin.get('password')?.value)
      .subscribe( res => console.log(res));
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
