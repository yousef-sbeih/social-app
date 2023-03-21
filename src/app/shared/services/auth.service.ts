import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import {
  LoginRes,
  LoginUser,
  SignupUser,
  User,
} from '../interfaces/user.interface';
import { RoutingService } from './routing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_URL = 'http://localhost:3000/user';
  constructor(
    private httpClient: HttpClient,
    private routingService: RoutingService,
    private snackBar: MatSnackBar
  ) {}
  signup(user: SignupUser) {
    return this.httpClient.post(`${this.USER_URL}/register`, user).pipe(
      take(1),
      tap(
        () => {
          this.routingService.directToLogin();
        },
        (res) => {
          this.snackBar.open(res.error.message, 'close', { duration: 3000 });
        }
      )
    );
  }
  login(user: LoginUser) {
    return this.httpClient.post<LoginRes>(`${this.USER_URL}/login`, user).pipe(
      take(1),
      tap((res) => {
        this.storeToken(res);
        this.routingService.directToHomepage();
      })
    );
  }
  storeToken(loginRes: LoginRes) {
    const { token } = loginRes;
    window.localStorage.setItem('token', token);
  }
  decodeCurrentUser(): User {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return helper.decodeToken(token!).user;
  }
  isLoggedIn() {
    const token = window.localStorage.getItem('token');
    return token ? true : false;
  }

  logout() {
    window.localStorage.removeItem('token');
  }
}
