import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth"
import "firebase/firestore";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

    isAuth: boolean;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        );
    }

    async onSignOut() {
        await this.authService.signOutUser();
        console.log('Sign out successfully');
    }

}
