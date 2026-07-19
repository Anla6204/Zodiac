const request = require('supertest');
const app = require('../app');
const { decrypt } = require('../utils/crypto');

describe('Data Controller API', () => {
  it('should process valid birth data and return an encrypted chart', async () => {
    const validData = {
      name: 'Alice',
      dateOfBirth: '1992-05-15',
      timeOfBirth: '08:00',
      location: 'London'
    };
    
    const response = await request(app)
      .post('/api/birth-data')
      .send(validData);
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('chart');
    expect(response.body.data.chart).toHaveProperty('sunSign', 'Taurus');
    expect(response.body.data).toHaveProperty('shareToken');
    
    // Decrypt and verify
    const decryptedText = decrypt(response.body.data.shareToken);
  });

  it('should return 400 for invalid data', async () => {
    const invalidData = {
      name: 'Alice',
      dateOfBirth: '15-05-1992' // wrong format
    };
    
    const response = await request(app)
      .post('/api/birth-data')
      .send(invalidData);
      
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
  });
});
