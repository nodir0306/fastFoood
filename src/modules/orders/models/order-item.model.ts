import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Order } from './order-model';
import { User } from 'src/modules/users';



@Table({ tableName: 'order-items', timestamps: true })
export class OrderItem extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  total_price: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  order_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  user_id: number;
}
