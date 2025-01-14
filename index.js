require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const server = express();

const portfolioRouter = require('./routes/PortfolioDetails');
const contacctRouter = require('./routes/Contact');
const templateRouter = require('./routes/Template');
const generatePortRouter = require('./routes/generatePortfolio');
const usrRouter = require('./routes/User');


// Database connection
main().catch(err => console.log('Database connection error:', err));

async function main() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URL is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
}


// Middleware setup 
server.use(express.json());
server.use(cors({
  origin: ['http://localhost:3000', 'https://portfolio.kshetriai.com'],
  credentials: true
}));

server.use(morgan('combined'));

server.use(express.static(path.join(__dirname, 'public')));

// Fallback for undefined routes
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// server.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'templates', 'Professional', 'index.html'));
// });

// Route handlingS
server.use('/api/user', usrRouter.router);
server.use('/api/portfolio', portfolioRouter.router);
server.use('/api/contact', contacctRouter.router);
server.use('/api/template', templateRouter.router)
server.use('/api/portfolio/download', generatePortRouter.router)


const port =  process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});