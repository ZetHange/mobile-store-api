import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { UserRoles } from './user-roles.model';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
