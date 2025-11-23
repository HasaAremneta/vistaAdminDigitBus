import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface AdminLoginResponse {
  token: string;
  idUsuario: number;
  idPersonal: number;
  rol: string;
  permisos?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:5000'; // ajusta al URL de tu backend Flask
  private tokenKey = 'adminToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(nombreUsuario: string, password: string): Observable<AdminLoginResponse> {
    const body = { NombreUsuario: nombreUsuario, password };

    return this.http.post<AdminLoginResponse>(`${this.apiUrl}/admin/login`, body).pipe(
      tap((res) => {
        // Guarda el JWT y algún dato mínimo
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem('adminRol', res.rol);
        localStorage.setItem('adminIdUsuario', String(res.idUsuario));
        localStorage.setItem('adminIdPersonal', String(res.idPersonal));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('adminRol');
    localStorage.removeItem('adminIdUsuario');
    localStorage.removeItem('adminIdPersonal');
    this.router.navigate(['/admin/login']);
  }

  /** Verifica que haya token y que el rol sea ADMIN (según lo guardado o según el claim del JWT). */
  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const now = Math.floor(Date.now() / 1000);
      const notExpired = !payload.exp || payload.exp > now;
      const isAdminRole = payload.rol === 'ADMIN' || localStorage.getItem('adminRol') === 'ADMIN';

      return !!token && notExpired && isAdminRole;
    } catch {
      return false;
    }
  }
}
