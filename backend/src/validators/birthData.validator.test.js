const { birthDataSchema } = require('./birthData.validator');

describe('Birth Data Validator', () => {
  it('should validate correct birth data', () => {
    const validData = {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      timeOfBirth: '14:30',
      location: 'New York, USA'
    };
    const result = birthDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid date format', () => {
    const invalidData = {
      name: 'John Doe',
      dateOfBirth: '01-01-1990', // invalid format
      timeOfBirth: '14:30',
      location: 'New York, USA'
    };
    const result = birthDataSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject missing required fields', () => {
    const result = birthDataSchema.safeParse({ name: 'John Doe' });
    expect(result.success).toBe(false);
  });
});
