import { Injectable } from '@angular/core';
import { Product } from './cadastro/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  static REPO_PRODUTOS = '_PRODUTOS';
  constructor() {}

  salvar(produto: Product) {
    const storage = this.obterStorage();
    storage.push(produto);

    localStorage.setItem(ProdutoService.REPO_PRODUTOS, JSON.stringify(storage));
  }

  pesquisarProdutos(nomeBusca: string): Product[] {
    const produtos = this.obterStorage();

    if (!nomeBusca) {
      return produtos;
    }

    return produtos.filter(
      (produto) => produto.nome?.indexOf(nomeBusca) !== -1
    );
  }

  private obterStorage(): Product[] {
    const repoProdutos = localStorage.getItem(ProdutoService.REPO_PRODUTOS);
    if (repoProdutos) {
      const produtos: Product[] = JSON.parse(repoProdutos);
      return produtos;
    }
    const produtos: Product[] = [];
    localStorage.setItem(
      ProdutoService.REPO_PRODUTOS,
      JSON.stringify(produtos)
    );
    return produtos;
  }
}
