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
  userId: string;
  isUploading: boolean = false;
  uploadProgress: number = 0;
  //  File uploader
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'ryanj89', uploadPreset: 'unvn5lqv'})
  );
  constructor(private router: Router, private route: ActivatedRoute, private databaseService: DatabaseService) {
    this.userId = JSON.parse(localStorage.getItem('profile')).user_id;
    this.uploader.onProgressAll = (progress: any) => {
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
      const res = JSON.parse(response);
      const value = form.value;
      const newSubmission =  {
        u_id: this.userId,
        c_id: this.route.snapshot.params.id,
        submission: res.public_id,
        resource_type: res.resource_type,
        details: form.value.details
      };
      //  POST to database
      this.databaseService.createSubmission(newSubmission)
        .subscribe(submission => window.location.reload());
    };
  }
}
