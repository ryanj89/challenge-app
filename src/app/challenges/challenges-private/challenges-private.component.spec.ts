import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesPrivateComponent } from './challenges-private.component';

describe('ChallengesPrivateComponent', () => {
  let component: ChallengesPrivateComponent;
  let fixture: ComponentFixture<ChallengesPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
