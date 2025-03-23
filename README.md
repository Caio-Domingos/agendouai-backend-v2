<<<<<<< HEAD
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
=======
# Base Backend 2025

Uma base robusta para aplicações backend usando NestJS, TypeORM e PostgreSQL, pronta para uso em projetos de médio a grande porte.

## 📋 Características

- ✅ Arquitetura NestJS moderna com TypeScript
- ✅ PostgreSQL com TypeORM (migrations, seeds, entidades)
- ✅ Sistema de autenticação JWT completo com refresh tokens
- ✅ Autorização baseada em papéis (RBAC)
- ✅ CRUD genérico com hooks de personalização
- ✅ Sistema de consultas avançadas (filtros, paginação, ordenação)
- ✅ Tratamento de erros global e padronização de respostas
- ✅ Gerenciamento de transações
- ✅ Docker e Docker Compose para desenvolvimento
- ✅ Swagger/OpenAPI para documentação da API
- ✅ Validação automática com DTOs
- ✅ Exemplos completos incluídos

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- npm ou yarn

### Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/base-backend-2025.git
   cd base-backend-2025
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` conforme necessário.

4. Inicie o banco de dados PostgreSQL:

   ```bash
   docker-compose up -d
   ```

5. Execute as migrations:

   ```bash
   npm run migration:run
   ```

6. Popule o banco com dados iniciais:

   ```bash
   npm run seed:run
   ```

7. Inicie a aplicação:

   ```bash
   npm run start:dev
   ```

8. Acesse a documentação Swagger:
   ```
   http://localhost:3000/api/docs
   ```

## 📁 Estrutura do Projeto

```
src/
├── auth/                    # Autenticação e autorização
├── config/                  # Configurações da aplicação
├── database/                # Migrations, seeds e utilitários de BD
├── modules/                 # Módulos de recursos (produtos, etc.)
├── plugins/                 # Plugins da aplicação (Swagger, etc.)
├── shared/                  # Componentes compartilhados
│   ├── crud/                # Sistema CRUD genérico
│   ├── database/            # Entidades, DTOs e repositórios base
│   ├── interceptors/        # Interceptores (transações, respostas)
│   ├── swagger/             # Utilitários para Swagger
│   └── validation/          # Validadores e transformadores
├── users/                   # Módulo de usuários
├── app.module.ts            # Módulo principal da aplicação
└── main.ts                  # Ponto de entrada da aplicação
```

## 🔧 Guias de Uso

### 1. Criando um Novo Módulo de Recurso

Para criar um novo recurso (ex: "orders"), siga estes passos:

1. **Crie a estrutura de pastas**:

   ```
   src/modules/orders/
   ├── dto/
   ├── entities/
   ├── repositories/
   ├── orders.controller.ts
   ├── orders.service.ts
   └── orders.module.ts
   ```

2. **Crie a entidade**:

   ```typescript
   // src/shared/database/entities/order.entity.ts
   import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
   import { BaseEntity } from './base.entity';
   import { User } from './user.entity';

   @Entity('orders')
   export class Order extends BaseEntity {
     @Column({ length: 100 })
     reference: string;

     @Column({ type: 'decimal', precision: 10, scale: 2 })
     total: number;

     @Column({ name: 'user_id' })
     userId: string;

     @ManyToOne(() => User)
     @JoinColumn({ name: 'user_id' })
     user: User;
   }
   ```

3. **Crie os DTOs**:

   ```typescript
   // src/shared/database/dto/order.dto.ts
   import { ApiProperty } from '@nestjs/swagger';
   import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
   import { BaseDto } from './base.dto';
   import { BaseCreateDto } from './base-create.dto';
   import { PartialType } from '../../validation/dto-helpers';

   // DTO para exibição
   export class OrderDto extends BaseDto {
     @ApiProperty()
     reference: string;

     @ApiProperty()
     total: number;

     @ApiProperty()
     userId: string;
   }

   // DTO para criação
   export class CreateOrderDto extends BaseCreateDto {
     @ApiProperty()
     @IsNotEmpty()
     @IsString()
     reference: string;

     @ApiProperty()
     @IsNotEmpty()
     @IsNumber()
     total: number;

     @ApiProperty()
     @IsNotEmpty()
     @IsString()
     userId: string;
   }

   // DTO para atualização
   export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
   ```

4. **Crie o repositório**:

   ```typescript
   // src/modules/orders/repositories/order.repository.ts
   import { Injectable, Scope, Inject } from '@nestjs/common';
   import { DataSource } from 'typeorm';
   import { REQUEST } from '@nestjs/core';
   import { Request } from 'express';
   import { CrudQueryRepository } from '../../../shared/database/repositories/crud-query.repository';
   import { Order } from '../../../shared/database/entities/order.entity';
   import {
     CreateOrderDto,
     UpdateOrderDto,
   } from '../../../shared/database/dto/order.dto';

   @Injectable({ scope: Scope.REQUEST })
   export class OrderRepository extends CrudQueryRepository<
     Order,
     CreateOrderDto,
     UpdateOrderDto
   > {
     constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
       super(dataSource, request, Order, 'order');
     }

     // Métodos personalizados aqui
   }
   ```

5. **Crie o serviço**:

   ```typescript
   // src/modules/orders/orders.service.ts
   import { Injectable } from '@nestjs/common';
   import { OrderRepository } from './repositories/order.repository';
   import { Order } from '../../shared/database/entities/order.entity';
   import {
     CreateOrderDto,
     UpdateOrderDto,
   } from '../../shared/database/dto/order.dto';

   @Injectable()
   export class OrdersService {
     constructor(private orderRepository: OrderRepository) {}

     async findAll(): Promise<Order[]> {
       return this.orderRepository.findAll();
     }

     async findOne(id: string): Promise<Order> {
       return this.orderRepository.findById(id);
     }

     async create(createDto: CreateOrderDto): Promise<Order> {
       return this.orderRepository.create(createDto);
     }

     async update(id: string, updateDto: UpdateOrderDto): Promise<Order> {
       return this.orderRepository.update(id, updateDto);
     }

     async remove(id: string): Promise<void> {
       return this.orderRepository.remove(id);
     }
   }
   ```

6. **Crie o controller**:

   ```typescript
   // src/modules/orders/orders.controller.ts
   import {
     Controller,
     UseInterceptors,
     ClassSerializerInterceptor,
   } from '@nestjs/common';
   import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
   import { CrudController } from '../../shared/crud/controllers/crud.controller';
   import { Order } from '../../shared/database/entities/order.entity';
   import {
     CreateOrderDto,
     UpdateOrderDto,
     OrderDto,
   } from '../../shared/database/dto/order.dto';
   import { OrdersService } from './orders.service';

   @ApiTags('orders')
   @Controller('orders')
   @UseInterceptors(ClassSerializerInterceptor)
   @ApiBearerAuth('JWT')
   export class OrdersController extends CrudController<
     Order,
     typeof CreateOrderDto,
     typeof UpdateOrderDto,
     typeof OrderDto
   >('pedido', CreateOrderDto, UpdateOrderDto, OrderDto) {
     constructor(private readonly ordersService: OrdersService) {
       super(ordersService);
     }

     // Métodos adicionais/personalizados aqui
   }
   ```

7. **Crie o módulo**:

   ```typescript
   // src/modules/orders/orders.module.ts
   import { Module } from '@nestjs/common';
   import { OrdersController } from './orders.controller';
   import { OrdersService } from './orders.service';
   import { OrderRepository } from './repositories/order.repository';

   @Module({
     controllers: [OrdersController],
     providers: [OrdersService, OrderRepository],
     exports: [OrdersService],
   })
   export class OrdersModule {}
   ```

8. **Importe o módulo no app.module.ts**:

   ```typescript
   import { OrdersModule } from './modules/orders/orders.module';

   @Module({
     imports: [
       // ... outros imports
       OrdersModule,
     ],
     // ... resto do módulo
   })
   export class AppModule {}
   ```

### 2. Utilizando o Sistema de Autenticação

#### Login e Tokens

```typescript
// Exemplo de uso de login
async login(username, password) {
  const response = await axios.post('/auth/login', {
    email: username,
    password: password
  });

  // Resposta contém access_token, refresh_token e informações do usuário
  const { accessToken, refreshToken, user } = response.data;

  // Guardar tokens para uso posterior
  localStorage.setItem('accessToken', accessToken);
}

