import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GestionProductosService } from './../../services/gestion-productos.service';
import { DetalleCarrito } from 'src/app/Interfaces/carrito.module';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  providers: [NgbCarouselConfig]
})
export class DetalleProductoComponent implements OnInit {

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  Informacion: any = [];
  Imagenes: any = [];
  ImagenesArti: any = [];


  constructor(config: NgbCarouselConfig, private Servicio: GestionProductosService) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.Informacion = [];
    this.ImagenesArti = [];
    this.Servicio.ListarArticulosXId(Number(localStorage.getItem('IdArticulo'))).subscribe((datos: {} ) =>{
    this.Informacion = datos;



    });

  }

  ContadorCarrito(Precio:number): void {
    let cantidad = 0;
    var PrecioTotal =0
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      cantidad = 0;
    } else {
      cantidad = Number(localStorage.getItem('CantidadCarrito')) + 1;
      PrecioTotal=Number(localStorage.getItem('PrecioTotal'))+Number(Precio);

    }

    localStorage.setItem('CantidadCarrito', cantidad.toString());
    localStorage.setItem('PrecioTotal', PrecioTotal.toString());

  }

  nuevoArticulo(idArticulo,NombreArticulo,Descripcion,Precio): void {

    this.ContadorCarrito(Precio);
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
  ngOnInit() {
  }

}
