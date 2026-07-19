const { generateNatalChart, getZodiacSign, simpleHash } = require('./astrologyEngine');

describe('Astrology Engine Service', () => {
  it('should calculate the correct Sun Sign', () => {
    expect(getZodiacSign('1990-03-25')).toBe('Aries');
    expect(getZodiacSign('1995-11-15')).toBe('Scorpio');
  });

  it('should generate a consistent hash', () => {
    const hash1 = simpleHash('TestHash');
    const hash2 = simpleHash('TestHash');
    expect(hash1).toBe(hash2);
  });

  it('should generate a natal chart with daily advice', () => {
    const data = {
      name: 'Test',
      dateOfBirth: '1990-01-01',
      timeOfBirth: '12:00',
      location: 'New York'
    };
    const chart = generateNatalChart(data);
    
    expect(chart).toHaveProperty('sunSign', 'Capricorn');
    expect(chart).toHaveProperty('moonSign');
    expect(chart).toHaveProperty('risingSign');
    
    expect(chart).toHaveProperty('dailyAdvice');
    expect(chart.dailyAdvice).toHaveProperty('love');
    expect(chart.dailyAdvice).toHaveProperty('career');
    expect(chart.dailyAdvice).toHaveProperty('family');
    expect(chart.dailyAdvice).toHaveProperty('growth');
    expect(chart.dailyAdvice).toHaveProperty('luckyColor');
    expect(chart.dailyAdvice).toHaveProperty('luckyNumber');
  });

  it('should generate different daily advice for same sun sign but different dates', () => {
    const data1 = { name: 'Person A', dateOfBirth: '2004-01-28', timeOfBirth: '12:00', location: 'HN' };
    const data2 = { name: 'Person B', dateOfBirth: '2004-02-06', timeOfBirth: '12:00', location: 'HN' };
    
    const chart1 = generateNatalChart(data1);
    const chart2 = generateNatalChart(data2);
    
    expect(chart1.sunSign).toBe('Aquarius');
    expect(chart2.sunSign).toBe('Aquarius');
    
    // Advice should be different because of the hyper-personalized hash
    expect(chart1.dailyAdvice.luckyNumber).not.toBe(chart2.dailyAdvice.luckyNumber);
  });
});