// Exemplo de renovação de token
async refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios.post('/auth/refresh', {
    refreshToken
  });

  const { accessToken, refreshToken: newRefreshToken } = response.data;

  // Atualizar tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
}
```

#### Proteção de Rotas

```typescript
// Controller com diferentes níveis de proteção
@Controller('example')
export class ExampleController {
  // Rota pública - não requer autenticação
  @Public()
  @Get('public')
  publicRoute() {
    return { message: 'Esta rota é pública' };
  }

  // Rota protegida - requer autenticação
  @Get('authenticated')
  authenticatedRoute() {
    return { message: 'Usuário autenticado' };
  }

  // Rota com restrição de papel - apenas admins
  @Roles(Role.ADMIN)
  @Get('admin')
  adminRoute() {
    return { message: 'Apenas para administradores' };
  }
}
```

### 3. Usando Transações

#### Método 1: Via Interceptor no Controller

```typescript
@Post()
@UseInterceptors(TransactionInterceptor)
async createWithRelated(
  @Body() dto: CreateComplexDto,
  @TransactionManager() manager: EntityManager,
) {
  // Passar o EntityManager para o serviço
  return this.service.createComplex(dto, manager);
}
```

#### Método 2: Via TransactionService no Service

```typescript
@Injectable()
export class ComplexService {
  constructor(private transactionService: TransactionService) {}

