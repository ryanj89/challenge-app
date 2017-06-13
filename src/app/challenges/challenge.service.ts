import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Challenge } from "app/challenges/challenge.model";

@Injectable()
export class ChallengeService {

  private selectedChallenge: Challenge;
  selectedChallengeChanged = new Subject<Challenge>();
  
  private challengeUsers = [];
  challengeUsersChanged = new Subject<any[]>();

  private challenges: Challenge[] = [];
  challengesChanged = new Subject<Challenge[]>();

  personalChallenges: Challenge[] = [];
  personalChallengesChanged = new Subject<Challenge[]>();

  submissions = [];
  submissionsChanged = new Subject<any[]>();

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

  setSelectedChallenge(challenge: Challenge) {
    this.selectedChallenge = challenge;
    this.selectedChallengeChanged.next(this.selectedChallenge);
  }

  setChallengeUsers(users) {
    this.challengeUsers = users;
    this.challengeUsersChanged.next(this.challengeUsers);
  }

  setSubmissions(submissions) {
    this.submissions = submissions;
    this.submissionsChanged.next(this.submissions.slice());
  }

  getChallenge() {
    return this.selectedChallenge;
  }

  getChallengeUsers() {
    return this.challengeUsers.slice();
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