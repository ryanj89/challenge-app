import { AuthService } from '../../auth/auth.service';
import { DatabaseService } from '../../shared/database.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Challenge } from '../challenge.model';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {

  challenges: Challenge[];
  challengeSubscription: Subscription;

  constructor(private challengeService: ChallengeService, private databaseService: DatabaseService, public authService: AuthService) {
    databaseService.getPublicChallenges()
  }

  ngOnInit() {
    //  Subscribe to changes of challenges
    this.challengeSubscription = this.challengeService.challengesChanged
      .subscribe((challenges: Challenge[]) => {
        this.challenges = challenges;
      });
    this.challenges = this.challengeService.getChallenges();
  }

  ngOnDestroy() {
    //  Unsubscribe when component is destroyed
    this.challengeSubscription.unsubscribe();
  }
}
