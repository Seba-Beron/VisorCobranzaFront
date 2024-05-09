import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtModule } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean>{

    if ( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');
    // comprobar si el token es valido
    
    return of(true);
  }
}
