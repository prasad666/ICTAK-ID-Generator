export interface Batch {
  _id: string;
  batch_name: string;
  course: string;
  user: string;
  start_date: string;
  end_date: string;
  enabled: boolean;
  createdAt: Date;
}
