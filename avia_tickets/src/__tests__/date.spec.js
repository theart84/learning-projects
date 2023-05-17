import { formatDate } from "../js/helpers/date";

describe('formateDate', () => {
  it('check formate', () => {
    expect(formatDate(1577014368252, 'yyyy')).toBe('2019');
  });
});