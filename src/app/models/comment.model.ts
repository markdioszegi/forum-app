import { User } from './user.model';

export interface Comment {
  id: number;
  body: string;
  author: User;
  comments: Comment[];
  removed: boolean;
}
