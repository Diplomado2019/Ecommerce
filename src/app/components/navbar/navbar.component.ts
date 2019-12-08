import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DetalleCarrito } from 'src/app/EnCarrito/carrito.module';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  articulos: DetalleCarrito[] = [];

  cantidadcarrito: any = 0;

  closeResult: string;
  constructor(public auth: AuthService,private modalService: NgbModal) {}

  ngOnInit() {
    console.log('Entte navbar');
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      this.cantidadcarrito = 0;
    } else {
      this.cantidadcarrito = localStorage.getItem('CantidadCarrito');
    }
    // console.log('cantidadnavbar sss+'+localStorage.getItem('CantidadCarrito'));
    // this.articulos$ = this.carritoService.getItems$();
    // console.log('cantidadnavbar+'+this.articulos);



    // this.articulosSubscription = this.articulos$.subscribe(articulos => this.articulos = articulos);
    // console.log('array articulos navbar'+this.articulosSubscription);

      // Obtengo el string previamente salvado y luego
      var guardado = localStorage.getItem("datos3");
      this.articulos=JSON.parse(guardado);
      console.log("objetoObtenido: ", JSON.parse(guardado));

  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
