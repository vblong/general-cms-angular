import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  hide = true;

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    /**
     *  SAMPLE SOCIAL USER OBJECT
     * {
            "id": "100973658696940715015",
            "name": "Long Vu",
            "email": "bolong.v@gmail.com",
            "photoUrl": "https://lh3.googleusercontent.com/a/AATXAJwxBfACNdMgVgCseFaeitt-jwITqPGYqMGQvwwPEg=s96-c",
            "firstName": "Long",
            "lastName": "Vu",
            "authToken": "ya29.a0ARrdaM-d_OR5-qbxxiSaxuOGH7CWj5Be0qLVvJ3Ev7eGvVMp3G99FXuV7H3Uw-1ZjKaaR70QyXPf63GeRMUMnRN7BoNZRJLCD-TpaPACtZCEOEBDTLfVd4bvNDc-yOqFb-Bo0HDf16US-ZWNAvOq6_AzjQyKyw",
            "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwMWMxYWJlMjQ5MjY5ZjcyZWY3Y2EyNjEzYTg2YzlmMDVlNTk1NjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDQ1ODkyNDg5MjMyLWtldHM3N2dpdTVlZTZhZ212a3BrY2oxbzYybjlrMGZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDQ1ODkyNDg5MjMyLWtldHM3N2dpdTVlZTZhZ212a3BrY2oxbzYybjlrMGZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwOTczNjU4Njk2OTQwNzE1MDE1IiwiZW1haWwiOiJib2xvbmcudkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Imx0cG5FNllSbjluU3lvNF9Gd2JZMkEiLCJuYW1lIjoiTG9uZyBWdSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp3eEJmQUNOZE1nVmdDc2VGYWVpdHQtandJVHFQR1lxTUdRdnd3UEVnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkxvbmciLCJmYW1pbHlfbmFtZSI6IlZ1IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NDEyNDUxMDAsImV4cCI6MTY0MTI0ODcwMCwianRpIjoiMjI2ZWJlMWRjZGIzNmU4M2RlNzhhNzM2YTM5NmJmYzQxODU1NTY4NiJ9.YDro8_e2zBT0qeh8BRJvxmaUapg8lCtLNcDJbi4XgTjoaj5P9U86QbbWEe6zTXAEjCH19bAI1QABiyUAcCF9Ax1hi5_VFtaP8TkuJo9DoMQsTaE1w6MdMB5xjT521mXvsigNMwvtjcs9UVd4RWDRCT_Kuzp4dRrIphs5EW0AQeFARwRFQDBYpp196ogFw8hgmw-iwOfHXn_WbJkaZB6fjTArn6VAtZcKUR0ZRlmZzqmMnxn4oPDs0DAoSDuof9-KQ5VWtYbrThs_1rXn0S4LvLJqNA7N-H_PimtwAH3IK0OZLLQzCfBif7o3Uyb_OAo5eX3DhmLWmCVALRGWwndXiQ",
            "response": {
                "token_type": "Bearer",
                "access_token": "ya29.a0ARrdaM-d_OR5-qbxxiSaxuOGH7CWj5Be0qLVvJ3Ev7eGvVMp3G99FXuV7H3Uw-1ZjKaaR70QyXPf63GeRMUMnRN7BoNZRJLCD-TpaPACtZCEOEBDTLfVd4bvNDc-yOqFb-Bo0HDf16US-ZWNAvOq6_AzjQyKyw",
                "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
                "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cAhayNIKrEI-RwWEa_27cr0IbY55GacvJdj4p3U9nANGQqoqOGtMkY8YO2Vnm2SEOhDVq43w",
                "expires_in": 3599,
                "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwMWMxYWJlMjQ5MjY5ZjcyZWY3Y2EyNjEzYTg2YzlmMDVlNTk1NjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDQ1ODkyNDg5MjMyLWtldHM3N2dpdTVlZTZhZ212a3BrY2oxbzYybjlrMGZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDQ1ODkyNDg5MjMyLWtldHM3N2dpdTVlZTZhZ212a3BrY2oxbzYybjlrMGZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwOTczNjU4Njk2OTQwNzE1MDE1IiwiZW1haWwiOiJib2xvbmcudkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Imx0cG5FNllSbjluU3lvNF9Gd2JZMkEiLCJuYW1lIjoiTG9uZyBWdSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp3eEJmQUNOZE1nVmdDc2VGYWVpdHQtandJVHFQR1lxTUdRdnd3UEVnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkxvbmciLCJmYW1pbHlfbmFtZSI6IlZ1IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NDEyNDUxMDAsImV4cCI6MTY0MTI0ODcwMCwianRpIjoiMjI2ZWJlMWRjZGIzNmU4M2RlNzhhNzM2YTM5NmJmYzQxODU1NTY4NiJ9.YDro8_e2zBT0qeh8BRJvxmaUapg8lCtLNcDJbi4XgTjoaj5P9U86QbbWEe6zTXAEjCH19bAI1QABiyUAcCF9Ax1hi5_VFtaP8TkuJo9DoMQsTaE1w6MdMB5xjT521mXvsigNMwvtjcs9UVd4RWDRCT_Kuzp4dRrIphs5EW0AQeFARwRFQDBYpp196ogFw8hgmw-iwOfHXn_WbJkaZB6fjTArn6VAtZcKUR0ZRlmZzqmMnxn4oPDs0DAoSDuof9-KQ5VWtYbrThs_1rXn0S4LvLJqNA7N-H_PimtwAH3IK0OZLLQzCfBif7o3Uyb_OAo5eX3DhmLWmCVALRGWwndXiQ",
                "session_state": {
                    "extraQueryParams": {
                        "authuser": "0"
                    }
                },
                "first_issued_at": 1641245101269,
                "expires_at": 1641248700269,
                "idpId": "google"
            },
            "provider": "GOOGLE"
        }
     */
    this.socialAuthService.authState.subscribe((user) => {
      console.log("Login success");
      console.log(user);
      this.socialUser = user;
      this.isLoggedIn = (user != null);

      this.tokenStorage.saveToken(user.authToken);
      this.tokenStorage.saveUser(user);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    },
    err => {
      console.log("Login failed");
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    const val = this.form.value;
    this.authService.login(val.email, val.password).subscribe(
      data => {
        console.log("Login success");
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this._snackBar.open("Login failed", "Close", {duration: 5000 })
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  register() {
    this._snackBar.open("Under development", "Close", {
      duration: 3000
    });
  }

  forgotPassword() {
    this._snackBar.open("Under development", "Close", {
      duration: 3000
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this._snackBar.open("Not intergrated yet", "TODO", {
      duration: 3000
    });
  }

}
