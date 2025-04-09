import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Product } from './produto';
import { ProdutoService } from '../produto.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    CommonModule,
    NgxMaskDirective,
  ],
  standalone: true,
  templateUrl: './cadastro.component.html',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  product: Product = Product.newProduct();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  hoje: Date = new Date();

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  previewUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.product.foto = reader.result as string;
        console.log(this.previewUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let produtoEncontrado = this.service.buscarProdutoPorId(id);
        if (produtoEncontrado) {
          this.atualizando = true;
          this.product = produtoEncontrado;
        }
      }
    });
  }

  salvar() {
    if (!this.product.dataValidade) {
      alert('Por favor, insira uma data de validade!');
      return;
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const validade = new Date(this.product.dataValidade);
    validade.setHours(0, 0, 0, 0);
    if (validade < hoje) {
      alert(
        'Data de validade inválida! Insira a data de hoje ou uma data futura.'
      );
      return;
    }

    if (!this.atualizando) {
      this.service.salvar(this.product);
      this.product = Product.newProduct();
      this.mostrarMensagem('Produto salvo com sucesso!');
    } else {
      this.service.atualizar(this.product);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Produto atualizado com sucesso!');
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK');
  }
}
