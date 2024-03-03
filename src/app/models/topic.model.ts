import { Comment } from './comment.model';
import { User } from './user.model';

export interface Topic {
  id: number;
  author: Partial<User>;
  title: string;
  body: string;
  comments: Comment[];
}
