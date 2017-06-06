import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/Rx';

import { Challenge } from "app/challenges/challenge.model";

@Injectable()
export class ChallengeService {

  private challenges: Challenge[] = [];
  challengesChanged = new Subject<Challenge[]>();

  constructor(private http: Http, private authHttp: AuthHttp) { }

  setChallenges(challenges: Challenge[]) {
    this.challenges = challenges;
    this.challengesChanged.next(this.challenges.slice());
  }

  getChallenges() {
    return this.challenges.slice();
  }

}