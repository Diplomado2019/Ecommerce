import { Component, OnInit } from '@angular/core';
import { GestionProductosService } from './../../services/gestion-productos.service';
import { Output, EventEmitter } from '@angular/core';
import { CarritoUpdateService } from "../../services/carrito-update.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();



  Informacion: any = [];
  Imagenes: any = [];
  ImagenesArti: any = [];
  constructor(private Servicio: GestionProductosService,private CarritoService: CarritoUpdateService) {
    this.Informacion = [];
    this.ImagenesArti = [];
    this.Servicio.ListarArticulos().subscribe((datos: {}) => {
      this.Informacion = datos;
      console.log('hola');
      console.log(this.ImagenesArti);

    });
    console.log("Cantidad home+"+localStorage.getItem('CantidadCarrito'));
  }

  SeleccionarId(idItem, Nombre, Descripcion, Precio) {
    localStorage.removeItem('IdArticulo');
    localStorage.setItem('IdArticulo', idItem);
    localStorage.setItem('Nombre', Nombre);
    localStorage.setItem('Descripcion', Descripcion);
    localStorage.setItem('Precio', Precio);
    console.log('item id:' + idItem);

    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
    }
  }


  AgregarACarrtito(idItem): void  {
    let cantidad = 0;

    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      cantidad = 0;
    } else {
      cantidad = Number(localStorage.getItem('CantidadCarrito')) + 1;
    }

    localStorage.setItem('CantidadCarrito', cantidad.toString());
    localStorage.setItem('CantidadCarrito2', localStorage.getItem('CantidadCarrito'));

    this.CarritoService.agregarItem(2);

  }
  ngOnInit() {
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');

    }
  }

}
