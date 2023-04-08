import { Table, Column } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';

@Table({ tableName: 'products' })
export class ProductsEntity extends AbstractEntity {
  @Column({ unique: true })
  code: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  brand: string;

  @Column
  price: string;

  @Column
  quantity: number;

  @Column
  quantity_minimum: number;

  @Column
  status: boolean;

  @Column
  available: boolean;

  @Column
  photos?: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
