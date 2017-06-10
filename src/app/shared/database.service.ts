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

  constructor(private http: Http, private authHttp: AuthHttp, private challengeService: ChallengeService) {
    if (window.location.hostname === 'localhost') {
      this.DATABASE_URL = this.DATABASE_URL_DEVELOPMENT;
    } else {
      this.DATABASE_URL = this.DATABASE_URL_PRODUCTION;
    }
  }

  getUserInfo() {
    console.log('Getting user info...')
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
    console.log('Getting public challenges...')
    return this.http.get(this.DATABASE_URL + 'challenges')
      .map((response: Response) => {
        const challenges: Challenge[] = response.json();
        console.log(challenges);
        return challenges;
      })
      .subscribe(
        (challenges: Challenge[]) => this.challengeService.setChallenges(challenges),
        (err) => console.log(err.message || err));
  }

  getPersonalChallenges() {
    console.log('Getting personal challenges...')
    return this.authHttp.get(this.DATABASE_URL + 'me/challenges')
      .map((response: Response) => {
        const myChallenges: Challenge[] = response.json();
        console.log(myChallenges);
        console.log(myChallenges[0]);
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
        console.log(challenge);
        return challenge;
      })
      .subscribe(
        (challenge: Challenge) => this.challengeService.addChallenge(challenge));
  }

  //  Get Available Private Challenges
  // getPrivateChallenges() {
  //   this.authHttp.get(this.DATABASE_URL + 'me/challenges')
  //     .subscribe(
  //       (data) => this.challenges = data.json(),
  //       (err) => console.log(err),
  //       () => console.log('Request completed')
  //     );
  //   // return this.authHttp.get(this.PRIVATE_CHALLENGES_URL)
  //   //   .toPromise()
  //   //   .then((response: Response) => response.json() as Challenge[])
  //   //   .catch(this.handleError);
  // }
}


//   storeRecipes() {
//     const token = this.authService.getToken();
//     return this.http.put('https://ng4-recipe-app.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
//   }