import { Table, Column, HasMany, BelongsToMany } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';
import { UserEntity } from '../users/users.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';
import { RolesPermissionsEntity } from '../roles-permissions/roles-permissions.entity';

@Table({ tableName: 'roles' })
export class RolesEntity extends AbstractEntity {
  @Column
  name: string;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @BelongsToMany(() => PermissionsEntity, () => RolesPermissionsEntity)
  permissions: PermissionsEntity[];

  toJSON() {
    return instanceToPlain(this);
  }
}
