import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomHTTPResponse, apiUrl } from '../../common';
import { Topic } from '../../models/topic.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private topicsSubject = new BehaviorSubject<Topic[]>([]);
  topics$ = this.topicsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTopics() {
    this.http
      .get<CustomHTTPResponse>(`${apiUrl}/topics`)
      .subscribe((res) => this.topicsSubject.next(res.data));
  }

  addTopic(topic: Topic) {
    return this.http.post(`${apiUrl}/topic/add`, topic);
  }

  deleteTopic(topicId: any) {
    return this.http
      .delete(`${apiUrl}/topic/${topicId}`)
      .subscribe(() => this.getTopics());
  }

  //POST /api/topic/:id/comment/add
  addCommentToTopic(topicId: number, body: string, author: User) {
    return this.http.post(`${apiUrl}/topic/${topicId}/comment/add`, {
      body,
      author,
    });
  }

  // /topic/:topicId/comment/:commentId/add
  //POST /api/topic/:topicId/comment/:commentId/add
  addCommentToComment(
    topicId: number,
    commentId: number,
    body: string,
    author: User
  ) {
    return this.http.post(
      `${apiUrl}/topic/${topicId}/comment/${commentId}/add`,
      {
        body,
        author,
      }
    );
  }

  // DELETE /api/topic/:topicId/comment/:commentId
  deleteComment(topicId: number, commentId: number) {
    this.http
      .delete(`${apiUrl}/topic/${topicId}/comment/${commentId}`)
      .subscribe(() => this.getTopics());
  }

  updateTopics(topics: Topic[]) {
    this.topicsSubject.next(topics);
  }
}
