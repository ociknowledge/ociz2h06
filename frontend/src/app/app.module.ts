import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppPrimeModule } from "./app.prime.module";
import { AlbumComponent } from './components/album/album.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AlbumComponent,
    AppComponent,
    ArtistaComponent,
    MainComponent,
  ],
  imports: [
    AppPrimeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
