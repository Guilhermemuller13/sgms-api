import { hash, compareSync } from 'bcryptjs';
import {
  Table,
  Column,
  BeforeCreate,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { IsEmail } from 'class-validator';
import { Exclude, instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';
import { RolesEntity } from '../role/roles.entity';

@Table({ tableName: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column
  @Exclude()
  password: string;

  @Column
  username: string;

  @Column
  status: boolean;

  @ForeignKey(() => RolesEntity)
  @Column
  role_id: number;

  @BelongsTo(() => RolesEntity)
  role: RolesEntity;

  @BeforeCreate
  static async hashPasswordBeforeUpdate(user: UserEntity) {
    user.password = await hash(user.password, 10);
  }

  comparePassword(attempt: string) {
    return compareSync(attempt, this.password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
