import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../shared/database.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-submission-item',
  templateUrl: './challenge-submission-item.component.html',
  styleUrls: ['./challenge-submission-item.component.css']
})
export class ChallengeSubmissionItemComponent implements OnInit {
  @Input('submissions') submissions: any[] = [];
  @Input('votedFor') votedFor: any;
  challengeId: string;
  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) {
    this.challengeId = route.snapshot.params['id'];
  }

  ngOnInit() {
  }

  vote(submissionId, index) {
    //  If user has not voted yet or new vote
    if (this.votedFor === null) {
      this.votedFor = submissionId;
      this.databaseService.addVote(submissionId, this.challengeId)
        .subscribe(
          (updatedScore) => this.submissions[index].score = updatedScore
        );
    } 
    // else if (this.votedFor !== submissionId) {
    //   //  Change vote
    //   console.log('CHANGING VOTE...')
    //   const prevId = this.votedFor;
    //   const oldIndex = this.submissions.findIndex(s => s.id === prevId);
    //   this.submissions[oldIndex].score--;
    //   this.votedFor = submissionId;
    //   this.submissions[index].score++;
    //   this.databaseService.updateVote(submissionId, this.votedFor, this.challengeId)
    //     .subscribe(
    //       (updatedScores) => {
    //         console.log(updatedScores);
    //         // this.submissions[index].score = updatedScores[1];
    //       });
    // }
  }

}
