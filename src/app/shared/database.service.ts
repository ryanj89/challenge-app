import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operator/map';
import { AuthHttp } from 'angular2-jwt';

import { Challenge } from '../challenges/challenge.model';
import { ChallengeService } from '../challenges/challenge.service';

@Injectable()
export class DatabaseService {
  //  API Endpoints
  DATABASE_URL_PRODUCTION: string = 'https://frozen-lowlands-52602.herokuapp.com/api/';
  DATABASE_URL_DEVELOPMENT: string = 'http://localhost:3000/api/';
  DATABASE_URL: string;

  constructor(private router: Router, private http: Http, private authHttp: AuthHttp, private challengeService: ChallengeService, private chatService: ChatService) {
    if (window.location.hostname === 'localhost') {
      this.DATABASE_URL = this.DATABASE_URL_DEVELOPMENT;
    } else {
      this.DATABASE_URL = this.DATABASE_URL_PRODUCTION;
    }
  }

  getUserInfo() {
    return this.authHttp.get(this.DATABASE_URL + 'me')
      .map((response: Response) => {
        const userInfo = response.json();
        return userInfo;
      })
      .subscribe(
        (userInfo: any) => console.log(userInfo),
        (err) => console.log(err.message || err)
      );
  }

  //  Get all public challenges
  getPublicChallenges() {
    return this.http.get(this.DATABASE_URL + 'challenges')
      .map((response: Response) => {
        const challenges: Challenge[] = response.json();
        return challenges;
      })
      .subscribe(
        (challenges: Challenge[]) => this.challengeService.setChallenges(challenges),
        (err) => console.log(err.message || err));
  }

  getPersonalChallenges() {
    return this.authHttp.get(this.DATABASE_URL + 'me/challenges')
      .map((response: Response) => {
        const myChallenges: Challenge[] = response.json();
        return myChallenges;
      })
      .subscribe(
        (myChallenges: Challenge[]) => this.challengeService.setPersonalChallenges(myChallenges),
        (err) => console.log(err.message || err));
  }

  createChallenge(challenge: Challenge) {
    return this.authHttp.post(this.DATABASE_URL + 'challenges', challenge)
      .map((response: Response) => {
        const challenge: Challenge = response.json();
        return challenge;
      })
      .subscribe(
        (challenge: Challenge) => this.challengeService.addChallenge(challenge));
  }

  createSubmission(submission) {
    return this.http.post(this.DATABASE_URL + 'submissions', submission)
      .map(response => response.json());
  }

  getChallenge(id) {
    //  Get single challenge
    let challenge = this.http.get(this.DATABASE_URL + 'challenges/' + id).map(res => res.json());
    //  Get users competing in challenge
    let challengeUsers = this.http.get(this.DATABASE_URL + 'users_challenges?challenge=' + id).map(res => res.json());
    //  Get submissions to challenge
    let submissions = this.http.get(this.DATABASE_URL + 'submissions?challenge=' + id).map(res => res.json());
    return Observable.forkJoin([challenge, challengeUsers, submissions])
      .subscribe(results => {
        results[0].challengers = results[1];
        results[0].submissions = results[2];
        return this.challengeService.setSelectedChallenge(results[0]);
      });
  }

  getChallengeUsers(id) {
    return this.http.get(this.DATABASE_URL + 'challenges/' + id + '/users')
      .map((response: Response) => {
        const users = response.json();
        return users;
      })
      .subscribe(
        (users) => this.challengeService.setChallengeUsers(users));
  }

  getSubmissions(id) {
    return this.http.get(this.DATABASE_URL + 'challenges/' + id + '/submissions')
      .map((response: Response) => {
        const submissions = response.json();
        return submissions;
      })
      .subscribe(
        (submissions) => this.challengeService.setSubmissions(submissions));
  }

  joinChallenge(id) {
    return this.http.post(this.DATABASE_URL + 'users_challenges', { u_id: localStorage.getItem('userId'), c_id: id });
  }

  getChatMessages(id) {
    return this.http.get(this.DATABASE_URL + 'challenges/' + id + '/messages').map(res => res.json());
  }

}