# Bellcorp Expense Tracker - Frontend

A modern, responsive React + Vite frontend for the Bellcorp Expense Tracker application with comprehensive financial management and analytics features.


## ✨ Features

- **Authentication**: Secure user registration and login with JWT tokens
- **Dashboard**: Real-time financial overview with income/expense breakdown
- **Transaction Management**: Add, edit, and delete transactions with ease
- **Transaction Explorer**: Advanced search, filtering, and pagination
- **Financial Analytics**: Beautiful charts and graphs for data visualization
- **Income & Expense Tracking**: Separate tracking for income sources and expense categories
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI**: Gradient backgrounds, smooth animations, and professional styling
- **Data Persistence**: LocalStorage for token and session management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts for data visualization
- **HTTP Method**: REST API calls
- **State Management**: React Context API
- **Styling**: CSS3 with CSS Variables
- **Language**: JavaScript (ES6+)

## 📦 Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Backend server running on `http://localhost:5000`

## 🚀 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# If using yarn
yarn install

# Install Recharts for charts (if not already included)
npm install recharts
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Environment
VITE_APP_NAME=Bellcorp Expense Tracker
```


## 📖 Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code (if ESLint configured)
npm run lint
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── Dashboard.jsx          # Financial dashboard
│   │   ├── TransactionExplorer.jsx # Search & manage transactions
│   │   └── Charts.jsx             # Analytics & visualizations
│   ├── components/
│   │   ├── AddTransaction.jsx     # Transaction form modal
│   │   ├── ProtectedRoute.jsx     # Route protection wrapper
│   │   └── Header.jsx             # Navigation header
│   ├── context/
│   │   └── AuthContext.jsx        # Global auth state
│   ├── api.js                     # Axios API client
│   ├── App.jsx                    # Main app router
│   ├── index.css                  # Global styling
│   └── main.jsx                   # React entry point
├── public/
├── .env                           # Environment variables (create this)
├── vite.config.js                # Vite configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 📄 Pages & Components

### Pages

#### **Login Page** (`Login.jsx`)
- User email and password input
- Form validation
- Error and success alerts
- Navigation to registration page
- Redirect to dashboard on success

#### **Register Page** (`Register.jsx`)
- User registration form
- Username, email, password inputs
- Password validation
- Account creation
- Auto-login after registration

#### **Dashboard** (`Dashboard.jsx`)
- **All-Time Overview**: Total income, expenses, net balance
- **Monthly Summary**: Current month income, expenses, net
- **Income Breakdown**: Income sources visualization
- **Expense Breakdown**: Expense categories visualization
- **Recent Transactions**: Latest 5 transactions list
- **Add Transaction Button**: Quick transaction creation

#### **Transaction Explorer** (`TransactionExplorer.jsx`)
- **Search**: Title and notes search
- **Filters**: 
  - Transaction type (Income/Expense)
  - Category filter
  - Date range selection
- **Sort**: By date (newest), amount (highest), title (A-Z)
- **Pagination**: Configurable items per page (5, 10, 20, 50)
- **Actions**: Edit and delete transactions
- **Bulk Display**: Show current page info

#### **Charts** (`Charts.jsx`)
- **Income vs Expenses Pie**: Overall financial distribution
- **Monthly Trend**: Income vs expense trends over time
- **Expense Distribution**: Category-wise breakdown
- **Income Distribution**: Source-wise breakdown
- **Category Bar Charts**: Amount visualization
- **Summary Statistics**: Key financial metrics

### Components

#### **AddTransaction Component** (`AddTransaction.jsx`)
- Transaction type selector (Income/Expense)
- Dynamic category selection based on type
- Title, amount, date, notes inputs
- Edit and create modes
- Form validation and error handling
- Loading states with visual feedback

#### **ProtectedRoute Component** (`ProtectedRoute.jsx`)
- JWT token verification
- Redirect to login if not authenticated
- Loading state handling
- Automatic token refresh support

#### **Header Component** (`Header.jsx`)
- Logo and app title
- Navigation links
- User logout button
- Sticky positioning
- Responsive menu

## 🔐 Authentication

### Flow

1. **Registration**
   - User provides username, email, password
   - Validation on client side
   - POST request to `/api/auth/register`
   - On success: auto-login and redirect to dashboard

2. **Login**
   - User provides email and password
   - Credentials validated
   - JWT token received from backend
   - Token stored in localStorage
   - User redirected to dashboard

3. **Session Management**
   - Token automatically included in API headers
   - Expired token triggers login redirect
   - Logout clears token from storage





