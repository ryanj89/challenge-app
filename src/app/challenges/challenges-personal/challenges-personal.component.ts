import { ChallengeService } from '../challenge.service';
import { Subscription } from 'rxjs/Rx';
import { Challenge } from '../challenge.model';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-challenges-personal',
  templateUrl: './challenges-personal.component.html',
  styleUrls: ['./challenges-personal.component.css']
})
export class ChallengesPersonalComponent implements OnInit {
  personalChallenges: Challenge[];
  personalChallengeSubscription: Subscription;
  
  sortType: string = 'name';
  sortReverse: boolean = false;

  constructor(private databaseService: DatabaseService, private challengeService: ChallengeService) {
    databaseService.getPersonalChallenges();
  }

  ngOnInit() {
    this.personalChallengeSubscription = this.challengeService.personalChallengesChanged
      .subscribe((challenges: Challenge[]) => {
        this.personalChallenges = challenges;
        console.log(this.personalChallenges);
      });
    this.personalChallenges = this.challengeService.getPersonalChallenges();
  }

}
