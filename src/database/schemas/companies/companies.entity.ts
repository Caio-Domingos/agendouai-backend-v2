import { Entity, Column, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Company, CompanyStatus } from './companies.model';
import { UserEntity } from '../user/user.entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity implements Company {
  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ nullable: true, name: 'trading_name' })
  tradingName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.ACTIVE,
  })
  status: CompanyStatus;

  @OneToMany(() => UserEntity, (user) => user.company)
  users: Relation<UserEntity[]>;
}
