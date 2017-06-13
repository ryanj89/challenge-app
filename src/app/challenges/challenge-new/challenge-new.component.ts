import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Subscription } from 'rxjs/Rx';

import { Challenge } from '../challenge.model';
import { DatabaseService } from '../../shared/database.service';
import { AuthService } from '../../auth/auth.service';
import { ChallengeService } from '../challenge.service';

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
  isUploading: boolean = false;
  uploadComplete: boolean = false;
  uploadProgress: number = 0;
  //  File uploader
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'ryanj89', uploadPreset: 'unvn5lqv'})
  );

  constructor(
    private challengeService: ChallengeService, 
    private authService: AuthService, 
    private databaseService: DatabaseService,
    private ref: ChangeDetectorRef
  ) {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
    }
    this.authService.onLoggedIn.subscribe(updatedProfile => {
      this.profile = updatedProfile;
    });
    this.uploader.onProgressAll = (progress: any) => {
      this.ref.detectChanges();
      this.uploadProgress = progress;
    }
  }

  ngOnInit() {
    this.categories = this.challengeService.categories;
  }

  onSubmit(form: NgForm) {
    this.isUploading = true;
    //  Upload image/video
    this.uploader.uploadAll();
    //  When upload successful...
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      this.uploadComplete = true;
      const video_url = JSON.parse(response).secure_url;
      const value = form.value;
      const newChallenge = new Challenge(
        value.name, 
        value.description, 
        this.profile.user_id, 
        video_url, 
        value.category, 
        value.expires_at,
        value.private);
      //  POST to database
      this.databaseService.createChallenge(newChallenge);
    };
  }

  onClear() {
    
  }

}
