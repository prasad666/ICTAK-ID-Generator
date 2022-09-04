export interface Batch {
  _id: string;
  batch_name: string;
  course: object;
  user: object;
  start_date: Date;
  end_date: Date;
  enabled: boolean;
  createdAt: Date;
}
