import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

/* FIREBASE IMPORTS */
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    lastTimeBackPress = 0
    timePeriodToExit = 2000;

    constructor(
        private platform: Platform,
        private alertController: AlertController,
        private router: Router,
        private location: Location
    ) {

        this.backButtonEvent();

        var firebaseConfig = {
            apiKey: "AIzaSyAwmvzgxebTwJbDUrxAtiC0446xwzjaOng",
            authDomain: "myapp-29fa0.firebaseapp.com",
            databaseURL: "https://myapp-29fa0-default-rtdb.firebaseio.com",
            projectId: "myapp-29fa0",
            storageBucket: "myapp-29fa0.appspot.com",
            messagingSenderId: "718132531498",
            appId: "1:718132531498:web:bd3b80bc90b0ac7e1bce53"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }

    backButtonEvent() {
        this.platform.backButton.subscribeWithPriority(0, () => {
            this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
                if (this.router.url != '/home') {
                    await this.location.back();
                } else if (this.router.url === '/home') {
                    if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
                        this.lastTimeBackPress = new Date().getTime();
                        this.presentAlertConfirm();
                    } else {
                        navigator['app'].exitApp();
                    }
                }
            });
        });
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            message: 'Quiter Easy News ?',
            buttons: [{
                text:'Non',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {}
            }, {
                text: 'Oui',
                handler: () => {
                    navigator['app'].exitApp();
                }
            }]
        });

        await alert.present();
    }

}
