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
  // PUBLIC_CHALLENGES_URL = 'http://localhost:3000/api/challenges/public';
  // PRIVATE_CHALLENGES_URL = 'http://localhost:3000/api/challenges/private';

  constructor(private http: Http, private authHttp: AuthHttp, private challengeService: ChallengeService) { }

  //  Get all public challenges
  getPublicChallenges() {
    // if (localStorage.getItem('access_token')) {
      return this.http.get(this.DATABASE_URL_PRODUCTION + 'challenges')
        .map((response: Response) => {
          const challenges: Challenge[] = response.json();
          console.log(challenges);
          return challenges;
        })
        .subscribe(
          (challenges: Challenge[]) => this.challengeService.setChallenges(challenges),
          (err) => console.log(err.message || err)
        );
    // }
  }

  //  Get Available Private Challenges
  // getPrivateChallenges() {
  //   this.authHttp.get(this.PRIVATE_CHALLENGES_URL)
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