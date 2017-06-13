import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  profile: any;
  constructor() {}

  setProfile(profile) {
    this.profile = profile;
  }
}