import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { News } from '../../../models/news';
import { internet, lorem, date, random, image } from 'faker';

@Component({
  selector: 'app-form-short-news',
  templateUrl: './form-short-news.page.html',
  styleUrls: ['./form-short-news.page.scss'],
})
export class FormShortNewsPage implements OnInit {

    newsForm: FormGroup;
    fileIsUploading = false;
    fileUrl: string;
    fileUploaded = false;

    constructor(private adminService: AdminService,
              private formBuilder: FormBuilder) {

        //this.fakeNews();

    }

    ngOnInit() {
        this.initNewsForm();
    }

    initNewsForm() {
        this.newsForm = this.formBuilder.group({
            link: ['', Validators.required],
            category: ['', Validators.required],
            title: ['', Validators.required],
            text: ['', Validators.required],
            image: [null, Validators.required]
        });
    }

    async onSubmitForm() {
        const link = this.newsForm.get('link').value;
        const category = this.newsForm.get('category').value;
        const image = this.fileUrl;
        const title = this.newsForm.get('title').value;
        const text = this.newsForm.get('text').value;
        const createdAt = new Date();
        const newNews = new News(link, category, image, title, text, createdAt);

        await this.adminService.createNewNews(newNews);
    }

    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.adminService.uploadFile(file).then(
            (url: string) => {
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
            }
        );
    }

    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }

    async fakeNews() {

        for (const _ of Array.from({ length: 100 })) {
            const link = internet.url();
            const category = random.arrayElement(['economy, politic, health, sport, technology, education,                                          cinema, music, international']);
            const img = image.imageUrl();
            const title = lorem.sentence();
            const content = lorem.paragraph();
            const createdAt = date.future();
            const news = new News(link, category, img, title, content, createdAt);

            await this.adminService.createNewNews(news);
        }

        console.log('One hundred News save successfully!');
    }


  /*
  onSaveCountries() {
    this.adminService.saveCountryToSever();
  }*/

}
