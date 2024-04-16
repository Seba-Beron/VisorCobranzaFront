import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard{
  constructor() { }

  // revisar  implements CanMatchFn, CanActivateFn  las otras estan deprecated
}
