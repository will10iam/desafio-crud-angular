import { v4 as uuid } from 'uuid';

export class Product {
  id?: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  dataValidade?: string;
  foto?: string;
  imagemBase64?: string;
  deletando: boolean = false;

  static newProduct() {
    const product = new Product();
    product.id = uuid();
    return product;
  }
}
