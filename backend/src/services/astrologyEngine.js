const horoscopeRules = require('../data/horoscopeRules.json');

// Get Zodiac Sign based on Month and Day
function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// Simple deterministic hash based on a string
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Calculate the Numerology Root of a date string (YYYY-MM-DD)
function calculateNumerologyRoot(dateString) {
  const digits = dateString.replace(/\D/g, ''); // Extract only digits
  let sum = 0;
  for (const digit of digits) {
    sum += parseInt(digit, 10);
  }
  
  // Reduce to single digit, but keep master numbers 11, 22, 33
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    const tempDigits = String(sum).split('');
    sum = tempDigits.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return sum;
}

function generateNatalChart(birthData) {
  const sunSign = getZodiacSign(birthData.dateOfBirth);
  
  // For MVP moon/rising are mocked based on time/location hash
  const hashVal = simpleHash(birthData.name + birthData.timeOfBirth + birthData.location);
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  
  const moonSign = signs[hashVal % 12];
  const risingSign = signs[(hashVal + 3) % 12];

  // Categorized Advice Logic (Seed: Current Date + Exact Birth Date & Time + Category)
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const baseSeedStr = `${today}-${birthData.dateOfBirth}-${birthData.timeOfBirth}`;

  const loveHash = simpleHash(`${baseSeedStr}-love`);
  const careerHash = simpleHash(`${baseSeedStr}-career`);
  const familyHash = simpleHash(`${baseSeedStr}-family`);
  const growthHash = simpleHash(`${baseSeedStr}-growth`);
  
  const doHash = simpleHash(`${baseSeedStr}-do`);
  const dontHash = simpleHash(`${baseSeedStr}-dont`);
  
  // Categorized Advice Logic
  const dailyLove = horoscopeRules.love[loveHash % horoscopeRules.love.length];
  const dailyCareer = horoscopeRules.career[careerHash % horoscopeRules.career.length];
  const dailyFamily = horoscopeRules.family[familyHash % horoscopeRules.family.length];
  const dailyGrowth = horoscopeRules.growth[growthHash % horoscopeRules.growth.length];
  const dailyDo = horoscopeRules.dos[doHash % horoscopeRules.dos.length];
  const dailyDont = horoscopeRules.donts[dontHash % horoscopeRules.donts.length];
  
  // Astrological Authenticity (Numerology & Colors)
  const meta = horoscopeRules.signMeta[sunSign] || { colors: ["White"], numbers: [7] };
  const dailyHash = simpleHash(baseSeedStr);
  const dateNumerologyRoot = calculateNumerologyRoot(today);
  
  // Pick a base number based on the daily hash
  const baseNumber = meta.numbers[dailyHash % meta.numbers.length];
  
  // Mix base number with daily numerology root and limit to 1-9
  const rawLuckyNumber = baseNumber + dateNumerologyRoot;
  const luckyNumber = ((rawLuckyNumber - 1) % 9) + 1;
  
  // Pick power color based on the daily hash
  const luckyColor = meta.colors[(dailyHash + 2) % meta.colors.length];

  return {
    sunSign,
    moonSign,
    risingSign,
    dailyAdvice: {
      love: dailyLove,
      career: dailyCareer,
      family: dailyFamily,
      growth: dailyGrowth,
      do: dailyDo,
      dont: dailyDont,
      luckyColor,
      luckyNumber
    }
  };
}

module.exports = { generateNatalChart, getZodiacSign, simpleHash };
