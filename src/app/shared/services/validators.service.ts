import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl, AsyncValidator } from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidatorsService{

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public rutPattern: string = "^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$";

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true }); // esto sera el error del campo / control
        return { notEqual: true } // esto sera el error de todo el formulario
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }
}
