import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeNewComponent } from './challenge-new.component';

describe('ChallengeNewComponent', () => {
  let component: ChallengeNewComponent;
  let fixture: ComponentFixture<ChallengeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
