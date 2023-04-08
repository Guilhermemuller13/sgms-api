import { CreatedAt, UpdatedAt, Model, Column } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';

export abstract class AbstractEntity extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Exclude()
  @CreatedAt
  createdAt: Date;

  @Exclude()
  @UpdatedAt
  updatedAt: Date;
}
