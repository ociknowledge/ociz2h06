import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";

/**
 * Clase donde estan todas las constantes que maneja la aplición.
 */
export class Constants {
    public static APP_STATUS_ACTIVE: string = 'A';
    public static APP_DEFAULT_USER: string = 'system.evo';
    public static APP_TOAST_TIME: number = 8000;

    public static MODAL_TAMANO_PEQUENO: string = "40%";
    public static MODAL_TAMANO_MEDIANO: string = "60%";
    public static MODAL_TAMANO_GRANDE: string = "80%";

    public static MENSAJE_CONFIRMAR_ELIMINAR: string = 'Esta seguro que desea eliminar el registro?';
    public static MENSAJE_EXITO_CREAR: string = 'Registro creado exitosamente!';
    public static MENSAJE_EXITO_EDITAR: string = 'Registro actualizado exitosamente!';
    public static MENSAJE_EXITO_ELIMINAR: string = 'Registro eliminado exitosamente!';
    public static MENSAJE_ADVERTENCIA_SELECCION: string = 'Debes seleccionar un registro primero!';
    public static MENSAJE_TITULO_CONFIRMACION: string = 'Confirmación';
    public static MENSAJE_TITULO_CREAR: string = 'Crear';
    public static MENSAJE_TITULO_EDITAR: string = 'Actualizar';
    public static MENSAJE_TITULO_ELIMINAR: string = 'Eliminar';
    public static MENSAJE_TITULO_SELECCION: string = 'Seleccionar';
    public static MENSAJE_TITULO_SNACK_ERROR: string = 'Error';

    public static API_ENDPOINT: string = '/';

    public static HTTP_OPTIONS: any = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
            })
    };

    public static getMessageFromError(err: string): string {
        if (err.length > 500) {
            return err.substring(0, 500) + '...';
        } else {
            return err;
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class AppMessageService {
    life: number = 5000;
    constructor(private messageService: MessageService) { }

    msgAddError(err: string) {
        this.messageError('Creación', 'crear', err);
    }

    msgUptError(err: string) {
        this.messageError('Actualización', 'actualizar', err);
    }

    msgDelError(err: string) {
        this.messageError('Eliminación', 'eliminar', err);
    }

    msgAddSuccess(entity: string) {
        this.messageSuccess('Creación', 'creado', entity);
    }

    msgUptSuccess(entity: string) {
        this.messageSuccess('Actualización', 'actualizado', entity);
    }

    msgDelSuccess(entity: string) {
        this.messageSuccess('Eliminación', 'eliminado', entity);
    }

    /**
     * Metodo para mostrar los mesajes de exito luego de una operacion
     * @param title Titulo del mensaje
     * @param message Cuerpo del mensaje
     * @param entityTitle Entidad que representa el mensaje
     */
    private messageSuccess(title: string, message: string, entityTitle: string) {
        this.messageService.add({ severity: 'success', summary: `Exito en ${title}`, detail: `${entityTitle} ${message} exitosamente!`, life: this.life });
    }

    /**
     * Metodo para mostrar los mesajes de error luego de una operacion
     * @param title Titulo del mensaje
     * @param message Cuerpo del mensaje
     * @param error Mensaje de error
     */
    private messageError(title: string, message: string, error: String) {
        this.messageService.add({ severity: 'error', summary: `Error en ${title}`, detail: `Ocurrio un error al ${message} => ${error}!`, life: this.life });
    }
}

/**
 * Clase con operaciones basicas de CRUD.
 */
export class Crud<T> {
    protected readonly apiUrl = `${this.baseUrl}${this.uriComplement}`;
    constructor(
        protected readonly http: HttpClient,
        protected readonly uriComplement: string,
        protected readonly baseUrl: string = Constants.API_ENDPOINT
    ) { }

    create(body: T): Observable<T> {
        return this.http.post<T>(this.apiUrl, body);
    }

    delete(id: any): Observable<T> {
        const url = this.entityUrl(id);
        return this.http.delete<T>(url);
    }

    read(id: any): Observable<T> {
        const url = this.entityUrl(id);
        return this.http.get<T>(url);
    }

    readAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl);
    }

    update(id: any, body: T): Observable<T> {
        const url = this.entityUrl(id);
        return this.http.put<T>(url, body);
    }

    protected entityUrl(id: any): string {
        return [this.apiUrl, id].join('/');
    }
}

/**
 * Interfaz de la entidad: Genero
 */
export interface Genero {
    id?: number;
    nombre?: string;
}

/**
 * Interfaz de la entidad: Artista
 */
export interface Artista {
    id?: number;
    nombre?: string;
    nombreReal?: string;
    pais?: string;
}

/**
 * Interfaz de la entidad: Album
 */
export interface Album {
    id?: number;
    nombre?: string;
    foto?: string;
    fotoB64?: string;
    lanzamiento?: string;
}

/**
 * Interfaz de la entidad: Cancion
 */
export interface Cancion {
    id?: number;
    nombre?: string;
    genero_id?: number;
    genero_nombre?: string;
}