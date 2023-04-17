import Entity, { EntityAttributes } from "../../common/entity";
import {BelongsToMany, Column, DataType, HasMany, IsEmail, Table} from "sequelize-typescript";
import { Video } from "./video";
import {Follow} from "./follow";

export interface CreatorAttributes extends EntityAttributes {
    name: string,
    email: string,
}

export interface CreatorParams {
    name: string,
    email: string,
}

@Table({
    tableName: "creator",
    freezeTableName: true,
    timestamps: true
})
export class Creator extends Entity<CreatorAttributes, CreatorParams> {

    @Column(DataType.STRING)
    public name!: string;

    @IsEmail
    @Column(DataType.STRING)
    public email!: string;

    @HasMany(() => Video)
    public videos!: Video[];

    @BelongsToMany(() => Creator, () => Follow)
    public followers!: Creator[]

    @BelongsToMany(() => Creator, () => Follow)
    public following!: Creator[]

    public follow(): void {

    }

    public unfollow(): void {

    }

}
