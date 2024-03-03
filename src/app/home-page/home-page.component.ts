import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic.model';
import { TopicService } from '../services/topic/topic.service';
import { TopicAddComponent } from './topic-add/topic-add.component';
import { CommentComponent } from './comment/comment.component';
import { TopicComponent } from './topic/topic.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TopicAddComponent, CommentComponent, TopicComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  topics!: Topic[];

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.getTopics();
    // .getTopics().subscribe((topics) => (this.topics = topics));
    this.topicService.topics$.subscribe((topics) => (this.topics = topics));
  }
}
