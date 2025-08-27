# JSS Placement Portal

A comprehensive full-stack job placement portal built for JSS Academy of Technical Education students and recruiters. This platform facilitates seamless interaction between students, faculty, and recruiters for job placements and career development.

## 🚀 Live Demo

- **Frontend**: [https://jss-placement-portal.vercel.app](https://jss-placement-portal.vercel.app)
- **Backend API**: [https://jss-placement-portal-fcucq0za1-vikas-t-gs-projects.vercel.app](https://jss-placement-portal-fcucq0za1-vikas-t-gs-projects.vercel.app)

## 🌟 Features

### For Students
- **Profile Management**: Complete profile setup with skills, education, and experience
- **Job Search & Filter**: Advanced filtering by company, location, salary, and requirements
- **Application Tracking**: Track application status and history
- **Preparation Hub**: Access study materials and preparation resources
- **Mock Interviews**: Schedule and take practice interviews
- **Dashboard Analytics**: View profile completion and application statistics

### For Recruiters
- **Company Profile**: Manage company information and branding
- **Job Posting**: Create and manage job listings with detailed requirements
- **Candidate Management**: View and filter applications
- **Interview Scheduling**: Coordinate with candidates for interviews

### For Faculty
- **Student Oversight**: Monitor student progress and placements
- **Resource Management**: Add and manage preparation materials
- **Analytics Dashboard**: Track placement statistics and trends

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image upload and management
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend and Backend hosting
- **MongoDB Atlas** - Cloud database (production)
- **Git & GitHub** - Version control

## 🏗️ Project Structure

```
jss-placement-portal/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── admin/       # Admin-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── shared/      # Shared components
│   │   │   └── ui/          # UI component library
│   │   ├── hooks/           # Custom React hooks
│   │   ├── redux/           # State management
│   │   ├── utils/           # Utility functions and constants
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   ├── package.json         # Frontend dependencies
│   └── vercel.json          # Frontend deployment config
├── backend/                 # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middleware
│   ├── utils/               # Utility functions
│   ├── package.json         # Backend dependencies
│   └── vercel.json          # Backend deployment config
├── database-backup/         # MongoDB backup files
├── README.md               # Project documentation
└── LICENSE                 # MIT License
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/18vikastg/jss-placement-portal.git
   cd jss-placement-portal
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Update .env with your credentials
   MONGO_URI=mongodb://localhost:27017/jobportal
   JWT_SECRET=your_super_secret_jwt_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   PORT=8001
   
   # Start backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Create environment files
   # .env.development
   VITE_API_BASE_URL=http://localhost:8001
   
   # .env.production
   VITE_API_BASE_URL=https://your-backend-url.vercel.app
   
   # Start frontend development server
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # If using local MongoDB backup
   mongorestore --host localhost:27017 --db jobportal database-backup/jobportal/
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=8001
```

#### Frontend (.env.development / .env.production)
```env
VITE_API_BASE_URL=http://localhost:8001
VITE_NODE_ENV=development
```

### MongoDB Collections
The application uses the following MongoDB collections:
- `users` - Student, recruiter, and faculty accounts
- `companies` - Company profiles and information
- `jobs` - Job listings and requirements
- `applications` - Job applications and status
- `faculties` - Faculty member profiles
- `recruiters` - Recruiter profiles
- `preparationresources` - Study materials and resources
- `drives` - Placement drive information
- `mockinterviewlogs` - Mock interview records
- `studyplans` - Student study plans
- `userprogresses` - Student progress tracking

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend Deployment (Vercel)
```bash
cd backend
vercel --prod
```

### Environment Variables Setup
Add the following environment variables in Vercel dashboard:
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT secret key
- `CLOUD_NAME` - Cloudinary cloud name
- `API_KEY` - Cloudinary API key
- `API_SECRET` - Cloudinary API secret

## 🧪 Development Journey

This project was developed through several key phases:

### Phase 1: Authentication & User Management
- ✅ Implemented JWT-based authentication
- ✅ Created user registration and login systems
- ✅ Set up role-based access control (Student, Recruiter, Faculty)
- ✅ Fixed profile data synchronization issues

### Phase 2: Core Features Development
- ✅ Built comprehensive job posting and application system
- ✅ Developed student profile management with skills tracking
- ✅ Created company profile management for recruiters
- ✅ Implemented advanced job search and filtering

### Phase 3: Advanced Features
- ✅ Added preparation hub with study materials
- ✅ Implemented mock interview system
- ✅ Created analytics dashboards
- ✅ Built file upload system with Cloudinary integration

### Phase 4: UI/UX Enhancement
- ✅ Fixed dummy data issues - profile now shows real user data
- ✅ Improved data synchronization between components
- ✅ Enhanced responsive design
- ✅ Implemented modern UI components with Radix UI

### Phase 5: Deployment & Production
- ✅ Configured Vercel deployment for both frontend and backend
- ✅ Set up MongoDB Atlas for production database
- ✅ Fixed CORS issues for cross-origin requests
- ✅ Resolved dependency conflicts and build issues
- ✅ Implemented environment-specific configurations

## 🐛 Common Issues & Solutions

### Development Issues Fixed
1. **Profile Page Showing Dummy Data**: Fixed by updating routing to use correct Profile component instead of StudentProfile
2. **Data Synchronization**: Resolved by implementing proper Redux state management
3. **CORS Errors**: Fixed by updating backend CORS configuration for production URLs
4. **Build Failures**: Resolved React Three Fiber dependency conflicts
5. **Environment Configuration**: Implemented proper environment variable handling

### Database Connection
```bash
# Local MongoDB connection
mongodb://localhost:27017/jobportal

# Production MongoDB Atlas connection
mongodb+srv://username:password@cluster.mongodb.net/jobportal
```

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  fullname: String,
  email: String,
  phoneNumber: String,
  password: String (hashed),
  role: String, // 'student', 'recruiter', 'faculty'
  profile: {
    bio: String,
    skills: [String],
    resume: String,
    resumeOriginalName: String,
    company: ObjectId,
    profilePhoto: String
  }
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  requirements: [String],
  salary: Number,
  experienceLevel: Number,
  location: String,
  jobType: String,
  position: Number,
  company: ObjectId,
  created_by: ObjectId,
  applications: [ObjectId]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout

### User Endpoints
- `GET /api/v1/user/profile` - Get user profile
- `POST /api/v1/user/profile/update` - Update user profile

### Job Endpoints
- `GET /api/v1/job` - Get all jobs
- `POST /api/v1/job/post` - Create new job (Recruiter only)
- `GET /api/v1/job/:id` - Get job by ID

### Application Endpoints
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application` - Get user applications
- `PUT /api/v1/application/status/:id/update` - Update application status

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly across:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1200px+)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Role-based authorization
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## 🎨 UI Components

Built with modern, accessible components:
- Custom form controls
- Interactive data tables
- Responsive navigation
- Modal dialogs
- Loading states
- Error boundaries
- Toast notifications

## 📈 Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with Cloudinary
- Efficient state management with Redux Toolkit
- Optimized build process with Vite
- Lazy loading of components
- Memoized computations

## 🏆 Achievements

- ✅ Complete MERN stack implementation
- ✅ Modern React patterns and hooks
- ✅ Production-ready deployment
- ✅ Responsive design implementation
- ✅ Comprehensive state management
- ✅ File upload and cloud storage
- ✅ Authentication and authorization
- ✅ Real-time data synchronization

## 📞 Support

For support, email [vikastg2000@gmail.com](mailto:vikastg2000@gmail.com) or open an issue on GitHub.

## 🙏 Acknowledgments

- JSS Academy of Technical Education for the inspiration
- React and Node.js communities for excellent documentation
- Vercel for seamless deployment experience
- MongoDB for robust database solutions
- Cloudinary for image management services

---

**Made with ❤️ by [Vikas T. G](https://github.com/18vikastg)**
