const { z } = require('zod');

const birthDataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, must be YYYY-MM-DD'),
  timeOfBirth: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format, must be HH:MM'),
  location: z.string().min(1, 'Location is required')
});

module.exports = {
  birthDataSchema
};
