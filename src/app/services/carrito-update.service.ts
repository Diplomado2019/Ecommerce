import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DetalleCarrito } from '../EnCarrito/carrito.module';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class CarritoUpdateService {
  private carrito: number;

  private carrito$: Subject<number> = new Subject<number>();



  agregarItem(carrito: number) {
    
    this.carrito = carrito;
    this.carrito$.next(this.carrito);
  }

  getItems$(): Observable<number> {
    return this.carrito$.asObservable();
  }


  constructor() { }
}
