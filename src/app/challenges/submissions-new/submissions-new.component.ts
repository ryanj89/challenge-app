import { DatabaseService } from '../../shared/database.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
  selector: 'app-submissions-new',
  templateUrl: './submissions-new.component.html',
  styleUrls: ['./submissions-new.component.css']
})
export class SubmissionsNewComponent implements OnInit {
  isUploading: boolean = false;
  uploadProgress: number = 0;
  //  File uploader
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'ryanj89', uploadPreset: 'unvn5lqv'})
  );
  constructor(private router: Router, private route: ActivatedRoute, private databaseService: DatabaseService) {
    this.uploader.onProgressAll = (progress: any) => {
      // this.ref.detectChanges();
      this.uploadProgress = progress;
    }
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.isUploading = true;
    //  Upload image/video
    this.uploader.uploadAll();
    //  When upload successful...
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      console.log('Upload Success! POST to database...');
      const submission_url = JSON.parse(response).secure_url;
      const value = form.value;
      const newSubmission =  {
        u_id: localStorage.getItem('userId'),
        c_id: this.route.snapshot.params.id,
        submission: submission_url,
        details: form.value.details
      };
      //  POST to database
      this.databaseService.createSubmission(newSubmission)
        .subscribe(submission => window.location.reload());
    };
  }
}
