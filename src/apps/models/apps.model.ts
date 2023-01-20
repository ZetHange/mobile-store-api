import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { AppTags } from 'src/tags/models/app-tags.model';
import { Tag } from 'src/tags/models/tags.model';

interface AppCreateAttr {
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: 'apps' })
export class App extends Model<App, AppCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  developer: string;

  @BelongsToMany(() => Tag, () => AppTags)
  tags: Tag[];
}
