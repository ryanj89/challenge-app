import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsNewComponent } from './submissions-new.component';

describe('SubmissionsNewComponent', () => {
  let component: SubmissionsNewComponent;
  let fixture: ComponentFixture<SubmissionsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
