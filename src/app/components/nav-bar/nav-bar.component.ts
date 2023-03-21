import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() currentUser: User;
  constructor(
    private authService: AuthService,
    public routingService: RoutingService
  ) {}

  ngOnInit(): void {}
  onLogout() {
    this.authService.logout();
    this.routingService.directToLogin();
  }
  onLogoClick() {
    this.routingService.directToHomepage();
  }
  editProfileRoute() {
    this.routingService.directToEditProfile(this.currentUser.username);
  }
}
