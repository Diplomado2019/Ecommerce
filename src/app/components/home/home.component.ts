import { Component, OnInit } from '@angular/core';
import { GestionProductosService } from './../../services/gestion-productos.service';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoUpdateService } from "../../services/carrito-update.service";
import { DetalleCarrito } from "../../EnCarrito/carrito.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  DetalleCarro: DetalleCarrito;
  CategoriaSeleccionada: string = '';
  Informacion: any = [];
  Imagenes: any = [];
  ImagenesArti: any = [];
  Categorias: any = [];
  constructor(private Servicio: GestionProductosService, private CarritoService: CarritoUpdateService) {
    this.Informacion = [];
    this.ImagenesArti = [];


    this.CargarDatosIniciales();
    //Listar Categorias
    this.Servicio.ListarCategorias().subscribe((datos: {}) => {
      this.Categorias = datos;
    });

  }

  CargarDatosIniciales(): void {
    this.Servicio.ListarArticulos().subscribe((datos: {}) => {
      this.Informacion = datos;
      console.log('CategoriaSeleccionada:' + this.CategoriaSeleccionada);
      console.log(this.ImagenesArti);

    });
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


  ContadorCarrito(): void {
    let cantidad = 0;

    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      cantidad = 0;
    } else {
      cantidad = Number(localStorage.getItem('CantidadCarrito')) + 1;
    }

    localStorage.setItem('CantidadCarrito', cantidad.toString());
    //localStorage.setItem('CantidadCarrito2', localStorage.getItem('CantidadCarrito'));


  }

  ConsultarXCategoria(): void {


    if (this.CategoriaSeleccionada == '0') {
      this.CargarDatosIniciales();
    } else {
      this.Servicio.ListarImagenesXCategoria(this.CategoriaSeleccionada).subscribe((datos: {}) => {
        this.Informacion = datos;
        console.log('CategoriaSeleccionada:' + this.CategoriaSeleccionada);
      });
    }
  }

  ngOnInit() {
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');

    }
   // this.DetalleCarro = this.CarritoService.nuevoArticulo();
  }
  nuevoArticulo(idArticulo,NombreArticulo,Descripcion,Precio): void {

    this.ContadorCarrito();
    const arr = JSON.parse(localStorage.getItem('datos3')) || [];
    arr.push(this.CrearArticulo(idArticulo,NombreArticulo,Descripcion,Precio));
    localStorage.setItem('datos3',JSON.stringify( arr));

  }


  CrearArticulo(idArticulo,NombreArticulo,Descripcion,Precio): DetalleCarrito {
    return {
      idArticulo: idArticulo,
      NombreArticulo: NombreArticulo,
      Descripcion:Descripcion,
      Precio: Precio,
      Cantidad:1
    };
  }

}
