import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-4.x';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-submissions-new',
  templateUrl: './submissions-new.component.html',
  styleUrls: ['./submissions-new.component.css']
})
export class SubmissionsNewComponent implements OnInit {
  @ViewChild('fileName') fileName: ElementRef;
  userId: string;
  isUploading: boolean = false;
  uploadProgress: number = 0;
  //  File uploader
  uploader: FileUploader;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private router: Router, 
    private route: ActivatedRoute, 
    private databaseService: DatabaseService,
    private ref: ChangeDetectorRef
  ) {
    this.userId = JSON.parse(localStorage.getItem('profile')).user_id;
  }

  ngOnInit() {
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      autoUpload: false,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onAfterAddingFile = (fileItem: FileItem): any => {
      this.fileName.nativeElement.value = fileItem.file.name;
    }
    
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
