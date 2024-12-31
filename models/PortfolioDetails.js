const mongoose = require('mongoose');


const portfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  tagline: { type: String, required: true },
  homePagePhoto: {type: String},
  about: { type: String, required: true },
  skills:  {type:Array, of:String, required: true} ,
  aboutSkill: { type: String, required: true },
  yearOfExperience: { type: Number, required: true, min: 0 },
  aboutImgUrl: {type: String},
  socialLinks: {
    facebook: String,
    twitter: String,
    github: String
  },
  projects: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    image:{type: String},
    link: { type: String, required: true }
  }],
  cv: { type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);