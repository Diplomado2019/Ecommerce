import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PedidoInicial, PedidoSiguiente } from 'src/app/Interfaces/pedido';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application-json',
    'x-custom-header' : 'my custom header value',
            'Access-Control-Allow-Origin': 'my-origin.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GestionProductosService {

  constructor(private http: HttpClient ) { }
  private ExtraerData(response: Response){
    let body = response;
    console.log(body);
    return body || {};
  }
  ListarArticulos() {
    return this.http.get(environment.EndPoint + '/Articulo' , httpOptions).pipe(
      map(this.ExtraerData)
    );
  }
  ListarArticulosXId(id: number) {
    return this.http.get(environment.EndPoint + '/Articulo/'+ id , httpOptions).pipe(
      map(this.ExtraerData)
    );
  }

  ListarCategorias() {
    return this.http.get(environment.EndPoint + '/Categoria' , httpOptions).pipe(
      map(this.ExtraerData)
    );
  }

  ListarImagenesXCategoria(id: string) {
    return this.http.get(environment.EndPoint + '/ArticulosXCategoria/'+ id , httpOptions).pipe(
      map(this.ExtraerData)
    );
  }


  CrearPedidoInicial(datos) {
    return this.http.post(environment.EndPoint + '/Pedido', datos ).pipe(
      map(this.ExtraerData)
    );
  }

  CrearPedidoSiguiente(DatosNext: PedidoSiguiente[]) {
    return this.http.post(environment.EndPoint + '/Pedido',DatosNext[0] ).pipe(
      map(this.ExtraerData)
    );
  }
}
