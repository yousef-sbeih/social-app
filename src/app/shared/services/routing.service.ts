import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private router: Router) {}
  directToSignup() {
    this.router.navigate(['signup']);
  }
  directToHomepage() {
    this.router.navigate(['']);
  }
  directToLogin() {
    this.router.navigate(['login']);
  }
  directToProfile(username: string) {
    this.router.navigate(['', username]);
  }
}