  async createWithTransaction(dto: CreateDto): Promise<Entity> {
    return this.transactionService.executeInTransaction(async (manager) => {
      // Todas as operações aqui compartilham a mesma transação
      const entity1 = manager.create(Entity1, dto.entity1);
      await manager.save(entity1);

      const entity2 = manager.create(Entity2, {
        ...dto.entity2,
        entity1Id: entity1.id,
      });
      await manager.save(entity2);

      return entity1;
    });
  }
}
```

#### Método 3: Via Repositórios com Transação Automática

```typescript
// No controller
@Post()
@UseInterceptors(TransactionInterceptor)
async create(@Body() dto: CreateDto) {
  // O TransactionInterceptor injeta automaticamente
  // o EntityManager no request, e o repositório o utiliza
  return this.service.create(dto);
}

// No service que usa repositório
async create(dto: CreateDto): Promise<Entity> {
  // O repositório detecta automaticamente a transação do request
  return this.repository.create(dto);
}
```

### 4. Consultas Avançadas

#### Filtros Simples

```typescript
// GET /products?filters=[{"field":"price","operator":"gt","value":100}]
// No service:
return this.repository.findWithOptions({
  filters: [
    { field: 'price', operator: FilterOperator.GREATER_THAN, value: 100 },
  ],
});
```

#### Filtros Complexos

```typescript
// GET /products com filtro complexo
// No service:
return this.repository.findWithOptions({
  filters: [
    {
      operator: LogicalOperator.OR,
      filters: [
        {
          field: 'category',
          operator: FilterOperator.EQUALS,
          value: 'electronics',
        },
        {
          operator: LogicalOperator.AND,
          filters: [
            { field: 'price', operator: FilterOperator.LESS_THAN, value: 100 },
            { field: 'stock', operator: FilterOperator.GREATER_THAN, value: 0 },
          ],
        },
      ],
    },
  ],
});
```

#### Paginação e Ordenação

```typescript
// GET /products?page=2&size=10&orderBy=price:DESC
// No service:
return this.repository.findWithOptions({
  pagination: { page: 2, size: 10 },
  order: { field: 'price', direction: OrderDirection.DESC },
});
```

#### Com Relacionamentos

```typescript
// GET /products?relations=category,creator
// No service:
return this.repository.findWithOptions({
  relations: [
    { path: 'category', alias: 'category' },
    { path: 'creator', alias: 'creator' },
  ],
});
```

## 📝 TODO - Como Adicionar Novos Recursos

1. **Entidades e DTOs**:

   - Crie uma entidade em `src/shared/database/entities/`
   - Crie DTOs em `src/shared/database/dto/`
   - Relacione com outras entidades conforme necessário

2. **Migration**:

   - Gere uma migration para a nova entidade:

   ```bash
   npm run migration:generate -- -n CreateMyEntityTable
   ```

3. **Repositório**:

   - Crie um repositório que estenda `CrudQueryRepository`
   - Adicione métodos personalizados conforme necessário

4. **Serviço**:

   - Implemente um serviço que use o repositório
   - Adicione lógica de negócios específica

5. **Controller**:

   - Crie um controller que estenda `CrudController`
   - Ou crie um controller personalizado se necessário

6. **Módulo**:

   - Crie um módulo que registre controller, serviço e repositório
   - Importe o módulo no `AppModule`

7. **Seeds (opcional)**:
   - Adicione dados iniciais em `src/database/seeds/`

## 🔑 Convenções e Boas Práticas

1. **Nomenclatura**:

   - Entidades: singular (User, Product)
   - Controladores, serviços, módulos: plural (UsersController, ProductsService)
   - DTOs: propósito + entidade (CreateUserDto, UpdateProductDto)

2. **Estrutura de Arquivos**:

   - Cada módulo em uma pasta separada
   - Para módulos simples: controller, service, module em arquivos separados
   - Para módulos complexos: subpastas para controllers, services, etc.

3. **Injeção de Dependência**:

   - Use sempre constructor injection
   - Torne as dependências privadas e readonly

4. **Tratamento de Erros**:

   - Use exceções HTTP do NestJS (NotFoundException, BadRequestException, etc.)
   - Valide dados de entrada usando DTOs e class-validator

5. **Transações**:

   - Use o TransactionInterceptor para operações que exigem consistência
   - Ou TransactionService para lógica mais complexa

6. **Segurança**:
   - Proteja rotas com @Roles() para controle de acesso
   - Use @Public() apenas quando necessário
>>>>>>> f1ba7d12bf7316417667175c3a006a4e9363c5eb
