import { ChallengeService } from '../challenge.service';
import { Subscription } from 'rxjs/Rx';
import { DatabaseService } from '../../shared/database.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Challenge } from '../challenge.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit, OnDestroy {
  challenge: Challenge;
  challengeSub: Subscription;
  challengers: any[];
  submissions: any[];
  isCompeting: boolean = false;
  hasSubmited: boolean = false;

  constructor(private route: ActivatedRoute, private challengeService: ChallengeService, private databaseService: DatabaseService) {
    route.params.subscribe((params: Params) => {
      // const findChallenge = challengeService.personalChallenges.filter(c => c.id === +params['id']);
      // if (findChallenge.length !== 0) {
      //   this.isCompeting = true;
      // }
      databaseService.getChallenge(params['id'])
    });
  }

  ngOnInit() {
    this.challengeSub = this.challengeService.selectedChallengeChanged
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.challengers = challenge.challengers;
        this.submissions = challenge.submissions;
        console.log(this.submissions);
        //  Check to see if the users has already joined this challenge
        const hasJoined = this.challengers.filter(c => c.u_id == localStorage.getItem('userId'));
        if (hasJoined.length !== 0) {
          this.isCompeting = true;
        }
        if (this.isCompeting === true) {
          //  If they ahve already joined, check to see if they have submitted an attempt
          const hasSubmitted = this.submissions.filter(s => s.u_id == localStorage.getItem('userId'));
          if (hasSubmitted.length !== 0) {
            this.hasSubmited = true;
          }
        }
      })
    this.challenge = this.challengeService.getChallenge();
  }

  joinChallenge(id) {
    this.databaseService.joinChallenge(id).subscribe(
      (response) => {
        this.isCompeting = true;
        this.databaseService.getChallengeUsers(id);
      });
  }

  ngOnDestroy() {
    this.challengeSub.unsubscribe();
  }

}
