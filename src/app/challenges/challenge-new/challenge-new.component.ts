import { DatabaseService } from '../../shared/database.service';
import { AuthService } from '../../auth/auth.service';
import { Challenge } from '../challenge.model';
import { ChallengeService } from '../challenge.service';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-challenge-new',
  templateUrl: './challenge-new.component.html',
  styleUrls: ['./challenge-new.component.css']
})
export class ChallengeNewComponent implements OnInit {
  profile: any;
  @ViewChild('challengeForm') challengeForm: NgForm;
  formSubscription: Subscription;
  categories: string[];
  isPrivateDefault = false;

  constructor(private challengeService: ChallengeService, private authService: AuthService, private databaseService: DatabaseService) {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
    }
    this.authService.onLoggedIn.subscribe(updatedProfile => {
      this.profile = updatedProfile;
    });
  }

  ngOnInit() {
    this.categories = this.challengeService.categories;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newChallenge = new Challenge(
      value.name, 
      value.description, 
      this.profile.user_id, 
      value.video_url, 
      value.category, 
      value.points, 
      value.expires_at,
      value.private);
    console.log(newChallenge);
    this.databaseService.createChallenge(newChallenge);
  }

  onClear() {
    
  }

}
