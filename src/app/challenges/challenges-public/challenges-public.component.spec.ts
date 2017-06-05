import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesPublicComponent } from './challenges-public.component';

describe('ChallengesPublicComponent', () => {
  let component: ChallengesPublicComponent;
  let fixture: ComponentFixture<ChallengesPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
