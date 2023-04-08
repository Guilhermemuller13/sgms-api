import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';
import { RolesEntity } from '../role/roles.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';

@Table({ tableName: 'roles_permissions' })
export class RolesPermissionsEntity extends AbstractEntity {
  @ForeignKey(() => RolesEntity)
  @Column
  role_id: number;

  @ForeignKey(() => PermissionsEntity)
  @Column
  permission_id: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
