🚀 Node.js HTTP & Routing Architecture

Aplicações robustas começam com uma base sólida. Este projeto explora o core do desenvolvimento de APIs com Node.js, focando na criação de rotas eficientes, gerenciamento de requisições HTTP e estruturação de servidores escaláveis.

📌 Funcionalidades 
Gerenciamento de Rotas: Implementação de rotas dinâmicas e estáticas para diferentes recursos da API.

Operações CRUD: Estrutura pronta para criação, leitura, atualização e exclusão de dados.

Validação de Entrada: Garantia de integridade dos dados recebidos via requisições HTTP.

Tratamento de Cookies: Persistência de contexto e identificação de usuário através de estratégias de cookies.

Ambiente Tipado: Uso integral de TypeScript para maior segurança e produtividade durante o desenvolvimento.

🛠 Tecnologias Utilizadas
Ferramenta                                      Descrição

Node.js                                         Ambiente de execução Javascript server-side.

TypeScript                                      Superset Javascript para tipagem estática
                                                detecção de erros em tempo de compilação.

Fastify                                         Framework web focado em performance e 
                                                baixo overhead.        

Zod                                             Biblioteca de declaração e validação de 
                                                esquemas para TypeScript.

Knex.js                                         Query builder SQL para manipulação eficiente de 
                                                bancos de dados.

🧠 Conceitos Aplicados

Arquitetura de Rotas

A aplicação utiliza uma estrutura modular de rotas, separando as responsabilidades de definição de caminhos da lógica de negócio. Isso permite que o servidor permaneça organizado e fácil de manter à medida que o projeto cresce.

Tratamento de Requisições HTTP

As requisições são processadas seguindo os padrões REST, utilizando corretamente os métodos (GET, POST, PUT, DELETE) e os códigos de status HTTP para fornecer respostas semânticas e claras ao cliente.

Validação de Dados

Através do Zod, todos os dados recebidos via params ou body são validados em tempo de execução. Isso evita falhas de segurança e inconsistências no banco de dados, garantindo que apenas informações no formato correto sejam processadas.

Persistência de Dados

O projeto utiliza o Knex.js para gerenciar a comunicação com o banco de dados. A implementação inclui o uso de Migrations para controle de versão do esquema do banco, garantindo que o ambiente de desenvolvimento seja replicável.

📂 Estrutura de Pastas Bash src/
 ├── database/     # Configurações e migrações do banco de dados
 ├── routes/       # Definição das rotas da API
 ├── @types/       # Definições de tipos globais do TypeScript
 ├── env/          # Esquemas de validação de variáveis de ambiente
 ├── app.ts        # Configuração do servidor e plugins
 └── server.ts     # Entry point da aplicação

🚀 Como Executar

Clone o repositório: 
Bash 
git clone https://github.com/Brunocosta18/rotas-e-https-com-nodejs.git
cd rotas-e-https-com-nodejs

Instale as dependências:
Bash
npm install

Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto seguindo o modelo do .env.example:BashDATABASE_CLIENT=sqlite
DATABASE_URL="./db/app.db"
PORT=3333

Execute as Migrations:
Bash
npm run knex -- migrate:latest

Inicie o servidor:
Bash
npm run dev

👨‍💻 Autor Desenvolvido por Bruno Costa junto ao Curso da Rocketseat 🚀 . Conecte-se comigo!