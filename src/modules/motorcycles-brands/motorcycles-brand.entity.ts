import { instanceToPlain } from 'class-transformer';
import { Column, Table } from 'sequelize-typescript';
import { AbstractEntity } from '../common/models/abstract-entity';

@Table({ tableName: 'motorcycles_brands' })
export class MotorcyclesBrandEntity extends AbstractEntity {
  @Column
  name: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
