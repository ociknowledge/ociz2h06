import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlbumComponent } from "./components/album/album.component";
import { ArtistaComponent } from "./components/artista/artista.component";
import { MainComponent } from "./components/main/main.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: MainComponent },
            { path: 'artista', component: ArtistaComponent },
            { path: 'albumes', component: AlbumComponent },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}