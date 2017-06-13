import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-submission-item',
  templateUrl: './challenge-submission-item.component.html',
  styleUrls: ['./challenge-submission-item.component.css']
})
export class ChallengeSubmissionItemComponent implements OnInit {
  @Input('submissions') submissions: any[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  vote(index) {
    console.log(index);
  }

}
