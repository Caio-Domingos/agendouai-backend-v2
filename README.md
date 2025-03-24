# NPS Backend

Um backend moderno e robusto para aplicações de NPS (Net Promoter Score) usando tecnologias de ponta.

## 📋 Stack Tecnológica

- **Framework**: NestJS com TypeScript
- **ORM**: TypeORM para interação com banco de dados
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT com refresh tokens
- **API Docs**: Swagger/OpenAPI
- **Validação**: class-validator com DTOs
- **Containerização**: Docker e Docker Compose

## 🚀 Configuração Inicial

### Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nps-backend.git
cd nps-backend
```

### 2. Configuração do ambiente

Clone o arquivo de exemplo para criar seu arquivo de variáveis de ambiente local:

```bash
cp .env.example .env.local
```

> 💡 O arquivo `.env.example` já contém as configurações necessárias para funcionar com o Docker Compose.

### 3. Inicie o PostgreSQL com Docker

O projeto inclui um arquivo Docker Compose que configura automaticamente o PostgreSQL:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL utilizando as configurações do `.env.local`.

### 4. Instale as dependências

```bash
npm install
```

### 5. Popule o banco com dados iniciais

Para criar usuários de teste iniciais, todas as senhas são "Caio1234":

```bash
npm run seed:run
```

> ⚠️ Esse comando criará usuários padrão para testes. Em ambientes de produção, altere as senhas imediatamente.

### 6. Inicie a aplicação

```bash
npm run dev
```

## 📖 Documentação da API

O Swagger está disponível em:

```
http://localhost:3000/api/docs
```

Acesse esta URL para explorar interativamente todos os endpoints disponíveis, modelos de dados e testar as requisições.

## 📁 Estrutura do Projeto

```
src/
├── auth/                    # Autenticação e autorização
├── config/                  # Configurações da aplicação
├── database/                # Migrations, seeds e utilitários do BD
├── modules/                 # Módulos de recursos
├── shared/                  # Componentes compartilhados
└── main.ts                  # Ponto de entrada da aplicação
```

## 🔧 Scripts Úteis

- `npm run dev` - Inicia o servidor de desenvolvimento com hot-reload
- `npm run migration:generate -- -n MigrationName` - Gera uma nova migration
- `npm run migration:run` - Executa migrations pendentes
- `npm run migration:revert` - Reverte a última migration
- `npm run seed:run` - Popula o banco com dados iniciais
- `npm run db:clear` - Limpa os dados do banco

## 🔐 Autenticação

A API utiliza autenticação JWT. Para obter tokens:

1. Use o endpoint `/auth/login` com email e senha
2. Armazene o `access_token` e `refresh_token` retornados
3. Inclua o token em requisições como `Authorization: Bearer YOUR_TOKEN`
4. Use `/auth/refresh` com o refresh_token para obter novos tokens
