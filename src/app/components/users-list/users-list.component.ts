import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  constructor(
    public routingService: RoutingService,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) {}

  ngOnInit(): void {}
}
