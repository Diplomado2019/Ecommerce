import { Component, OnInit } from '@angular/core';
import { GestionProductosService } from './../../services/gestion-productos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Informacion: any = [];
  Imagenes: any = [];
  ImagenesArti: any = [];
  constructor (private Servicio: GestionProductosService) {
    this.Informacion = [];
    this.ImagenesArti = [];
    this.Servicio.ListarArticulos().subscribe((datos: {} ) =>{
    this.Informacion = datos;

    // this.ImagenesArti =  this.Informacion.ImagenesArticulo;
    console.log('hola');
    console.log(this.ImagenesArti );

//     this.Imagenes =this.Informacion.ImagenesArticulo;
//     this.ImagenesArti=this.Imagenes[0];
// console.log('fff');

// console.log(this.ImagenesArti.Url);
    });
  }


  ngOnInit() {
  }

}
