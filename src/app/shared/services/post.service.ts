import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, postPost } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.interface';
import { AppState } from '../store/post.reducer';
import { ApiService } from './api.service';
import { tap, mergeMap, take } from 'rxjs/operators';
import {
  addPost,
  deletePost,
  setPosts,
  updatePost,
} from '../store/post.action';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apiService: ApiService, private store: Store<AppState>) {}
  get() {
    return this.store.select('posts').pipe(
      mergeMap((res) => {
        if (res.length > 0) {
          return this.store.select('posts');
        } else {
          return this.apiService
            .posts()
            .get()
            .pipe(
              tap((posts) => {
                this.store.dispatch(setPosts({ posts: posts }));
              })
            );
        }
      })
    );
  }
  post(post: postPost) {
    return this.apiService
      .posts()
      .post(post)
      .pipe(
        take(1),
        tap((res) => {
          this.store.dispatch(addPost({ post: res }));
        })
      );
  }
  delete(post: Post) {
    return this.apiService
      .posts()
      .delete(post)
      .pipe(
        take(1),
        tap((res) => {
          this.store.dispatch(deletePost({ post: res }));
        })
      );
  }
  like(post: Post, user: User) {
    return this.apiService
      .posts()
      .like(post, user)
      .pipe(
        take(1),
        tap((res) => {
          this.store.dispatch(updatePost({ post: res }));
        })
      );
  }
  unLike(post: Post, user: User) {
    return this.apiService
      .posts()
      .unLike(post, user)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(updatePost({ post: res })))
      );
  }
  comment(post: Post, user: User, commentText: string) {
    return this.apiService
      .posts()
      .comment(post, user, commentText)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(updatePost({ post: res })))
      );
  }
  deleteComment(post: Post, comment: Comment) {
    return this.apiService
      .posts()
      .deleteComment(post, comment)
      .pipe(
        take(1),
        tap((res) => this.store.dispatch(updatePost({ post: res })))
      );
  }
  isLikePost(post: Post, user: User) {
    return this.getLikesIds(post).includes(user._id);
  }
  getLikesIds(post: Post) {
    return post.likes.map((user) => user._id);
  }
  showLikes(likes: User[]) {
    const arrayLength = likes.length;
    return arrayLength <= 0
      ? 'No likes yet'
      : arrayLength === 1
      ? `${likes[0].fullname} likes this`
      : `${likes[0].fullname} and ${likes.length - 1} others likes this`;
  }
}
