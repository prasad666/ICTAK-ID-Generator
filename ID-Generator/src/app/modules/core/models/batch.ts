export interface Batch {
  _id: string;
  batch_name: string;
  course_id: string;
  user_id: string;
  course: object;
  user: object;
  start_date: Date;
  end_date: Date;
  enabled: boolean;
  createdAt: Date;
}
