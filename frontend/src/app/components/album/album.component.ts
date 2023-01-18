import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AppMessageService, Album, Constants } from 'src/app/interfaces/app.common';
import { AlbumService } from 'src/app/services/app.common.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  entityDialog: boolean;
  createMode: boolean = false;
  deleteEntityDialog: boolean = false;
  uploadDialog: boolean=false;
  entities: Album[];
  entity: Album;
  submitted: boolean;
  cols: any[];
  rowsPerPageOptions = [5, 10, 20];
  entityTitle: string = 'Album';

  constructor(private mainService: AlbumService, private msgHandler: AppMessageService) { }

  ngOnInit() {
    this.readAll();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'foto', header: 'Foto' },
      { field: 'lanzamiento', header: 'Lanzamiento' },
    ];
  }

  getUploadUrl(): String {
    return Constants.API_ENDPOINT + 'api/foto/' + this.entity.id;
  }

  /**
   * Metodo para mostar todos los objetos activos
   */
  readAll(): void {
    this.mainService.readAll().subscribe((response: Album[]) => {
      this.entities = response;
    });
  }

  /**
   * Metodo para ejecutar las operaciones luego de una operacion
   * @param deleted Verifica si es accion de eliminado
   */
  postSuccess(deleted: boolean) {
    this.readAll();
    if (!deleted) {
      this.entityDialog = false;
    } else {
      this.deleteEntityDialog = false;
    }
    this.newEntity();
  }

  /**
   * Metodo para crear un nuevo objeto
   * @param obj Objeto a crear
   */
  create(obj: Album): void {
    this.mainService.create(obj)
      .pipe(
        catchError(err => {
          this.msgHandler.msgAddError(err.statusText);
          throw new Error(err);
        })
      )
      .subscribe(
        _res => {
          this.msgHandler.msgAddSuccess(this.entityTitle);
          this.postSuccess(false);
        });
  }

  /**
   * Metodo para eliminar un objeto
   * @param obj Objeto a eliminar
   */
  delete(obj: Album): void {
    this.mainService.delete(obj.id)
      .pipe(
        catchError(err => {
          console.error(err);
          this.msgHandler.msgDelError(err.statusText);
          throw new Error(err);
        })
      )
      .subscribe(
        _res => {
          this.msgHandler.msgDelSuccess(this.entityTitle);
          this.postSuccess(true);
        });
  }

  /**
   * Metodo para actualizar un objeto
   * @param id Llave del objeto
   * @param obj Objeto a modificar
   */
  update(obj: Album): void {
    this.mainService.update(obj.id, obj)
      .pipe(
        catchError(err => {
          console.error(err);
          this.msgHandler.msgUptError(err.statusText);
          throw new Error(err);
        })
      )
      .subscribe(
        _res => {
          this.msgHandler.msgUptSuccess(this.entityTitle);
          this.postSuccess(false);
        });
  }

  newEntity(): void {
    this.entity = {};
  }

  openNew() {
    this.newEntity();
    this.submitted = false;
    this.entityDialog = true;
    this.createMode = true;
  }

  editEntity(entity: Album) {
    this.entity = { ...entity };
    this.entityDialog = true;
    this.createMode = false;
  }

  deleteEntity(entity: Album) {
    this.deleteEntityDialog = true;
    this.entity = { ...entity };
  }

  uploadFoto(entity: Album) {
    this.uploadDialog = true;
    this.entity = { ...entity };
  }

  confirmDelete() {
    this.delete(this.entity);
  }

  hideDialog() {
    this.entityDialog = false;
    this.submitted = false;
    this.createMode = false;
  }

  hideUploadDialog() {
    this.uploadDialog = false;
    this.submitted = false;
    this.createMode = false;
    this.readAll();
  }

  saveEntity() {
    this.submitted = true;
    if (this.entity.nombre) {
      try {
        if (!this.createMode) {
          // @ts-ignore
          this.update(this.entity);
        } else {
          // @ts-ignore
          this.create(this.entity);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}