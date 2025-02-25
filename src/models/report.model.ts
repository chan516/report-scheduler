import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum ReportStatus {
  active = 'Active',
  inactive = 'InActive',
  pending = 'Pending',
  achieved = 'Achieved',
}

export interface ReportAttributes {
  report_id: string;
  date: Date;
  status: ReportStatus;
}

@Table({ tableName: 'reports' })
export default class Report extends Model implements ReportAttributes {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  report_id: string;

  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.ENUM('InActive', 'Active', 'Pending', 'Achieved'))
  status: ReportStatus;
}