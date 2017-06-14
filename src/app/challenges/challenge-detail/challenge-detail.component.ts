import { ChatService } from '../../shared/chat.service';
import { ChallengeService } from '../challenge.service';
import { Subscription } from 'rxjs/Rx';
import { DatabaseService } from '../../shared/database.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Challenge } from '../challenge.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css'],
  providers: [ChatService]
})
export class ChallengeDetailComponent implements OnInit, OnDestroy {
  userId: string;

  challenge: Challenge;
  challengeSub: Subscription;
  challengers: any[];
  submissions: any[];

  isCompeting: boolean = true;
  hasSubmited: boolean = true;
  isSubmitting: boolean = false;

  constructor(private route: ActivatedRoute, private challengeService: ChallengeService, private databaseService: DatabaseService) {
    route.params.subscribe((params: Params) => {
      databaseService.getChallenge(params['id'])
    });
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('profile')).user_id;
    this.challengeSub = this.challengeService.selectedChallengeChanged
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.challengers = challenge.challengers;
        this.submissions = challenge.submissions;
        console.log(this.challengers);
        //  Check to see if the users has already joined this challenge
        const hasJoined = this.challengers.filter(c => c.u_id == this.userId);
        if (hasJoined.length === 0) {
          this.isCompeting = false;
        }
        if (this.isCompeting === true) {
          //  If they have already joined, check to see if they have submitted an attempt
          const hasSubmitted = this.submissions.filter(s => s.u_id == this.userId);
          if (hasSubmitted.length === 0) {
            this.hasSubmited = false;
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
