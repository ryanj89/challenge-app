import { Component, OnInit } from '@angular/core';

import { Challenge } from "app/challenges/challenge.model";
import { ChallengeService } from "app/challenges/challenge.service";
import { AuthService } from "app/auth/auth.service";

@Component({
  selector: 'app-challenges-public',
  templateUrl: './challenges-public.component.html',
  styleUrls: ['./challenges-public.component.css']
})
export class ChallengesPublicComponent implements OnInit {
  publicChallenges : Challenge[];

  constructor(
    private challengeService: ChallengeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.challengeService.getPublicChallenges()
      .then(challenges => this.publicChallenges = challenges);
  }

}
