import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesPersonalComponent } from './challenges-personal.component';

describe('ChallengesPersonalComponent', () => {
  let component: ChallengesPersonalComponent;
  let fixture: ComponentFixture<ChallengesPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
