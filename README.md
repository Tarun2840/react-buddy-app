# User Dashboard - React Frontend Assignment

A modern, responsive user dashboard built with React.js that demonstrates fundamental React concepts and best practices. This project showcases user management capabilities with a clean, professional interface.

## 🚀 Live Demo

The app is deployed and ready to view at: [Your Dashboard URL Here]

## 📱 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dashboard+Overview)

### User Details Page
![User Details](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=User+Details+Page)

### Mobile Responsive
![Mobile](https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=Mobile+View)

## ✨ Features

### Dashboard Page
- 📊 **User List Display**: Fetches and displays users from JSONPlaceholder API
- 🔍 **Real-time Search**: Filter users by name, email, or username
- ➕ **Add New User**: Client-side form to create new users
- 📈 **User Statistics**: Shows total users and search results count
- 🎨 **Card Layout**: Clean, professional user cards with hover effects

### User Details Page
- 👤 **Complete Profile**: Full user information including contact details
- 🏠 **Address Information**: Street address with GPS coordinates
- 🏢 **Company Details**: Business information and company motto
- 🧭 **Navigation**: Easy navigation back to dashboard

### Technical Features
- ⚡ **React Hooks**: useState, useEffect, useReducer, useContext
- 🗂️ **Context API**: Global state management for users
- 🛣️ **React Router**: Client-side routing for SPA navigation
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎯 **TypeScript**: Full type safety throughout the application
- 🔄 **Loading States**: Skeleton loading and error handling
- ✅ **Form Validation**: Input validation with user feedback
- 🎨 **Modern UI**: Professional design with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3+ with functional components
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **HTTP Client**: Axios for API requests
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── UserCard.tsx    # Individual user card
│   ├── SearchBar.tsx   # Search functionality
│   └── CreateUserForm.tsx # New user form
├── contexts/           # React Context providers
│   └── UserContext.tsx # User state management
├── pages/              # Page components
│   ├── Index.tsx       # Homepage (Dashboard)
│   ├── UserDetails.tsx # User detail page
│   └── NotFound.tsx    # 404 page
├── services/           # API service layer
│   └── userService.ts  # User API calls
├── hooks/              # Custom React hooks
│   └── use-toast.ts    # Toast notifications
└── lib/                # Utility functions
    └── utils.ts        # Shared utilities
```

## 🎨 Design System

The application features a custom design system built with Tailwind CSS:

- **Colors**: Professional blue primary (#3B82F6) with semantic color tokens
- **Typography**: Clean, hierarchical text scales
- **Components**: Consistent spacing, shadows, and border radius
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first breakpoints

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Demonstrated

### React Concepts
- ✅ Functional components with hooks
- ✅ useState for local component state
- ✅ useEffect for side effects and API calls
- ✅ useContext for global state access
- ✅ useReducer for complex state management
- ✅ Custom hooks for reusable logic
- ✅ Component composition and props

### Best Practices
- ✅ TypeScript for type safety
- ✅ Proper error handling and loading states
- ✅ Responsive design patterns
- ✅ Accessibility considerations
- ✅ Clean code architecture
- ✅ Reusable component design
- ✅ SEO optimization

## 📡 API Integration

The app integrates with the JSONPlaceholder API:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints Used**:
  - `GET /users` - Fetch all users
  - `GET /users/:id` - Fetch specific user

## 🚀 Deployment

The application is configured for easy deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service
   - Vercel
   - Netlify  
   - GitHub Pages
   - Any static hosting provider

## 🎯 Assignment Completion Checklist

- ✅ **Dashboard Page**: User list with search/filter functionality
- ✅ **User Cards**: Display name, email, phone, company in card layout
- ✅ **Search Feature**: Filter users by name
- ✅ **Create User Form**: Client-side form with validation
- ✅ **Global State**: React Context for user management
- ✅ **User Details Page**: Full user information display
- ✅ **Routing**: React Router implementation
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Code Quality**: Clean, modular code structure
- ✅ **Documentation**: Comprehensive README with setup instructions

## 📝 Future Enhancements

Potential improvements for production use:
- User editing functionality
- Data persistence (localStorage/database)
- User avatar uploads
- Advanced filtering and sorting
- Pagination for large datasets
- Dark/light theme toggle
- Unit and integration tests
- Performance optimizations

## 👨‍💻 Developer

Built as a React Frontend Intern Assignment demonstrating:
- Modern React development patterns
- Clean code architecture
- Professional UI/UX design
- Responsive web development
- TypeScript proficiency

---

**Note**: This is a frontend-only application using mock data from JSONPlaceholder API. All "Create User" functionality is client-side only and data is not persisted to a backend.