import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application-json'
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
    return this.http.get(environment.EndPoint + '/Articulos' , httpOptions).pipe(
      map(this.ExtraerData)
    );
  }
}
