import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../services/topic/topic.service';
import { UserService } from '../../services/user/user.service';
import { Topic } from '../../models/topic.model';
import { Comment } from '../../models/comment.model';
import { ROLES, getPermissionLevel } from '../../common';

@Component({
  selector: 'app-comment-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-add.component.html',
})
export class CommentAddComponent {
  @Input() comment!: Comment;
  @Input() topic!: Topic;
  @Input() type!: 'comment' | 'reply';
  commentBody!: string;

  constructor(
    private userService: UserService,
    private topicService: TopicService
  ) {}

  get hasPermission() {
    return this.userService.permissionLevel >= getPermissionLevel(ROLES.Silver);
  }

  onSubmit() {
    if (this.type === 'reply') {
      this.topicService
        .addCommentToComment(
          this.topic.id,
          this.comment.id,
          this.commentBody,
          this.userService.selectedUser
        )
        .subscribe((res) => console.log(res));
    } else {
      this.topicService
        .addCommentToTopic(
          this.topic.id,
          this.commentBody,
          this.userService.selectedUser
        )
        .subscribe((res) => console.log(res));
    }
  }
}
