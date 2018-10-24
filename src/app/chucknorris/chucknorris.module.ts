import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChuckNorrisService } from './chucknorris.service';
import { ChuckNorrisPageComponent } from './pages/chucknorrispage.component';
import { JokeListComponent } from './components/jokelist/jokelist.component';
import { JokeTileComponent } from './components/joketile/joketile.component';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule, HttpClientModule, MaterialModule
    ],
    declarations: [
        ChuckNorrisPageComponent, JokeListComponent, JokeTileComponent,
    ],
    exports: [
        ChuckNorrisPageComponent
    ],
    providers: [ChuckNorrisService],
})
export class ChuckNorrisModule { }
