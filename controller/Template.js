const Template = require('../models/Template');

exports.PostTemplate = async (req, res) => {
  try {
    const { tag, html, css, javascript } = req.body;

    // Input validation
    if (!html || !css || !javascript) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing template with the same content
    const existingTemplate = await Template.findOne({ tag, html, css, javascript });

    if (existingTemplate) {
      return res.status(400).json({ message: 'Template already exists!' });
    }

    const template = new Template({
      tag,
      html,
      css,
      javascript,
    });

    await template.save();

    res.status(201).json({ message: 'Template submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Error submitting template', error: error.message });
  }
};

exports.getTemplate = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error getting template:', error);
    res.status(500).json({ message: 'Error getting template', error: error.message });
  }
};