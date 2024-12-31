const Portfolio = require('../models/PortfolioDetails');

exports.createPortfolio = async (req, res) => {
  try {
    const {userId, name, location, tagline, about, skills, aboutSkill, yearOfExperience, aboutImgUrl, socialLinks, projects, cv } = req.body;

    if (!userId || !name || !location || !tagline) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const existingPortfolio = await Portfolio.findOne({ userId });
    
    if (existingPortfolio) {
      return res.status(400).json({ message: 'Portfolio already exists' });
    }

    const portfolio = new Portfolio({
      userId,
      name,
      location,
      tagline,
      about,
      skills,
      aboutSkill,
      yearOfExperience,
      aboutImgUrl,
      socialLinks,
      projects,
      cv
    });

    await portfolio.save();
    res.status(201).json({ message: 'Portfolio created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating portfolio', error: error.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findById(userId);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};



exports.updatePortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body; // Extract only provided fields for the update

    const existingPortfolio = await Portfolio.findById(userId);
    if (!existingPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      userId,
      { $set: updateData }, // Only update fields provided in the request
      { new: true }         // Return the updated document
    );

    res.status(200).json({ message: 'Portfolio updated successfully', updatedPortfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio', error: error.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPortfolio = await Portfolio.findOne({ userId: id });
    if (!existingPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    await Portfolio.findOneAndDelete({ userId: id });
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting portfolio', error: error.message });
  }
}