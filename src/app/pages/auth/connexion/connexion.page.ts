import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

    signinForm: FormGroup;
    errorMessage: string;

    @Input() email: string = ' ';
    @Input() password: string = ' ';

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    onSubmit() {
        const email = this.signinForm.get('email').value;
        const password = this.signinForm.get('password').value;
        this.authService.signInUser(email, password).then(
            () => {
                this.router.navigate(['/books']);
            },
            (error) => {
                this.errorMessage = error;
                console.log('Wrong!');
            }
        );
    }

    onSignInWithGoogle() {
        this.authService.signInWithGoogle().then(
            () => {
                //this.router.navigate(['/books']);
                console.log('Sign in with Google successfully !');
            },
            (error) => {
                this.errorMessage = error;
                console.log('Sign in failed');
            }
        );
    }

    onSignInWithFacebook() {
        this.authService.signInWithFacebook().then(
            () => {
                //this.router.navigate(['/books']);
                console.log('Sign in with Facebbok successfully !');
            },
            (error) => {
                this.errorMessage = error;
                console.log('Sign in failed');
            }
        );
    }

}
