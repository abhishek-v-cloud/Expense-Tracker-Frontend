# Bellcorp Expense Tracker - Frontend

A modern, responsive React + Vite frontend for the Bellcorp Expense Tracker application with comprehensive financial management and analytics features.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [Authentication](#authentication)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

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
- Modern web browser (Chrome, Firefox, Safari, Edge)

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

### Vite Configuration

The `vite.config.js` is already configured with:
- Port 3000 for development
- Proxy to backend API
- Hot Module Replacement (HMR)
- Optimized build settings

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

### Token Storage

```javascript
// Token stored in localStorage
localStorage.getItem('token')
localStorage.setItem('token', jwtToken)
localStorage.removeItem('token') // On logout
```

## 🎨 Styling

### CSS Architecture

- **CSS Variables**: Custom properties for theming
- **Colors**: 
  - Primary: `#667eea` (Blue-Purple)
  - Success: `#4caf50` (Green)
  - Danger: `#f44336` (Red)
  - Warning: `#ff9800` (Orange)

- **Responsive Breakpoints**:
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px

### CSS Features

- Flexbox layouts for components
- Grid layouts for cards and filters
- Gradient backgrounds
- Smooth transitions and animations
- Shadow hierarchy (sm, md, lg)
- Border radius system (sm, md, lg)

### Custom Components Styling

```css
/* Cards with rounded corners and shadows */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  padding: 20px;
}

/* Forms with focus states */
input, select, textarea {
  border: 1.5px solid #e0e6ed;
  border-radius: 8px;
  transition: all 0.3s;
}

input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
}

/* Buttons with gradients */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #5568d3 100%);
  color: white;
  border: none;
  padding: 11px 22px;
}
```

## 🔌 API Integration

### Axios Client Setup

The `api.js` file handles:
- Base URL configuration from environment variables
- Default headers
- JWT token injection on every request
- Error handling

```javascript
// Example API call
const { data } = await transactionAPI.getTransactions({
  page: 1,
  limit: 10,
  category: 'Food'
});
```

### Available API Methods

```javascript
// Authentication
authAPI.register(userData)
authAPI.login(credentials)
authAPI.getCurrentUser()

// Transactions
transactionAPI.addTransaction(data)
transactionAPI.getTransactions(filters)
transactionAPI.getTransactionById(id)
transactionAPI.updateTransaction(id, data)
transactionAPI.deleteTransaction(id)
transactionAPI.getDashboard()
```

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Output files in 'dist/' directory
```

### Deployment Options

#### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### **Netlify**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify dashboard

#### **GitHub Pages**
```bash
# Update package.json with homepage URL
# Build and deploy
npm run build
```

#### **Traditional Hosting**
1. Run `npm run build`
2. Upload `dist/` folder to server
3. Configure server to serve `index.html` for all routes
4. Update `VITE_API_URL` in production environment

### Environment Variables for Production

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Bellcorp Expense Tracker
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Errors

- Verify backend is running on port 5000
- Check `VITE_API_URL` matches backend URL
- Ensure backend CORS configuration includes frontend URL

### API Not Found (404 Errors)

- Confirm backend server is running
- Check API endpoint URLs in `api.js`
- Verify request parameters and body format
- Check browser DevTools Network tab

### Components Not Rendering

- Clear browser cache: `Ctrl+Shift+Delete`
- Restart development server: `npm run dev`
- Check console for JavaScript errors
- Verify all dependencies installed: `npm install`

### Authentication Issues

- **Can't login**: Check backend authentication endpoint
- **Token expires**: Frontend should redirect to login
- **CORS on auth**: Verify credentials in CORS request headers

### Charts Not Displaying

- Ensure Recharts is installed: `npm install recharts`
- Check dashboard data is being fetched: DevTools > Network
- Verify data format matches chart components
- Check browser console for errors

### Slow Performance

- Check network tab for slow API calls
- Reduce transaction history fetch limit
- Enable production build: `npm run build`
- Compress images if using custom graphics
- Use browser DevTools Performance tab

## 📱 Mobile Responsiveness

### Breakpoints

```css
/* Mobile First Approach */
/* Base mobile: < 480px */

@media (max-width: 768px) {
  /* Tablet adjustments */
}

@media (max-width: 480px) {
  /* Small mobile adjustments */
}

@media (min-width: 1400px) {
  /* Large desktop adjustments */
}
```

### Testing Responsive Design

- **DevTools Device Mode**: F12 → Device Toolbar
- **Test Breakpoints**: 320px, 480px, 768px, 1024px, 1400px
- **Touch Testing**: Use device emulation for touch events
- **Performance**: Check Lighthouse scores

## 🎯 Best Practices

1. **Performance**
   - Use React.memo for expensive components
   - Lazy load routes with React.lazy()
   - Minimize re-renders with useCallback

2. **Code Quality**
   - Keep components small and focused
   - Use consistent naming conventions
   - Add error boundaries for crash safety

3. **Security**
   - Never hardcode tokens
   - Validate all user inputs
   - Use HTTPS in production
   - Keep dependencies updated

4. **User Experience**
   - Show loading states
   - Provide clear error messages
   - Confirm destructive actions
   - Support keyboard navigation

## 🤝 Contributing

1. Follow component structure conventions
2. Add prop validation with PropTypes or TypeScript
3. Test responsive design on multiple devices
4. Update this README for new features
5. Keep styling consistent with CSS variables

## 📝 License

This project is part of the Bellcorp Expense Tracker assignment.

---

## 🚀 Quick Start Checklist

- ✅ Node v16+ installed?
- ✅ Dependencies installed? (`npm install`)
- ✅ `.env` file created with `VITE_API_URL`?
- ✅ Backend running on port 5000?
- ✅ Run with `npm run dev`?
- ✅ Access on `http://localhost:3000`?

## 📊 Feature Coverage

| Feature | Status | Page |
|---------|--------|------|
| User Registration | ✅ | Register |
| User Login | ✅ | Login |
| Dashboard Overview | ✅ | Dashboard |
| Add Transaction | ✅ | Dashboard/Explorer |
| Edit Transaction | ✅ | Explorer |
| Delete Transaction | ✅ | Explorer |
| Search Transactions | ✅ | Explorer |
| Filter Transactions | ✅ | Explorer |
| Sort Transactions | ✅ | Explorer |
| Pagination | ✅ | Explorer |
| Income Tracking | ✅ | Dashboard/Charts |
| Expense Tracking | ✅ | Dashboard/Charts |
| Charts & Analytics | ✅ | Charts |
| Responsive Design | ✅ | All Pages |
| Data Persistence | ✅ | All Pages |

For detailed API documentation, see [Backend README](../backend/README.md).
