import { AgePipe } from './age.pipe';
import * as MockDate from 'mockdate';

describe('AgePipe', () => {
  const baseTime = new Date(2018, 2, 14);
  const dobStr = '1987-06-06';
  let pipe: AgePipe;

  beforeAll(() => {
    MockDate.set(baseTime);
    pipe = new AgePipe();
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns right age for a date string', () => {
    expect(pipe.transform(dobStr)).toBe(30);
  });
});
