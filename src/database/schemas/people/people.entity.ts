import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Person } from './people.model';
import { CompaniesEntity } from '../companies/companies.entity';
import { UserEntity } from '../users/users.entity';

@Entity('people')
@Index('IDX_PEOPLE_COMPANY', ['companyId'])
@Index('IDX_PEOPLE_CPF', ['cpf'], { unique: true })
@Index('IDX_PEOPLE_PHONE', ['phoneNumber'])
@Index('IDX_PEOPLE_CREATED_BY', ['createdBy'])
@Index('IDX_PEOPLE_UPDATED_BY', ['updatedBy'])
export class PeopleEntity extends BaseEntity implements Person {
  // Not null columns
  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  // Nullable columns
  @Column({ type: 'varchar', length: 20, nullable: true })
  cpf?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cep?: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address?: string;

  @Column({
    name: 'address_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  addressNumber?: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date;

  // FK columns
  // (companyId já está acima)

  // Relationships
  @ManyToOne(() => CompaniesEntity, (company) => company.people, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @OneToMany(() => UserEntity, (user) => user.person)
  users: Relation<UserEntity[]>;
}
