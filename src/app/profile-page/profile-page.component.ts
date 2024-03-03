import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ActivatedRoute } from '@angular/router';
import { RolePipe } from '../pipes/role.pipe';
import { getPermissionLevel } from '../common';
import { TopicService } from '../services/topic/topic.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileUpdateComponent, RolePipe],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  userId!: number;
  topicsWritten!: number;
  commentsWritten!: number;

  constructor(
    private userService: UserService,
    private topicService: TopicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => (this.userId = params['id'])
    );

    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;

      this.topicService.topics$.subscribe((topics) => {
        this.topicsWritten = topics
          .map((topic) => topic.author.id === user.id)
          .filter(Boolean).length;

        let count = 0;

        const countComments = (comments: Comment[]) => {
          for (const comment of comments) {
            if (comment.author.id === user.id) {
              count++;
            }

            if (comment.comments.length > 0) {
              countComments(comment.comments);
            }
          }
        };

        for (const topic of topics) {
          countComments(topic.comments);
        }

        this.commentsWritten = count;
      });
    });
  }

  get permission() {
    return getPermissionLevel(this.user.role);
  }
}
