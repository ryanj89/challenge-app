import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Challenge } from "app/challenges/challenge.model";

@Injectable()
export class ChallengeService {

  private challenges: Challenge[] = [];
  challengesChanged = new Subject<Challenge[]>();

  categories: string[] = [
    'music',
    'outdoor',
    'health',
    'skill',
    'fun',
    'misc'
  ];

  constructor(private router: Router) { }

  setChallenges(challenges: Challenge[]) {
    this.challenges = challenges;
    this.challengesChanged.next(this.challenges.slice());
  }

  getChallenges() {
    return this.challenges.slice();
  }

  addChallenge(challenge: Challenge) {
    this.challenges.push(challenge);
    this.challengesChanged.next(this.challenges.slice());
    this.router.navigate(['/challenges']);
  }

}