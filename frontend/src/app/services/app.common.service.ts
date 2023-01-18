import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album, Artista, Crud, Genero } from '../interfaces/app.common';

/**
 * Servicio para consumir la API de Generos
 */
@Injectable({
    providedIn: 'root'
})
export class GeneroService extends Crud<Genero> {
    constructor(protected override http: HttpClient) {
        super(http, 'api/genero');
    }
}

/**
 * Servicio para consumir la API de Artista
 */
@Injectable({
    providedIn: 'root'
})
export class ArtistaService extends Crud<Artista> {
    constructor(protected override http: HttpClient) {
        super(http, 'api/artista');
    }
}

/**
 * Servicio para consumir la API de Album
 */
@Injectable({
    providedIn: 'root'
})
export class AlbumService extends Crud<Album> {
    constructor(protected override http: HttpClient) {
        super(http, 'api/album');
    }
}
