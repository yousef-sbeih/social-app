import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, postPost } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  USER_URL = 'https://social-platform-app.herokuapp.com/user';
  POSTS_URL = 'https://social-platform-app.herokuapp.com/post';
  constructor(private httpClient: HttpClient) {}
  users(id?: string) {
    return {
      get: (username: string) => {
        return this.httpClient.get<User>(`${this.USER_URL}/${username}`);
      },
      getAll: () => {
        return this.httpClient.get<User[]>(this.USER_URL);
      },
      follow: (following: User, follower: User) => {
        return this.httpClient.post<User>(
          `${this.USER_URL}/follow/${following.username}`,
          {
            username: follower.username,
          }
        );
      },
      unfollow: (following: User, follower: User) => {
        return this.httpClient.post<User>(
          `${this.USER_URL}/unfollow/${following.username}`,
          { username: follower.username }
        );
      },
    };
  }
  posts() {
    return {
      get: () => {
        return this.httpClient.get<Post[]>(this.POSTS_URL);
      },
      post: (post: postPost) => {
        return this.httpClient.post<Post>(this.POSTS_URL, post);
      },
      delete: (post: Post) => {
        return this.httpClient.delete<Post>(`${this.POSTS_URL}/${post._id}`);
      },
      like: (post: Post, user: User) => {
        return this.httpClient.post<Post>(
          `${this.POSTS_URL}/like/${post._id}`,
          { userId: user._id }
        );
      },
      unLike: (post: Post, user: User) => {
        return this.httpClient.post<Post>(
          `${this.POSTS_URL}/unlike/${post._id}`,
          { username: user.username }
        );
      },
      comment: (post: Post, user: User, commentText: string) => {
        return this.httpClient.post<Post>(
          `${this.POSTS_URL}/comment/${post._id}`,
          { userId: user._id, text: commentText }
        );
      },
      deleteComment: (post: Post, comment: Comment) => {
        return this.httpClient.post<Post>(
          `${this.POSTS_URL}/${post._id}/comment`,
          { commentId: comment._id }
        );
      },
    };
  }
}
