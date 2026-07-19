const { birthDataSchema } = require('../validators/birthData.validator');
const { generateNatalChart } = require('../services/astrologyEngine');
const { encrypt } = require('../utils/crypto');

function processBirthData(req, res) {
  const parseResult = birthDataSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      errors: parseResult.error.issues
    });
  }

  const chart = generateNatalChart(parseResult.data);
  const encryptedChart = encrypt(JSON.stringify(chart));

  return res.status(200).json({
    success: true,
    data: {
      chart: chart,
      shareToken: encryptedChart
    }
  });
}

module.exports = { processBirthData };
