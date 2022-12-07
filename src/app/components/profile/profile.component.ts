import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppState } from 'src/app/shared/store/user.reducer';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  currentUser: User;
  isFollowing: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.decodeCurrentUser();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.userService.getUser(param.get('username')!).subscribe(
        (res) => {
          this.isFollowing = this.userService.isFollowing(
            res,
            this.currentUser
          );
        },
        () => {},
        () => {
          this.store.select('user').subscribe((res) => {
            this.userProfile = res;
            this.userProfile = this.userProfile.user;
          });
        }
      );
    });
  }
  onFollowAction() {
    this.isFollowing ? this.unfollow() : this.follow();
    this.isFollowing = !this.isFollowing;
  }
  follow() {
    this.userService.follow(this.userProfile, this.currentUser).subscribe();
  }
  unfollow() {
    this.userService.unfollow(this.userProfile, this.currentUser).subscribe();
  }
  onListDialog(users: User[]) {
    this.matDialog.open(UsersListComponent, {
      width: '15%',
      height: '30%',
      data: users,
    });
  }
  onPostDialog(post: Post) {
    this.matDialog.open(PostDialogComponent, {
      width: '60%',
      height: '70%',
      data: { post: post, currentUser: this.currentUser },
    });
  }
}
