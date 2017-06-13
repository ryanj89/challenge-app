import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSubmissionItemComponent } from './challenge-submission-item.component';

describe('ChallengeSubmissionItemComponent', () => {
  let component: ChallengeSubmissionItemComponent;
  let fixture: ComponentFixture<ChallengeSubmissionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeSubmissionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSubmissionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
