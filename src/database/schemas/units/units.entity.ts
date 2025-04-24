import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Unit, UnitStatus } from './units.model';
import { CompanyEntity } from '../companies/companies.entity';
import { UserEntity } from '../user/user.entity';

@Entity('units')
export class UnitEntity extends BaseEntity implements Unit {
  @Column({ length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: UnitStatus,
    default: UnitStatus.ACTIVE,
  })
  status: UnitStatus;

  @Column({ name: 'company_id' })
  companyId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.units, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @OneToMany(() => UserEntity, (user) => user.unit, {
    cascade: true,
  })
  users: Relation<UserEntity[]>;
}
