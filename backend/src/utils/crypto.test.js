const { encrypt, decrypt } = require('./crypto');

describe('Crypto Utility', () => {
  it('should encrypt and decrypt data successfully', () => {
    const originalText = 'Sensitive Birth Data 1990-01-01';
    const encrypted = encrypt(originalText);
    
    expect(encrypted).not.toBe(originalText);
    
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(originalText);
  });
});
