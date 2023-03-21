import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ApiService } from './api.service';
import { tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/user.reducer';
import { setUser, updateUser } from '../store/user.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private store: Store<AppState>) {}

  getUser(username: string) {
    return this.apiService
      .users()
      .get(username)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(setUser({ user: res })))
      );
  }

  follow(following: User, follower: User) {
    return this.apiService
      .users()
      .follow(following, follower)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(setUser({ user: res })))
      );
  }
  unfollow(following: User, follower: User) {
    return this.apiService
      .users()
      .unfollow(following, follower)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(setUser({ user: res })))
      );
  }
  isFollowing(follwoing: User, follower: User) {
    return this.getFollowersIds(follwoing).includes(follower._id);
  }
  getFollowersIds(user: User): string[] {
    return user.followers.map((user) => user._id);
  }
  //   getRandomUsers(users: User[]): User[] {
  //     let randomNumbers = [];
  //     while (randomNumbers.length < 3) {
  //       const random = Math.floor(Math.random() * users.length);
  //       randomNumbers.indexOf(random) === -1 ? randomNumbers.push(random) : null;
  //     }
  //     return users[randomNumbers];
  //   }
}
