import { Table, Column, BelongsToMany } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';
import { RolesEntity } from '../role/roles.entity';
import { RolesPermissionsEntity } from '../roles-permissions/roles-permissions.entity';

@Table({ tableName: 'permissions' })
export class PermissionsEntity extends AbstractEntity {
  @Column
  name: string;

  @BelongsToMany(() => RolesEntity, () => RolesPermissionsEntity)
  roles: RolesEntity[];

  toJSON() {
    return instanceToPlain(this);
  }
}
