import { Component, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  @Output() currentUser: User;
  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    public routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.decodeCurrentUser();
  }
}
