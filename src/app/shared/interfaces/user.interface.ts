import { Post } from './post.interface';

export interface SignupUser {
  fullname: string;
  email: string;
  username: string;
  password: string;
  description: string;
  profilePicture: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  description: string;
  profilePicture: string;
  followers: User[];
  following: User[];
  posts: Post[];
}
export interface LoginRes {
  token: string;
}
