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
  @ViewChild('challengeForm') challengeForm: NgForm;
  formSubscription: Subscription;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {

  }

  // category:"outdoors"
  // created_at:"2017-06-05T18:05:44.738Z"
  // creator:"Lindsay Bendell"
  // creator_id:2
  // description:"This is a description for another challenge."
  // expires_at:null
  // id:2
  // name:"Challenge #2"
  // points:200
  // private:false
  // updated_at:"2017-06-05T18:05:44.738Z"
  // video_url:"https://www.youtube.com/watch?v=Ff9eDId1GtM&t=1502s"
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    // const newChallenge = new Challenge(value.name, value.description, new Date(), new Date(),);
    // console.log(newChallenge);

  }

}
