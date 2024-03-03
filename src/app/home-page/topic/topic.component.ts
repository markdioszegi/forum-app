import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { CommentComponent } from '../comment/comment.component';
import { CommentAddComponent } from '../comment-add/comment-add.component';
import { TopicService } from '../../services/topic/topic.service';
import { UserService } from '../../services/user/user.service';
import { ROLES, getPermissionLevel } from '../../common';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommentComponent, CommentAddComponent],
  templateUrl: './topic.component.html',
})
export class TopicComponent {
  @Input() topic!: Topic;
  expanded = true;

  constructor(
    private topicService: TopicService,
    private userService: UserService
  ) {}

  expand() {
    this.expanded = true;
  }

  deleteTopic() {
    this.topicService.deleteTopic(this.topic.id);
  }

  get hasPermission(): boolean {
    return (
      (this.userService.permissionLevel >= getPermissionLevel(ROLES.Gold) &&
        this.userService.permissionLevel <= getPermissionLevel(ROLES.Admins) &&
        this.topic.author.id === this.userService.selectedUser.id) ||
      this.userService.permissionLevel >= getPermissionLevel(ROLES.Admins)
    );
  }

  get hasNonDeletedComments(): boolean {
    return this.topic.comments.filter((comment) => !comment.removed).length > 0;
  }
}
