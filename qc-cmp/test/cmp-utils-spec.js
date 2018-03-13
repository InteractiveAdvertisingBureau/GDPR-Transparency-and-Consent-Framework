import { isArray } from '../src/cmp-utils';

describe('CMP Utils', () => {
  it('should determine if the parameter is an array', function() {
    expect(isArray(null)).toBeFalsy();
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray([])).toBeTruthy();
    expect(isArray({ length: 0 })).toBeFalsy();
    expect(isArray([1, 2, 3])).toBeTruthy();
    expect(isArray({ 0: 1, length: 1 })).toBeFalsy();
  });
});
