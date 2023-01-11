import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AppCreateAttr {
    title: string;
    description: string;
}

@Table({tableName:"apps"})
export class App extends Model<App, AppCreateAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING})
    developer: string;
}