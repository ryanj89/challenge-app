import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//  Custom Pipes
import { OrderByPipe } from './shared/order-by.pipe';
//  Cloudinary File Upload
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
//  Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
//  Routing
import { AppRoutingModule } from "./app.routing.module";
import { AuthModule } from "./auth/auth.module";
//  Components
import { AppComponent } from './app.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChallengesComponent } from "./challenges/challenges.component";
import { ChallengeListComponent } from './challenges/challenge-list/challenge-list.component';
import { ChallengeNewComponent } from './challenges/challenge-new/challenge-new.component';
import { ProfileComponent } from './profile/profile.component';
import { ChallengesPersonalComponent } from './challenges/challenges-personal/challenges-personal.component';
import { ChallengeDetailComponent } from './challenges/challenge-detail/challenge-detail.component';
//  Services
import { DatabaseService } from './shared/database.service';
import { ChallengeService } from './challenges/challenge.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from "./auth/auth-guard.service";
import { ChatService } from './shared/chat.service';
import { UserService } from './shared/user.service';
import { ChatComponent } from './chat/chat.component';
import { ChallengeSubmissionComponent } from './challenges/challenge-submission/challenge-submission.component';
import { SubmissionsNewComponent } from './challenges/submissions-new/submissions-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    CallbackComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    ChallengeListComponent,
    ChallengeNewComponent,
    ProfileComponent,
    ChallengesPersonalComponent,
    OrderByPipe,
    ChallengeDetailComponent,
    ChatComponent,
    ChallengeSubmissionComponent,
    SubmissionsNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    AppRoutingModule,
    AuthModule,
    // MaterialModule,
    // FlexLayoutModule,
    // BrowserAnimationsModule
  ],
  providers: [
    ChallengeService, 
    DatabaseService,
    ChatService, 
    AuthService, 
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
