import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
//  Services
import { DatabaseService } from './shared/database.service';
import { ChallengeService } from './challenges/challenge.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from "./auth/auth-guard.service";
import { ChallengeNewComponent } from './challenges/challenge-new/challenge-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    CallbackComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    ChallengeListComponent,
    ChallengeNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [ChallengeService, DatabaseService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
