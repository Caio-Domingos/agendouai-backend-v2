import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Space, SpaceStatus } from './spaces.model';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('spaces')
export class SpacesEntity extends BaseEntity implements Space {
  @Column({
    type: 'enum',
    enum: SpaceStatus,
    default: SpaceStatus.ATIVO,
  })
  status?: SpaceStatus;

  @Column({ name: 'multiple_bookings', type: 'boolean', default: false })
  multipleBookings?: boolean;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @ManyToOne(() => CompaniesEntity)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;
}
