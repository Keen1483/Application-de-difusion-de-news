import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { News } from '../models/news';
import { AdminService } from './admin.service';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnInit{

    newsSubject$ = new Subject<News[]>();
    private newsArray: News[] = [];

    constructor(private adminService: AdminService) {
        this.getNewsFromAdminService();
    }

    async getNewsFromAdminService() {
        this.newsArray = await this.adminService.newsArray;
        //await console.log(this.newsArray);
    }

    ngOnInit() {
    }

    emitNews() {
        this.newsSubject$.next(this.newsArray.slice());
    }

}
