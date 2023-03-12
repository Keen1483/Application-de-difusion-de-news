import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/news';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.page.html',
  styleUrls: ['./short-news.page.scss'],
})
export class ShortNewsPage implements OnInit, OnDestroy {

    newsArray: News[];
    newsSubscription$: Subscription;

    constructor(private newsService: NewsService,
                private adminService: AdminService) {}

    ngOnInit() {
        this.newsSubscription$ = this.adminService.newsSubject$.subscribe(
            (news: News[]) => {
                this.newsArray = news;
            }
        );
    }

    ionViewWillEnter() {
        if (this.newsArray) {
            console.log('Its work from ionViewWillEnter !');
        } else {
            console.log('Something went wrong from ionViewWillEnter !');
        }
    }

    ngOnDestroy() {
        this.newsSubscription$.unsubscribe();
    }

}
