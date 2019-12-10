export interface PedidoInicial {
        nombre: string;
        precio: number;
        cantidad: number;
        total: number;
        usuario: string;
}

export interface PedidoSiguiente {
  idPedido: number;
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
  usuario: string;
}


export interface EncaPedido {
  total: number;

    usuario: string;
    fechaRegistro: string;
}
