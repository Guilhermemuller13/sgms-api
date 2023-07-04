import { Table, Column, BelongsToMany } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';
import { ServiceEntity } from '../services/service.entity';
import { ServicesProductsEntity } from '../services-products/services-products.entity';

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
  quantity_in_service: number;

  @Column
  status: boolean;

  @Column
  available: boolean;

  @Column
  photos?: string;

  @BelongsToMany(() => ServiceEntity, () => ServicesProductsEntity)
  services: ServiceEntity[];

  toJSON() {
    return instanceToPlain(this);
  }
}
