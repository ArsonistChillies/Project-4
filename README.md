# 🌱 GardenHub Forum

A full-stack forum application built with a 3-tier architecture, focused on gardening topics. Users can register, log in, ask questions, and share answers within organized gardening categories.

## 🎯 Application Theme

**GardenHub** is a community-driven forum for gardening enthusiasts. The application organizes discussions into six main categories:

1. **Flowers & Ornamentals** - Roses, tulips, daisies, and flowering plants
2. **Vegetables & Herbs** - Vegetable gardens and herb growing techniques
3. **Trees & Shrubs** - Woody plants, fruit trees, and landscape design
4. **Indoor Plants** - Houseplants, succulents, and tropical plants
5. **Gardening Techniques** - Composting, soil improvement, and sustainable practices
6. **Pest & Disease Management** - Plant health and treatment methods

## 🏗️ Architecture

This application follows a **3-Tier Architecture**:

### 1. Presentation Layer (Client)
- **Technology**: React.js (Single Page Application)
- **Location**: `/client` folder
- **Features**:
  - User registration and authentication
  - Browse categories
  - Ask questions
  - View and answer questions
  - Responsive UI with Bootstrap

### 2. Application Layer (Server)
- **Technology**: Node.js with Express.js
- **Location**: `/server` folder
- **Features**:
  - RESTful JSON API
  - JWT-based authentication
  - CRUD operations for questions and answers
  - Category management

### 3. Data Layer (Database)
- **Technology**: MySQL
- **Location**: `/client/database` folder
- **Schema**:
  - `users` - User accounts with authentication
  - `categories` - Forum categories
  - `questions` - User questions
  - `answers` - Answers to questions

## 🎨 Features

### User Features
- ✅ User registration with email validation
- ✅ Secure login with password hashing (bcrypt)
- ✅ JWT-based session management
- ✅ Browse gardening categories
- ✅ View questions in each category
- ✅ Ask new questions
- ✅ Answer existing questions
- ✅ View question details with all answers

### Technical Features
- ✅ 3-Tier architecture (Presentation, Application, Data)
- ✅ RESTful JSON API
- ✅ Single Page Application (SPA)
- ✅ Responsive design with Bootstrap
- ✅ Protected routes
- ✅ Error handling
- ✅ Input validation
- ✅ SQL injection prevention (parameterized queries)

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5
- CSS3

### Backend
- Node.js
- Express.js
- MySQL2
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- cors
- dotenv

## 📝 Usage Guide

### 1. Register an Account
- Navigate to the registration page
- Enter your email and password (minimum 6 characters)
- Click "Register"

### 2. Browse Categories
- After login, you'll see the dashboard with 6 gardening categories
- Each category shows a description
- Click "Enter the Discussion" to view questions

### 3. Ask a Question
- In any category, click "Ask Question"
- Enter a title and detailed question
- Submit to post your question

### 4. Answer Questions
- Click on any question to view details
- Scroll to the answer form
- Write your answer and submit

### 5. Logout
- Click the "Logout" button in the navigation bar

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Protected API endpoints
- SQL injection prevention with parameterized queries
- Input validation on both client and server
- CORS configuration

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check `.env` file credentials
- Ensure database "Flower" exists
- Run schema.sql to create tables

### Port Conflicts
- Server default: 4000
- Client default: 3000
- Change ports in respective configuration files if needed

### CORS Errors
- Ensure server is running on port 4000
- Check CORS configuration in server/index.js


## 🌟 Future Enhancements

- User profiles with avatars
- Question voting system
- Search functionality
- Question tags
- Email notifications
- Image uploads
- Markdown support for formatting
- Admin panel
- User reputation system
- Best answer selection

---

**Built with 🌱 by the GardenHub Team**
Author: Kyran Detamore [https://www.linkedin.com/in/kyran-detamore/]