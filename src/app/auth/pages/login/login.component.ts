import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';


import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin: FormGroup = this.fb.group({
    rut: ['23456789', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    password: ['asdf1234', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private router:Router
  ) { }

  login() {
    this.authService.getToken(this.formLogin.get('rut')?.value, this.formLogin.get('password')?.value)
      .subscribe(res => {
        if (!res) this.formLogin.markAllAsTouched()
        this.router.navigate(['lobby']);
      });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.formLogin, field)
  }

  getFieldError(field: string): string | null {

    if (!this.formLogin.controls[field]) return null;

    const errors = this.formLogin.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;

        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres.`;
      }
    }

    return null;
  }
}
