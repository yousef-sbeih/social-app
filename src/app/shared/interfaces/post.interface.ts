import { User } from './user.interface';
import { Comment } from './comment.interface';
export interface Post {
  _id: string;
  author: User;
  image: string;
  text: string;
  likes: User[];
  comments: Comment[];
}
export interface postPost {
  authorId: string;
  image: string;
  text: string;
}
