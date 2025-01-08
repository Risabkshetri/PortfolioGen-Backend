# Portfolio Builder - Backend

Express.js backend server for the Portfolio Builder platform, handling data management and authentication.

## 🔧 Features

- **User Management:** Secure user data handling
- **Portfolio Data Storage:** MongoDB integration
- **Image Management:** Cloudinary integration
- **Authentication:** Clerk integration
- **API Endpoints:** RESTful API design

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **File Storage:** Cloudinary

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/Risabkshetri/PortfolioGen-Backend.git
cd PorfrolioGen-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Start the server:
```bash
npm start
```

## 📡 API Endpoints

### Portfolios
- `GET /api/portfolios` - Get all portfolios
- `GET /api/portfolios/:id` - Get specific portfolio
- `POST /api/portfolios` - Create new portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── config/         # Configuration files
└── utils/          # Utility functions
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| MONGODB_URI | MongoDB connection string |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| CLERK_SECRET_KEY | Clerk secret key |
