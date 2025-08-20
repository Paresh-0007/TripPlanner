# TripPlanner - Next.js Frontend Migration

This project has been successfully migrated from a vanilla HTML/CSS/JavaScript frontend to a modern **Next.js** application with TypeScript and Tailwind CSS.

## 🚀 Project Structure

```
TripPlanner/
├── src/                    # Backend Express.js server
│   ├── app.js             # Main server file (updated for Next.js)
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   └── routes/           # API routes
├── frontend/             # Next.js application
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   │   ├── page.tsx  # Homepage
│   │   │   ├── blogs/    # Blogs page
│   │   │   ├── login/    # Login page
│   │   │   └── signup/   # Signup page
│   │   └── components/   # Reusable React components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── SearchBar.tsx
│   │       └── TripPlannerForm.tsx
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── public/               # Legacy frontend (preserved)
└── start-dev.sh         # Development startup script
```

## 🎯 Features

### ✅ Completed Migration
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety for better development experience
- **Component Architecture**: Modular React components for maintainability
- **Image Optimization**: Next.js Image component for optimal loading
- **API Integration**: Seamless connection to Express.js backend
- **Authentication**: Login/signup forms with file upload support
- **Search Functionality**: Real-time place search with API integration
- **Trip Planning**: Interactive modal for itinerary generation

### 🎨 Pages
1. **Homepage** (`/`) - Hero section, hidden gems showcase, latest blogs
2. **Blogs** (`/blogs`) - Blog listing with search and pagination
3. **Signup** (`/signup`) - User registration with avatar upload
4. **Login** (`/login`) - User authentication

### 🧩 Components
- **Header**: Responsive navigation with dropdowns and user state
- **Footer**: Contact form and social media links
- **SearchBar**: Real-time place search with auto-suggestions
- **TripPlannerForm**: Modal for trip planning with form validation

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (for backend APIs)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Paresh-0007/TripPlanner.git
   cd TripPlanner
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Start both servers**
   ```bash
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

   Or manually:
   ```bash
   # Terminal 1 - Backend (port 8000)
   npm run dev

   # Terminal 2 - Frontend (port 3000)
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/tripplanner
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEOAPIFY_API_KEY=your_geoapify_key
```

### Next.js Configuration
The Next.js app is configured to proxy API calls to the Express.js backend:
```typescript
// frontend/next.config.ts
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ];
}
```

## 📱 API Integration

The frontend seamlessly integrates with the existing Express.js API:

- **Authentication**: `/api/users/login`, `/api/users/signup`, `/api/users/logout`
- **Places**: `/api/places/collection`, `/api/places/search`
- **Blogs**: `/api/blogs/collection`
- **Itinerary**: `/api/generateItinerary/itinerary`

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Responsive design patterns
- Custom utilities for common patterns
- Modern gradient backgrounds
- Smooth transitions and animations

## 🚀 Production Deployment

### Build for Production
```bash
# Build frontend
cd frontend
npm run build

# The built files will be in frontend/.next/
```

### Deployment Options
1. **Vercel** (Recommended for Next.js)
2. **Netlify** 
3. **Docker** containers
4. **Traditional hosting** with Node.js support

## 🔄 Migration from Legacy Frontend

The original vanilla HTML/CSS/JavaScript frontend has been preserved in the `public/` directory. The migration includes:

### What was migrated:
- ✅ All HTML pages → Next.js pages
- ✅ CSS styles → Tailwind CSS classes
- ✅ JavaScript functionality → React components
- ✅ Form handling → React form state
- ✅ API calls → Next.js API integration
- ✅ Image assets → Next.js Image optimization
- ✅ Responsive design → Tailwind responsive utilities

### Benefits of the migration:
- 🚀 **Performance**: Faster loading with Next.js optimizations
- 🔧 **Maintainability**: Component-based architecture
- 📱 **Responsive**: Better mobile experience
- 🛡️ **Type Safety**: TypeScript for fewer bugs
- 🎨 **Modern UI**: Consistent design system with Tailwind
- ⚡ **Developer Experience**: Hot reload, better debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes in the `frontend/` directory
4. Test your changes: `npm run build` in the frontend directory
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Team

- **Paresh Gupta** - Backend & Frontend Migration
- Contributors welcome!

---

**Note**: The legacy frontend in `public/` is preserved for reference but the recommended approach is to use the new Next.js frontend in the `frontend/` directory.