import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'lib';
import { SocialUser } from 'lib';
import {
  FacebookLoginProvider,
  AmazonLoginProvider,
  VKLoginProvider,
  MicrosoftLoginProvider,
} from 'lib';

@Component({
  selector: 'lib-app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  returnUrl: string;

  constructor(private readonly _authService: SocialAuthService, private route: ActivatedRoute,private router: Router,) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.router.navigate([this.returnUrl]);
    });
    		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // signInWithAmazon(): void {
  //   this._authService.signIn(AmazonLoginProvider.PROVIDER_ID);
  // }

  // signInWithVK(): void {
  //   this._authService.signIn(VKLoginProvider.PROVIDER_ID);
  // }

  signInWithMicrosoft(): void {
    this._authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    
  }
}
