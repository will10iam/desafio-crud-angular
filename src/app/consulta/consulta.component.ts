import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../cadastro/produto';
import { ProdutoService } from '../produto.service';
import { CommonModule } from '@angular/common';
import {} from '@angular/material/card';

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
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent implements OnInit {
  nomeBusca: string = '';
  listaProdutos: Product[] = [];
  colunasTable: string[] = [
    //'foto',
    'nome',
    'preco',
    'dataValidade',
    'descricao',
    'acoes',
  ];

  constructor(private service: ProdutoService) {}

  ngOnInit() {
    this.listaProdutos = this.service.pesquisarProdutos('');
  }

  pesquisar() {
    this.listaProdutos = this.service.pesquisarProdutos(this.nomeBusca);
  }
}
