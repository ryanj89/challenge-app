import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Challenge } from "app/challenges/challenge.model";

@Injectable()
export class ChallengeService {

  private challenges: Challenge[] = [];
  private personalChallenges: Challenge[] = [];
  challengesChanged = new Subject<Challenge[]>();
  personalChallengesChanged = new Subject<Challenge[]>();

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

  setPersonalChallenges(challenges: Challenge[]) {
    this.personalChallenges = challenges;
    this.personalChallengesChanged.next(this.personalChallenges.slice());
  }

  getChallenges() {
    return this.challenges.slice();
  }

  getPersonalChallenges() {
    return this.personalChallenges.slice();
  }

  addChallenge(challenge: Challenge) {
    this.challenges.push(challenge);
    this.challengesChanged.next(this.challenges.slice());
    this.router.navigate(['/challenges']);
  }

}