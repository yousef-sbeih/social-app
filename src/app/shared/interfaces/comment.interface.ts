import { User } from './user.interface';

export interface Comment {
  _id: string;
  author: User;
  text: string;
}
