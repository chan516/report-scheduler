import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum ReportStatus {
  active = 'Active',
  inactive = 'InActive',
  pending = 'Pending',
  achieved = 'Achieved',
}

export interface ReportAttributes {
  report_id: string;
  time: Date;
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
  time: Date;

  @Column({
    type: DataType.ENUM(...Object.values(ReportStatus)),
    allowNull: false,
  })
  status: ReportStatus;
}