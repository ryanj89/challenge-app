import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getUserInfo();
  }

}
