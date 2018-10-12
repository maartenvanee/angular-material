import { ChuckNorrisService } from './../chucknorris.service';
import { Component, OnInit } from '@angular/core';
import { Joke } from '../interfaces/joke.interface';
import { JokeResponse } from '../interfaces/jokeresponse.interface';

@Component({
    selector: 'chucknorrispage',
    templateUrl: './chucknorrispage.component.html',
    styleUrls: ['./chucknorrispage.component.scss']
})
export class ChuckNorrisPageComponent implements OnInit {
    public randomJokes: Array<Joke> = [];
    public favoriteJokes: Array<Joke> = [];
    public addingFavorites = false;

    private interval: any;
    private maxFavJokes = 10;

    constructor(private chuckNorrisService: ChuckNorrisService) {}

    ngOnInit() {
        this.getStoredFavoriteJokes();
    }

    public getRandomJokes() {
        this.chuckNorrisService.getRandomJokes(10).subscribe(
            (response: JokeResponse) => {
                this.randomJokes = response.value;
            },
            (error: any) => {
                console.log('error: ', error);
            }
        );
    }

    public toggleFavorite(joke: Joke) {
        if (!joke.favorite) {
            this.addJokeToFavorites(joke);
        } else {
            this.removeJokeFromFavorites(joke);
        }
    }

    public toggleAddingFavorites() {
        if (!this.addingFavorites) {
            if (this.hasMaxFavorites()) {
                return;
            }
            if (this.favoriteJokes.length <= this.maxFavJokes - 2) {
                this.interval = setInterval(() => {
                    this.addRandomJokeToFavorites();
                }, 5000);
                this.addingFavorites = true;
            }
            this.addRandomJokeToFavorites();
        } else {
            clearInterval(this.interval);
            this.addingFavorites = false;
        }
    }

    public hasMaxFavorites(): boolean {
        return this.favoriteJokes.length >= this.maxFavJokes;
    }

    private getStoredFavoriteJokes() {
        const storedJokesJSON = localStorage.getItem('FavoriteJokes');
        if (storedJokesJSON) {
            const jokes = JSON.parse(storedJokesJSON);
            if (jokes.length) {
                this.favoriteJokes = jokes;
            }
        }
    }

    private addRandomJokeToFavorites() {
        this.chuckNorrisService.getRandomJokes(1).subscribe(
            (response: JokeResponse) => {
                const jokes: Array<Joke> = response.value;
                const joke: Joke = jokes[0];
                this.addJokeToFavorites(joke);
            },
            error => {
                console.log('error: ', error);
            }
        );
    }

    private addJokeToFavorites(joke: Joke) {
        if (this.hasMaxFavorites()) {
            return;
        }
        joke.favorite = true;
        this.randomJokes = this.randomJokes.filter(j => j !== joke);
        this.favoriteJokes.push(joke);
        this.updateLocalStorage();

        if (this.addingFavorites && this.hasMaxFavorites()) {
            this.toggleAddingFavorites();
        }
    }

    private removeJokeFromFavorites(joke: Joke) {
        this.favoriteJokes = this.favoriteJokes.filter(j => j !== joke);
        joke.favorite = false;
        this.randomJokes.push(joke);
        this.updateLocalStorage();
    }

    private updateLocalStorage() {
        const favsJson: string = JSON.stringify(this.favoriteJokes);
        localStorage.setItem('FavoriteJokes', favsJson);
    }
}
