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

  atualizar(produto: Product) {
    const storage = this.obterStorage();
    storage.forEach((c) => {
      if (c.id === produto.id) {
        Object.assign(c, produto);
      }
    });
    localStorage.setItem(ProdutoService.REPO_PRODUTOS, JSON.stringify(storage));
  }

  deletar(produto: Product) {
    const storage = this.obterStorage();
    const novaLista = storage.filter((c) => c.id !== produto.id);
    localStorage.setItem(
      ProdutoService.REPO_PRODUTOS,
      JSON.stringify(novaLista)
    );
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

  buscarProdutoPorId(id: string): Product | undefined {
    const produtos = this.obterStorage();
    return produtos.find((produto) => produto.id === id);
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
