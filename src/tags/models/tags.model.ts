import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { App } from 'src/apps/models/apps.model';
import { AppTags } from './app-tags.model';

@Table({ tableName: 'tags', createdAt: false, updatedAt: false })
export class Tag extends Model<Tag> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => App, () => AppTags)
    apps: App[];
}
