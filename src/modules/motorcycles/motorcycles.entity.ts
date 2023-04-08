import { instanceToPlain } from 'class-transformer';
import { Column, Table } from 'sequelize-typescript';

import { AbstractEntity } from '../common/models/abstract-entity';

@Table({ tableName: 'motorcycles' })
export class MotorcyclesEntity extends AbstractEntity {
  @Column
  color: string;

  @Column
  year: string;

  @Column({ unique: true })
  license_plate: string;

  @Column
  engine_capacity: string;

  @Column
  brand: string;

  @Column
  name: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
