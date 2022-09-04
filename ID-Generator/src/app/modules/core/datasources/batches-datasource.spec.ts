import { BatchService } from '../services/batch.service';
import { BatchesDatasource } from './batches-datasource';

describe('BatchesDatasource', () => {
  it('should create an instance', () => {
    expect(new BatchesDatasource()).toBeTruthy();
  });
});
