export interface PedidoRequest {
  nome: string;
  endereco: string;
  valor: number;
  peso: number;
}

export interface PedidoResponse {
  id: number;
  nome: string;
  endereco: string;
  valor: number;
  peso: number;
  status: string;
}
