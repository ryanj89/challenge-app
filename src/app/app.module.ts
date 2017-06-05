import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
//  Routing
import { AppRoutingModule } from "./app.routing.module";
//  Components
import { AppComponent } from './app.component';
import { ChallengesPublicComponent } from './challenges/challenges-public/challenges-public.component';
import { ChallengesPrivateComponent } from './challenges/challenges-private/challenges-private.component';
//  Services
import { ChallengeService } from './challenges/challenge.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from "./auth/auth-guard.service";
import { CallbackComponent } from './auth/callback/callback.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesPublicComponent,
    ChallengesPrivateComponent,
    CallbackComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ChallengeService, AuthService, AuthGuard, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
