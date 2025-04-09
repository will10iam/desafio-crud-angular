# 🛒 App de Cadastro de Produtos (Angular + Angular Material)

Este projeto é uma aplicação web desenvolvida com **Angular** e **Angular Material**, que permite o **cadastro de produtos com imagem, nome, descrição e data de validade**, armazenando tudo localmente via `localStorage`.

O usuário pode alternar entre a visualização em **tabela** e em **cards com imagens**.

---

## 🚀 Funcionalidades

- ✅ Cadastro de produtos com nome, descrição, imagem e validade
- ✅ Upload e visualização da imagem do produto via `localStorage`
- ✅ Alternância entre **tabela** e **cards**
- ✅ Utilização de **Angular Material** para uma interface moderna e responsiva
- ✅ Armazenamento local dos dados (sem necessidade de backend)
- ✅ Validação de formulários

---

## 🛠️ Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- HTML5 + CSS3
- TypeScript
- localStorage (Web Storage API)

---

## 📸 Capturas de Tela

### Tela Principal do App

![Tela Principal](./src/assets/tela-principal.png)

### 🧾 Formulário de Cadastro

![Formulário](./src/assets/tela-cadastro.png)

### 📊 Visualização em Tabela

![Tabela de Produtos](./src/assets/tela-visual-tabela.png)

### 🖼️ Visualização em Cards

![Cards de Produtos](./src/assets/tela-visual-cards.png)

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── cadastro/          → Formulário de cadastro de produtos
│   │   ├── consulta/          → Exibição em cards e tabela
│   ├── produto.services.ts/   → Lógica para salvar/buscar produtos no localStorage
│   └── app.component.ts       → Componente principal
├── index.html
├── main.ts
└── styles.scss
```

---

## ⚙️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
ng serve
```

4. Acesse em: `http://localhost:4200`

---
## 🌐 Acesse a Aplicação Online

A aplicação está disponível online 👇

👉 [Desafio CRUD Angular](https://desafio-crud-angular.netlify.app/)

---

## 📌 Observações

- A aplicação é **totalmente front-end**, utilizando o navegador para armazenar os dados.
- O projeto serve como uma ótima base para testes com Angular Material, criação de formulários reativos e uso de `localStorage`.

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues, enviar PRs ou sugerir melhorias!

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
