import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Topic } from '../../models/topic.model';
import { FormsModule } from '@angular/forms';
import { CommentAddComponent } from '../comment-add/comment-add.component';
import { TopicService } from '../../services/topic/topic.service';
import { UserService } from '../../services/user/user.service';
import { ROLES, getPermissionLevel } from '../../common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, CommentAddComponent],
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() topic!: Topic;
  @Input() depth!: number;

  constructor(
    private topicService: TopicService,
    private userService: UserService
  ) {}

  deleteComment() {
    this.topicService.deleteComment(this.topic.id, this.comment.id);
  }

  get hasPermission(): boolean {
    return (
      this.userService.permissionLevel >= getPermissionLevel(ROLES.Admins) ||
      this.topic.author.id === this.userService.selectedUser.id ||
      this.comment.author.id === this.userService.selectedUser.id
    );
  }
}
