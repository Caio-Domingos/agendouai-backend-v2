import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config({ path: '.env' });

// Caminho para arquivo .env alternativo (.env.local)
const envLocalPath = path.resolve(process.cwd(), '.env.local');
try {
  const envLocal = dotenv.config({ path: envLocalPath });
  // Se .env.local existe, suas variáveis sobrescrevem as do .env
  if (envLocal.parsed) {
    Object.assign(process.env, envLocal.parsed);
  }
} catch (error) {
  // Ignora erro se o arquivo não existir
}

// Configuração do DataSource para TypeORM
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // Alterado o caminho para colocar migrations em uma subpasta
  migrations: [__dirname + '/migrations/files/**/*{.ts,.js}'],
  synchronize: false, // NUNCA use synchronize: true em produção
  logging: process.env.NODE_ENV === 'development',
};

// Instância do DataSource (usado pelo CLI TypeORM e pelo módulo de migrations)
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
