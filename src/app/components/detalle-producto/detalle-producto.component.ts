import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GestionProductosService } from './../../services/gestion-productos.service';


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

  ngOnInit() {
  }

}
