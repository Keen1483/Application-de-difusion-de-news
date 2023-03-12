import { Injectable } from '@angular/core';
import { AnUser } from '../models/an-user.model';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Array of annonym users
  private anUsers: AnUser[] = [
    new AnUser('Cameroun', 'Homme', 21, new Date())
  ];
  
  anUserSubject$ = new Subject<AnUser[]>();

  constructor(private httpClient: HttpClient) { }

  // informe toutes les parties du projet qu'un nouvel utilisateur s'est t'ajouté
  emitAnUsers() {
    this.anUserSubject$.next(this.anUsers.slice());
  }

  // Ajoute un nouvelle utilisateur au tableau des utilisateurs
  addAnUser(anUser: AnUser) {
    this.anUsers.push(anUser);
    this.emitAnUsers();
    console.log(this.anUsers);
  }

  /* Get countries whose name contains search term */
  searchCountries(term: string): Observable<string[]> {
    if (!term.trim()) {
      // if not search term, return empty country array.
      return of([]);
    }

    let countries: string[] = [];
    let countrySearch: string[] = [];
    let result: string[] = [];

    this.httpClient.get<Country[]>(`https://myapp-29fa0-default-rtdb.firebaseio.com/countries.json/?name=${term}`).subscribe(
      (response) => {
        //response = response.map(el => el.toLowerCase());
        for (const key of Object.keys(response)) {
          countries.push(response[key].name.toLowerCase());
        }
        countrySearch.push(countries.find(data => data.includes(term.toLowerCase())));
        for (let country of countrySearch) {
          result.push(this.capitalize(country));
        }
      }
    );

    return of(result);
  }

  capitalize(input) {  
    let CapitalizeWords = input.charAt(0).toUpperCase();  
    for (let i = 1; i <= input.length - 1; i++) {  
        let currentCharacter,  
            previousCharacter = input[i - 1];  
        if (previousCharacter && previousCharacter == ' ') {  
            currentCharacter = input[i].toUpperCase();  
        } else {  
            currentCharacter = input[i];  
        }  
        CapitalizeWords = CapitalizeWords + currentCharacter;  
    }  
    return CapitalizeWords;
  }
}
