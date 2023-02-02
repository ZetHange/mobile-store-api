import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { App } from 'src/apps/models/apps.model';
import { Tag } from './tags.model';

@Table({ tableName: 'app_tags', createdAt: false, updatedAt: false })
export class AppTags extends Model<AppTags> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => App)
  @Column({ type: DataType.INTEGER })
  appId: number;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tagsId: number;
}