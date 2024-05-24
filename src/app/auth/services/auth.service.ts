import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(rut: string, password: string): Observable<boolean> {
    if (!rut || !password) return of(false)

    return this.http.post<any>(`${AppConfig.apiUrl}/usuarios/login`, { rut, password }).pipe(
      map((response: any) => {// todo mapear segun interface?

        if (!response.token) return false

        localStorage.setItem('token', JSON.stringify(response.token))

        return true;
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
