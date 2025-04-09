import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { Product } from '../cadastro/produto';
import { ProdutoService } from '../produto.service';
import { CommonModule } from '@angular/common';
import {} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatGridListModule,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent implements OnInit {
  modoCard = false;
  nomeBusca: string = '';
  imagemBase64: string = '';
  listaProdutos: Product[] = [];
  colunasTable: string[] = [
    'foto',
    'id',
    'nome',
    'preco',
    'dataValidade',
    'descricao',
    'acoes',
  ];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private service: ProdutoService, private router: Router) {}

  ngOnInit() {
    this.listaProdutos = this.service.pesquisarProdutos('');
    this.listaProdutos.forEach((produto) => {
      if (
        produto.imagemBase64 &&
        !produto.imagemBase64.startsWith('data:image')
      ) {
        produto.imagemBase64 = 'data:image/png;base64,' + produto.imagemBase64;
      }
    });
  }

  pesquisar() {
    this.listaProdutos = this.service.pesquisarProdutos(this.nomeBusca);
  }

  preparaEditar(id: string | undefined) {
    if (!id) {
      console.error('Invalid product ID');
      return;
    }
    this.router.navigate(['/cadastro'], {
      queryParams: { id: id },
    });
  }

  preparaDeletar(produtos: Product) {
    produtos.deletando = true;
  }

  deletar(produto: Product) {
    this.service.deletar(produto);
    this.snack.open('Produto deletado com sucesso!', 'Fechar');
    this.listaProdutos = this.service.pesquisarProdutos('');
  }
}
