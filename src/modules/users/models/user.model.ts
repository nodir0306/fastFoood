import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  phone: string;

  @Column({ type: DataType.TEXT, defaultValue: 'user-image.jpg' })
  image: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  email: string;
}
