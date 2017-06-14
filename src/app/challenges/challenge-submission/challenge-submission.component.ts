import { ChallengeService } from '../challenge.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../../shared/database.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styleUrls: ['./challenge-submission.component.css']
})
export class ChallengeSubmissionComponent implements OnInit {
  @Input('hasVoted') hasVoted: any;
  submissions: any[] = [];
  submissionSub: Subscription;

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.databaseService.getSubmissions(params['id'])
    });
    this.submissionSub = this.challengeService.submissionsChanged
      .subscribe((submissions: any[]) => {
        this.submissions = submissions;
      });
  }

}
