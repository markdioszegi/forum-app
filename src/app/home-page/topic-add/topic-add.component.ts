import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../services/topic/topic.service';
import { Topic } from '../../models/topic.model';
import { UserService } from '../../services/user/user.service';
import { ROLES, getPermissionLevel } from '../../common';

@Component({
  selector: 'app-topic-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './topic-add.component.html',
})
export class TopicAddComponent {
  topic: Topic;

  constructor(
    private topicService: TopicService,
    private userService: UserService
  ) {
    this.topic = {
      author: userService.selectedUser,
      comments: {},
    } as Topic;
  }

  onSubmit() {
    this.topicService.addTopic(this.topic).subscribe((res) => console.log(res));
  }

  get hasPermission() {
    return this.userService.permissionLevel >= getPermissionLevel(ROLES.Gold);
  }
}
