<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Base Backend 2025

Base para projetos backend usando NestJS, TypeORM e PostgreSQL.

## Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- npm ou yarn

## Configuração do ambiente de desenvolvimento

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Inicie o banco de dados PostgreSQL usando Docker:
   ```bash
   docker-compose up -d
   ```
   Isso iniciará:
   - PostgreSQL em `localhost:5432`
   - pgAdmin em `localhost:5050` (email: admin@admin.com, senha: pgadmin)

5. Execute a aplicação:
   ```bash
   npm run start:dev
   ```

## Banco de dados

O projeto usa PostgreSQL através do TypeORM. Para administrar o banco de dados, você pode:

1. Usar o pgAdmin incluído em `http://localhost:5050`
2. Conectar-se diretamente usando as credenciais:
   - Host: localhost
   - Port: 5432
   - User: postgres
   - Password: postgres
   - Database: base_backend_2025

## Scripts

- `npm run start:dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia o servidor em modo de produção
- `npm run test` - Executa testes unitários
- `npm run test:e2e` - Executa testes end-to-end

## Estrutura do projeto

```
src/
├── config/               # Configurações da aplicação
├── shared/               # Recursos compartilhados
│   └── database/         # Configuração e entidades do banco de dados
│       ├── dto/          # DTOs base
│       ├── entities/     # Entidades base
│       └── interfaces/   # Interfaces para entidades
```

## Validação

O projeto utiliza um sistema de validação robusto baseado em `class-validator` e `class-transformer`:

### Características principais:

- **Validação automática** - Todas as requisições são validadas automaticamente usando ValidationPipe global
- **Whitelist** - Propriedades não definidas nos DTOs são automaticamente removidas
- **Transform** - Os dados de entrada são automaticamente convertidos para os tipos apropriados
- **DTOs tipados** - Todos os DTOs são definidos como classes com decoradores de validação
- **Mensagens personalizadas** - Mensagens de erro claras e em português

### Exemplos de uso:

```typescript
// DTO com validações
export class CreateUserDto {
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}

// Controller com validação automática
@Post()
create(@Body() createUserDto: CreateUserDto) {
  // createUserDto já está validado
  return this.userService.create(createUserDto);
}

// Validação de arrays
@Post('bulk')
createMany(
  @Body(new ParseArrayPipe({ items: CreateUserDto }))
  dtos: CreateUserDto[]
) {
  return this.userService.createMany(dtos);
}
```

## Migrations e Seeds

O projeto utiliza TypeORM para gerenciar o esquema do banco de dados através de migrations. As migrations permitem controlar todas as alterações no banco de dados de forma versionada.

### Scripts de Migrations

- `npm run migration:generate -- src/database/migrations/NomeDaMigration` - Gera uma nova migration baseada nas alterações das entidades
- `npm run migration:create -- src/database/migrations/NomeDaMigration` - Cria um arquivo de migration vazio
- `npm run migration:run` - Executa todas as migrations pendentes
- `npm run migration:revert` - Reverte a última migration aplicada
- `npm run migration:show` - Mostra o status das migrations (aplicadas/pendentes)
- `npm run seed:run` - Executa seeds para popular o banco com dados iniciais

### Ambiente de Produção

Em ambiente de produção, você deve:

1. **NUNCA** usar a opção `synchronize: true`
2. Sempre executar migrations para alterações no banco
3. Testar as migrations em um ambiente de staging antes de aplicar em produção

### API de Administração

As migrations também podem ser gerenciadas via API (apenas para administradores):

- `POST /admin/migrations/run` - Executa migrations pendentes
- `POST /admin/migrations/revert` - Reverte a última migration
- `GET /admin/migrations/pending` - Lista migrations pendentes
- `GET /admin/migrations/history` - Mostra histórico de migrations

## Documentação da API

O projeto utiliza Swagger para documentação automática da API. A documentação está disponível em:

```
http://localhost:3000/api/docs
```

### Características da documentação:

- **Geração automática**: Endpoints, parâmetros e modelos são automaticamente documentados
- **Interativa**: Você pode testar os endpoints diretamente pela interface do Swagger
- **Autenticação**: Suporte para autenticação JWT diretamente na interface
- **Organizada por tags**: Endpoints agrupados por domínio funcional

Para adicionar novos endpoints à documentação:

1. Use os decoradores do `@nestjs/swagger` nos controladores e DTOs:
   - `@ApiTags('tag')` - Agrupa endpoints por categoria
   - `@ApiOperation({ summary: '...' })` - Descreve o propósito do endpoint
   - `@ApiResponse({ status: x, description: '...' })` - Documenta respostas possíveis
   - `@ApiProperty()` - Documenta propriedades nos DTOs

2. Para endpoints autenticados, adicione:
   - `@ApiBearerAuth('JWT')` - Indica que o endpoint requer JWT

Exemplo:

```typescript
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll() {
    // ...
  }
}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
