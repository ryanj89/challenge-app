import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { NgForm } from '@angular/forms';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Subscription } from 'rxjs/Rx';
import { Cloudinary } from '@cloudinary/angular-4.x';

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
  private uploader: FileUploader;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
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
  }

  ngOnInit() {
    this.categories = this.challengeService.categories;
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: false,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onProgressAll = (progress: any) => {
      this.ref.detectChanges();
      this.uploadProgress = progress;
    }
  }

  onSubmit(form: NgForm) {
    this.isUploading = true;
    //  Upload image/video
    this.uploader.uploadAll();
    //  When upload successful...
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      console.log(response);
      this.uploadComplete = true;
      const res = JSON.parse(response);
      const value = form.value;
      const newChallenge = new Challenge(
        value.name, 
        value.description, 
        this.profile.user_id, 
        res.public_id,
        res.resource_type, 
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
