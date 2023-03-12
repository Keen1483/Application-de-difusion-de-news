import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-post',
  templateUrl: './ad-post.page.html',
  styleUrls: ['./ad-post.page.scss'],
})
export class AdPostPage implements OnInit {

    postForm: FormGroup;
    @Input() imageUrl: string;
    @Input() videoUrl: string;

    constructor(private formBuilder: FormBuilder,
                private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.postForm = this.formBuilder.group({
            image: [null, Validators.required],
            video: [null, Validators.required],
            description: ['', Validators.required],
            link: ['']
        });
    }

    onSubmit() {
        console.log(this.postForm.value);
        this.router.navigate(['/ad-audience']);
    }

    detectImage(event) {
        this.imageUrl = event.target.files[0];
        console.log(this.imageUrl);
    }

    detectVideo(event) {
        this.videoUrl = event.target.files[0];
        console.log(this.videoUrl);
    }

}
