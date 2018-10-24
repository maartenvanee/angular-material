import { Joke } from './../../interfaces/joke.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'joketile',
    templateUrl: './joketile.component.html',
    styleUrls: ['./joketile.component.scss']
})
export class JokeTileComponent {
    @Input()
    public joke: Joke;

    public checked = false;
    public disabled = false;

    @Output()
    public onToggleFavorite: EventEmitter<Joke> = new EventEmitter();

    constructor() {}

    public toggleFavorite() {
        this.onToggleFavorite.emit(this.joke);
    }
}
