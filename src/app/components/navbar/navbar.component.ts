import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CarritoUpdateService } from '../../services/carrito-update.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  carrito:number;
  carrito$: Observable<number>;
  carritosSubscription: Subscription;

  cantidadcarrito: any = 0;
  constructor(public auth: AuthService, private carritoService: CarritoUpdateService) {



  }

  ngOnInit() {
    if (localStorage.getItem('CantidadCarrito') === null) {
      localStorage.setItem('CantidadCarrito', '0');
      this.cantidadcarrito = 0;
    } else {
      this.cantidadcarrito = localStorage.getItem('CantidadCarrito');
    }
    console.log('cantidadnavbar sss+'+localStorage.getItem('CantidadCarrito'));
    this.carrito$ = this.carritoService.getItems$();
    console.log('cantidadnavbar+'+this.carrito);
    this.carritosSubscription = this.carrito$.subscribe(carrito => this.carrito = carrito);
  }

}
