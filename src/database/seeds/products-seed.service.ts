import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../shared/database/entities/product.entity';
import { User } from '../../shared/database/entities/user.entity';

@Injectable()
export class ProductsSeedService {
  private readonly logger = new Logger(ProductsSeedService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Gera 20 produtos fictícios para testes
   */
  async seedProducts(): Promise<void> {
    this.logger.log('Iniciando seed de produtos...');

    // Verificar se já existem produtos
    const productsCount = await this.productRepository.count();

    if (productsCount > 0) {
      this.logger.log(`Já existem ${productsCount} produtos. Pulando seed.`);
      return;
    }

    // Buscar o usuário admin para ser o criador dos produtos
    const adminUser = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });

    if (!adminUser) {
      this.logger.error(
        'Usuário admin não encontrado. Execute o seed de usuários primeiro.',
      );
      return;
    }

    // Categorias de produtos para maior diversidade
    const categories = [
      { name: 'Eletrônicos', prefix: 'ELEC' },
      { name: 'Móveis', prefix: 'FURN' },
      { name: 'Livros', prefix: 'BOOK' },
      { name: 'Roupas', prefix: 'CLTH' },
      { name: 'Alimentos', prefix: 'FOOD' },
    ];

    // Array para armazenar os produtos a serem inseridos
    const products: Partial<Product>[] = [];

    // Gerar 20 produtos fictícios
    for (let i = 1; i <= 20; i++) {
      // Selecionar categoria aleatória
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      // Gerar preço aleatório entre 10 e 1500
      const price = parseFloat((Math.random() * 1490 + 10).toFixed(2));

      // Gerar estoque aleatório entre 0 e 100
      const stock = Math.floor(Math.random() * 101);

      // Gerar SKU único
      const sku = `${category.prefix}-${String(i).padStart(4, '0')}`;

      // Criar produto
      products.push({
        name: `${category.name} - Produto ${i}`,
        description: `Descrição detalhada para o produto ${i} da categoria ${category.name}. Este é um produto fictício para testes.`,
        price,
        stock,
        isActive: stock > 0, // Produtos sem estoque ficam inativos
        sku,
        creatorId: adminUser.id,
      });
    }

    // Inserir produtos no banco de dados
    await this.productRepository.save(products);

    this.logger.log(`${products.length} produtos foram criados com sucesso.`);
  }
}
