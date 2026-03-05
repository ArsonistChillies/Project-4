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

## EER Diagram

![EER Diagram](<Images/ERR Diagram.png>)

## Database Schema

-users table
'''
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
  );
'''

-categories table
'''
  CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
'''

-questions table
'''
  CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
  );
'''

-answers table
'''
  CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_question (question_id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
  );
'''

## 📸 Screenshots

![Login Page](<Images/Login Comp.png>)
![Register Page](<Images/Register Comp.png>)
![Home Page](<Images/Dashboard Comp.png>)
![Ask Page](<Images/Discussion Comp.png>)

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