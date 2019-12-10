import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCarrito } from 'src/app/Interfaces/carrito.module';
import { } from "../../Interfaces/carrito.module";
import { PedidoInicial, PedidoSiguiente, EncaPedido } from 'src/app/Interfaces/pedido';
import { GestionProductosService } from './../../services/gestion-productos.service';
import { CarritoUpdateService } from 'src/app/services/carrito-update.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  articulos: DetalleCarrito[] = [];
  articulosFiltrado: DetalleCarrito[] = [];
  PrecioTotal: string;
  PedInicial: PedidoInicial[] = [];
  PedSiguiente: PedidoSiguiente[] = [];
  IdArticulos: any;
  cantidadcarrito: any = 0;

  arti: DetalleCarrito[] = [];
  arti$: Observable<DetalleCarrito[]>;
  artiSubscription: Subscription;

  pedido: any[];
  detallepedido: any[];
  exito:number=0;


  PedidoCreado: any = [];

  closeResult: string;
  constructor(public auth: AuthService, private modalService: NgbModal, private Servicio: GestionProductosService, private CarritoService: CarritoUpdateService) { }

  ngOnInit() {
    console.log('Entte navbar');
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      this.cantidadcarrito = 0;
    } else {
      this.cantidadcarrito = localStorage.getItem('CantidadCarrito');
      this.PrecioTotal = localStorage.getItem('PrecioTotal');
    }

    // Obtengo el string previamente salvado y luego
    var guardado = localStorage.getItem("datos3");
    this.articulos = JSON.parse(guardado);
    //console.log("objetoObtenido: ", JSON.parse(guardado));

    this.arti$ = this.CarritoService.getItems$();
    //console.log(this.arti);
    this.artiSubscription = this.arti$.subscribe(arti => this.arti = arti);


    //this.pedido.push(this.EncaPedido(this.PrecioTotal, 'prueba'));






   // console.log("detalle pedido completo: ", JSON.stringify(datospedido));




  }


  ConfirmarComprar() {
    var guardado = localStorage.getItem("datos3");
    this.articulos = JSON.parse(guardado);
    console.log("objetoObtenido: ", JSON.parse(guardado));
    let cont = 0;
    let IdArticul = 0;
    // tslint:disable-next-line: forin
let precio=this.PrecioTotal;
    this.pedido={
      "total": 2500000,
      "usuario": "Julio Cesar",
      "fechaRegistro": null
      };

      // tslint:disable-next-line: align
     // this.pedido.push(this.EncaPedido(precio,'Julio'));
    let array:any = [];


    this.articulos.forEach(function (value) {
     let prueba={
      "idArticulo":value.idArticulo,
      "Cantidad":value.Cantidad
    }
      //         
      array.push(prueba);

          });
      this.detallepedido=array;
    let datospedido = {
      "pedido": this.pedido,
      "detallepedido": this.detallepedido
    };



    this.Servicio.CrearPedidoInicial( datospedido).subscribe((datos: {}) => {
      this.PedidoCreado = datos;
      IdArticul = this.IdArticulos;
      console.log(this.PedidoCreado);

      this.exito=1;
    });


  }

  CrearPedidoInicial(nombre, precio, cantidad, total, usuario): PedidoInicial {
    return {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      total: total,
      usuario: usuario
    };
  }

  CrearPedidoSiguiente(idPedido, nombre, precio, cantidad, total, usuario): PedidoSiguiente {
    return {
      idPedido: idPedido,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      total: total,
      usuario: usuario
    };
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openXl(content) { this.modalService.open(content, { size: 'xl' }); }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  DetPedido(idArticulo, Cantidad): any {
    return {
      idArticulo: idArticulo,
      Cantidad: Cantidad
    };
  }
  EncaPedido(total, usuario): EncaPedido {
    return {
      total: total,
      usuario: usuario,
      fechaRegistro: null
    };
  }

}
