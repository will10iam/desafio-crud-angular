import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Product } from './produto';
import { ProdutoService } from '../produto.service';

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
  ],
  standalone: true,
  templateUrl: './cadastro.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  product: Product = Product.newProduct();
  hoje: Date = new Date();

  constructor(private service: ProdutoService) {}

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
    console.log('Dados do Produto: ', this.product);
    this.service.salvar(this.product);
  }
}
