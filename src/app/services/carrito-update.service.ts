import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {DetalleCarrito  } from "../Interfaces/carrito.module";

@Injectable({
  providedIn: 'root'
})
export class CarritoUpdateService {

  private articulos: DetalleCarrito[];

  private articulos$: Subject<DetalleCarrito[]> = new Subject<DetalleCarrito[]>();


  getItems$(): Observable<DetalleCarrito[]> {
    return this.articulos$.asObservable();
  }


  agregarItem(items: DetalleCarrito) {
    this.articulos.push(items);
    this.articulos$.next(this.articulos);

  }


  nuevoArticulo(): DetalleCarrito {
    return {
      idArticulo: 0,
      NombreArticulo: '',
      Descripcion: '',
      Precio: 0,
      Cantidad: 0
    };
  }
  borrarIten(articulos: DetalleCarrito): void {
    for (let i = 0; i < this.articulos.length; i++) {
      if (articulos === this.articulos[i]) {
        this.articulos.splice(i, 1);
        break;
      }
    }
  }

  constructor() { }
}
