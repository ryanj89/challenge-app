import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/Rx';

import { Challenge } from "app/challenges/challenge.model";


@Injectable()
export class ChallengeService {
  //  API Endpoints
  PUBLIC_CHALLENGES_URL = 'http://localhost:3000/api/challenges/public';
  PRIVATE_CHALLENGES_URL = 'http://localhost:3000/api/challenges/private';

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  //  Get Available Public Challenges
  getPublicChallenges() {
    return this.http.get(this.PUBLIC_CHALLENGES_URL)
      .toPromise()
      .then((response: Response) => response.json() as Challenge[])
      .catch(this.handleError);
  }

  //  Get Available Private Challenges
  getPrivateChallenges() {
    return this.authHttp.get(this.PRIVATE_CHALLENGES_URL)
      .toPromise()
      .then((response: Response) => response.json() as Challenge[])
      .catch(this.handleError);
  }

  //  Error Handler
  private handleError(error: any) : Promise<any> {
    console.log('Error Occurred: ', error);
    return Promise.reject(error.message || error);

  }
}