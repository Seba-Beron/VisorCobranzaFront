import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(rut: string, password: string): Observable<string> {
    if (!rut || !password) return of('Datos invalidos')

    return this.http.post<any>('http://localhost:3000/api/usuarios/login', { rut, password }).pipe(
      map((response: any) => {// todo mapear segun interface?

        if (!response.token) return response.message

        localStorage.setItem('token', JSON.stringify(response.token));

        return 'Sesion iniciada';
      })
    );
  }

  getAuthToken(): Observable<boolean> {

    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    // todo comprobar si el token es valido

    return of(true);
  }
}
