import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  /**
   * Busca um usuário pelo ID
   */
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Busca um usuário pelo email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  /**
   * Busca um usuário pelo email incluindo a senha
   * Usado apenas para autenticação
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  /**
   * Atualiza o contador de tentativas de login
   */
  async updateLoginAttempts(id: string, attempts: number): Promise<void> {
    await this.usersRepository.update(id, { loginAttempts: attempts });
  }

  /**
   * Registra o último login bem-sucedido
   */
  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLogin: new Date(),
      loginAttempts: 0,
    });
  }
}
