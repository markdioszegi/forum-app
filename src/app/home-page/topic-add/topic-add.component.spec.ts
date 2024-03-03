import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAddComponent } from './topic-add.component';

describe('AddTopicComponent', () => {
  let component: TopicAddComponent;
  let fixture: ComponentFixture<TopicAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
