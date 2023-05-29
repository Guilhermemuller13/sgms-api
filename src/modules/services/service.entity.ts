import { instanceToPlain } from 'class-transformer';
import { BelongsToMany, Column, ForeignKey, Table } from 'sequelize-typescript';

import { AbstractEntity } from '../common/models/abstract-entity';
import { MotorcyclesEntity } from '../motorcycles/motorcycles.entity';
import { ProductsEntity } from '../products/products.entity';
import { ServicesProductsEntity } from '../services-products/services-products.entity';

@Table({ tableName: 'services', paranoid: true })
export class ServiceEntity extends AbstractEntity {
  @Column
  description: string;

  @Column
  name: string;

  @ForeignKey(() => MotorcyclesEntity)
  @Column
  motorcycle_id: number;

  @BelongsToMany(() => ProductsEntity, () => ServicesProductsEntity)
  products: ProductsEntity[];

  toJSON() {
    return instanceToPlain(this);
  }
}
