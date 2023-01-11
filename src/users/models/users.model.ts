import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr {
    nickname: string;
    email: string;
    password: string;
}

@Table({ tableName: "users", createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    nickname: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}