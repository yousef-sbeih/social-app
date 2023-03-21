import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  currentUser: User;

  constructor(
    private authService: AuthService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.decodeCurrentUser();
    // check if the current user username = route params username ; else redirect to homepage
  }
}
