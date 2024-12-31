const Portfolio = require('../models/PortfolioDetails');
const portfolioGenerator = require('../utils/generatePortfolio');

exports.generatedPortfolio = async (req, res) => {
  try {
    // Get portfolio data from database
    const {id} = req.params;
    const portfolio = await Portfolio.findOne({ userId: id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Generate portfolio files
    const templateName = 'professional'; // or get from query params
    const zipPath = await portfolioGenerator.generatePortfolio(templateName, portfolio.toObject());

    // Send ZIP file
    res.download(zipPath, 'portfolio.zip', async (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return res.status(500).json({ message: 'Error downloading portfolio' });
      }
      // Clean up temporary files
      await portfolioGenerator.cleanup(zipPath);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating portfolio' });
  }
};