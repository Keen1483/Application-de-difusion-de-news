import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { News } from '../models/news';
import { countries } from '../models/countries';
import { Country } from '../models/Country';

/* FIREBASE IMPORTS */
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    newsSubject$ = new Subject<News[]>();
    newsArray: News[] = [];

    pays = countries;
    countryArray: Country[] = [];

    constructor(private httpClient: HttpClient) {
        this.getNews();
    }

    emitNews() {
        this.newsSubject$.next(this.newsArray);
    }

    /* TEST FIREBASE */
    saveNews() {
        firebase.database().ref('/news').set(this.newsArray);
    }

    async getNews() {
        await firebase.database().ref('/news')
            .on('value', (data: DataSnapshot) => {
                this.newsArray = data.val() ? data.val() : [];
                this.emitNews();
            });
    }

    getSingleNews(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/news/' + id).once('value')
                    .then(
                        (data: DataSnapshot) => {
                            resolve(data.val());
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    async createNewNews(newNews: News) {
        this.newsArray.push(newNews);
        await this.saveNews();
        this.emitNews();
    }

    async removeNews(news: News) {
        if (news.image) {
            const storageRef = await firebase.storage().refFromURL(news.image);
            storageRef.delete().then(
                () => {
                    console.log('imge removed');
                },
                (error) => {
                    console.log('Cloud not remove news! : ' + error);
                }
            );
        }
        const newsIndexToRemove = this.newsArray.findIndex(
            (newsEl) => {
                if (newsEl === news) {
                    return true;
                }
            }
        );
        this.newsArray.splice(newsIndexToRemove, 1);
        await this.saveNews()
        this.emitNews();
    }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueFileName = Date.now().toString();
                const upload = firebase.storage().ref()
                    .child('images/' + almostUniqueFileName + file.name)
                    .put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement…');
                    },
                    (error) => {
                        console.log('Erreur de chargement ! : ' + error);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }

  /* FOR PYTHON SERVER */
/*
  async addNews(news: News) {
    await this.getNewsFromServer();
    this.newsArray.push(news);
    await this.saveNewsToSver();
    this.emitNews();
  }

  saveNewsToSver() {
    this.httpClient
      .post('https://myapp-29fa0-default-rtdb.firebaseio.com/news.json', this.newsArray)
      .subscribe(
        () => {
          console.log('Save successfully !');
        },
        (error) => {
          console.log('Erreur de sauvegarde : ' + error);
        }
      );
  }

  getNewsFromServer() {
    this.httpClient
      .get<News[]>('https://myapp-29fa0-default-rtdb.firebaseio.com/news.json')
      .subscribe(
        (response) => {
          this.newsArray = response ? response : [];
          this.emitNews();
        },
        (error) => {
          console.log('Erreur of get news : ' + error);
        }
      );
  }*/
 
  /* Help me to save countries
  saveCountryToSever() {
    let i = 1;
    for (const [abv, name] of Object.entries(this.pays)) {
      const country = new Country(abv, name, '???', i);
      this.countryArray.push(country);
      i++;
    }

    this.httpClient
      .put('https://myapp-29fa0-default-rtdb.firebaseio.com/countries.json', this.countryArray)
      .subscribe(
        () =>{
          console.log(i-1 + ' countries save !');
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      );
  }*/
}
