<<<<<<< HEAD
# JSS Placement Portal Demo

A comprehensive placement portal system built for JSS Academy of Technical Education. This full-stack web application facilitates placement activities for students, faculty, and recruiters.

## 🚀 Features

### For Students
- **User Authentication**: Secure login/register system
- **Profile Management**: Complete profile setup with resume upload
- **Job Applications**: Browse and apply for job opportunities
- **Application Tracking**: Track application status and feedback
- **Preparation Hub**: Access study materials and practice resources
- **Interview Scheduling**: Schedule and manage interview slots

### For Faculty
- **Student Management**: View and manage student profiles
- **Placement Coordination**: Coordinate placement activities
- **Progress Tracking**: Monitor student placement progress
- **Report Generation**: Generate placement statistics and reports

### For Recruiters
- **Company Profile**: Manage company information and requirements
- **Job Posting**: Create and manage job postings
- **Application Review**: Review student applications
- **Interview Management**: Schedule and conduct interviews

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File storage

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Clone the Repository
```bash
git clone https://github.com/18vikastg/jss-placement-portal-demo.git
cd jss-placement-portal-demo
```

### Backend Setup
```bash
cd placement-portal/backend
npm install

# Create .env file
cp .env.example .env
# Edit .env file with your configurations
```

### Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env file with your configurations
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd placement-portal/backend
npm start
```
Server will run on `http://localhost:8001`

### Start Frontend Development Server
```bash
cd placement-portal/frontend
npm run dev
```
Application will be available at `http://localhost:5173`

## 👥 Test Users

### Student Account
- **Email**: patel@gmail.com
- **Password**: patel@gmail.com
- **Role**: Student

### Alternative Student Account
- **Email**: test@student.com
- **Password**: password123
- **Role**: Student

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vikas T G**
- GitHub: [@18vikastg](https://github.com/18vikastg)

---

⭐ Star this repository if you found it helpful!

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
=======
<p><small>Best View in <a href="https://github.com/settings/appearance">Light Mode</a> and Desktop Site (Recommended)</small></p><br/>

![AI-Resume-Analyzer](https://socialify.git.ci/18vikastg/ai-resume-analyser/image?description=1&descriptionEditable=Advanced%20AI-Powered%20Resume%20Analysis%20%26%20Career%20Intelligence%20Platform&font=Raleway&language=1&pattern=Plus&theme=Light)

<div align="center">
  <h1>🚀 AI RESUME ANALYZER PRO 🚀</h1>
  <p>Advanced AI-Powered Career Intelligence Platform for Resume Analysis & Recommendations</p>
  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/github/last-commit/18vikastg/ai-resume-analyser" alt="last update" />
    <img src="https://badges.frapsoft.com/os/v2/open-source.svg?v=103" alt="open source" />
    <img src="https://img.shields.io/github/languages/top/18vikastg/ai-resume-analyser?color=red" alt="language" />
    <img src="https://img.shields.io/github/languages/code-size/18vikastg/ai-resume-analyser?color=informational" alt="code size" />
    <a href="https://github.com/18vikastg/ai-resume-analyser/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/18vikastg/ai-resume-analyser.svg?color=yellow" alt="license" />
    </a>
  </p>
  
  <!--links-->
  <h4>
    <a href="#preview-">View Demo</a>
    <span> · </span>
    <a href="#setup--installation-">Installation</a>
    <span> · </span>
    <a href="#features-">Features</a>
    <span> · </span>
    <a href="#tech-stack-">Tech Stack</a>
  </h4>
  <p>
    <small align="justify">
      Built with ❤️ by 
      <a href="https://github.com/18vikastg">Vikas TG</a> - Advanced AI & Machine Learning Implementation
     </small>
  </p>
  <small align="justify">🎯 An Advanced Resume Analysis Platform powered by Natural Language Processing and Machine Learning
  </small>
</div><br/><br/>

## About the Project 🎯
<div align="center">
    <br/><img src="https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-08-01.png" alt="AI Resume Analyzer Dashboard" /><br/><br/>
    <p align="justify"> 
      An intelligent resume analysis platform that leverages advanced Natural Language Processing (NLP) and Machine Learning algorithms to parse, analyze, and provide comprehensive insights on resumes. The system extracts key information, analyzes skills, predicts career paths, and offers personalized recommendations to enhance professional profiles.
    </p>
</div>

## Scope 💡
🎯 **For Job Seekers:**
- Get comprehensive resume analysis with AI-powered insights
- Receive personalized skill recommendations and career guidance
- Improve resume quality with detailed scoring and suggestions
- Access tailored course recommendations for skill enhancement

📊 **For Organizations:**
- Extract structured data from resumes for analytics purposes
- Gain insights into candidate profiles and skill distributions
- Streamline recruitment processes with automated analysis
- Generate comprehensive reports on applicant demographics

🏫 **For Educational Institutions:**
- Analyze student resumes before placement drives
- Track skill trends and career preferences
- Provide data-driven career counseling
- Monitor student progress and readiness

📈 **For Analytics:**
- Generate insights on industry skill demands
- Track career trend patterns
- Analyze geographical distribution of talent
- Collect user feedback for continuous improvement

## Tech Stack 💻
<details>
  <summary>Frontend & UI</summary>
  <ul>
    <li><a href="https://streamlit.io/">🎨 Streamlit</a> - Modern web application framework</li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Learn/HTML">🏗️ HTML5</a> - Markup language</li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">💅 CSS3</a> - Styling and animations</li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript">⚡ JavaScript</a> - Interactive elements</li>
  </ul>
</details>

<details>
  <summary>Backend & Processing</summary>
  <ul>
    <li><a href="https://www.python.org/">🐍 Python 3.11+</a> - Core programming language</li>
    <li><a href="https://streamlit.io/">🚀 Streamlit</a> - Application framework</li>
    <li><a href="https://spacy.io/">🧠 spaCy</a> - Advanced NLP processing</li>
    <li><a href="https://www.nltk.org/">📚 NLTK</a> - Natural language toolkit</li>
  </ul>
</details>

<details>
<summary>Database & Storage</summary>
  <ul>
    <li><a href="https://www.mysql.com/">🗄️ MySQL</a> - Primary database</li>
    <li><a href="https://pandas.pydata.org/">📊 Pandas</a> - Data manipulation</li>
  </ul>
</details>

<details>
<summary>AI & Machine Learning</summary>
  <ul>
    <li><a href="https://github.com/OmkarPathak/pyresparser">📄 PyResParser</a> - Resume parsing engine</li>
    <li><a href="https://pypi.org/project/pdfminer3/">📋 PDFMiner3</a> - PDF text extraction</li>
    <li><a href="https://plotly.com/">📈 Plotly</a> - Interactive visualizations</li>
    <li><a href="https://pypi.org/project/PyPDF2/">📑 PyPDF2</a> - Fallback PDF processing</li>
  </ul>
</details>

## Features 🌟
### 👤 User Experience:
- **🔍 Intelligent Resume Parsing**
  - Extract personal information, skills, education, and experience
  - Advanced NLP-based keyword identification
  - Multi-format support with robust fallback mechanisms

- **🎯 AI-Powered Recommendations**
  - Personalized skill enhancement suggestions
  - Career path predictions based on profile analysis
  - Relevant course and certification recommendations
  - Industry-specific guidance

- **📊 Comprehensive Analysis**
  - Experience level assessment (Fresher/Intermediate/Expert)
  - Resume quality scoring with detailed feedback
  - Skills gap analysis and improvement suggestions
  - Professional tips and best practices

### 🔧 Admin Dashboard:
- **📋 Data Management**
  - View all user data in structured format
  - Export comprehensive analytics to CSV
  - Monitor uploaded resumes and user activity
  - Track system performance metrics

- **📈 Advanced Analytics**
  - Interactive pie charts for various metrics
  - Geographic distribution analysis
  - Skill trend visualization
  - User feedback and rating analytics
  - Career field distribution insights

### 💬 Feedback System:
- **⭐ User Rating System**
  - 5-star rating mechanism
  - Detailed feedback collection
  - Historical comment analysis
  - Overall satisfaction metrics

## Requirements 📋
### Prerequisites
1) **🐍 Python 3.11+** - [Download Here](https://www.python.org/downloads/)
2) **🗄️ MySQL Server** - [Download Here](https://www.mysql.com/downloads/)
3) **💻 VS Code** (Recommended) - [Download Here](https://code.visualstudio.com/Download)
4) **🔧 Visual Studio Build Tools** - [Download Here](https://aka.ms/vs/17/release/vs_BuildTools.exe)

## Setup & Installation ⚙️

### 📥 Clone the Repository
```bash
git clone https://github.com/18vikastg/ai-resume-analyser.git
cd ai-resume-analyser
```

### 🔧 Environment Setup
Create and activate a virtual environment:
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 📦 Install Dependencies
```bash
# Install required packages
pip install -r App/requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm
```

### 🗄️ Database Configuration
1. Create a MySQL database named `resume_analyzer_db`
2. Update database credentials in `App/config.py`:
```python
DB_HOST = 'localhost'
DB_USER = 'your_username'
DB_PASSWORD = 'your_password'
DB_NAME = 'resume_analyzer_db'
```

### 🚀 Launch Application
```bash
cd App
streamlit run App.py
```

**🎉 Congratulations! Your AI Resume Analyzer is ready!**

Access the application at: `http://localhost:8501`

## Usage Guide 📖
### 🔐 Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin@resume-analyzer`

### 📄 Getting Started
1. **Upload Resume:** Select and upload a PDF resume
2. **AI Analysis:** Wait for comprehensive AI processing
3. **View Results:** Explore detailed insights and recommendations
4. **Download Reports:** Export analysis data and recommendations

## Known Issues ⚠️
- **🌐 Network Connectivity:** Ensure stable internet for geocoding features
- **📄 PDF Format:** Best results with standard PDF formats
- **🔧 Installation:** Follow video guide if issues persist

## Troubleshooting 🛠️
### Installation Issues
📺 [Setup Video Guide](https://youtu.be/WFruijLC1Nc)

For technical support: [Contact Developer](mailto:vikas@example.com)

## Roadmap 🗺️
- [x] 🎯 Multi-level experience prediction
- [x] 📊 Advanced resume scoring system
- [x] 🔍 Multi-domain skill recommendations
- [x] 🌐 Geographic analytics integration
- [ ] 📱 Mobile application development
- [ ] 🤖 Enhanced AI model training
- [ ] 🔗 LinkedIn integration
- [ ] 📧 Email report generation

## Contributing 🤝
We welcome contributions! Please feel free to submit pull requests.

For major changes, please open an issue first to discuss your ideas.

## Acknowledgments 🙏
- **🧠 spaCy Team** - Advanced NLP capabilities
- **📄 PyResParser** - Core parsing functionality
- **🎨 Streamlit** - Amazing web framework
- **📊 Plotly** - Interactive visualizations

## Preview 👀

### 🖥️ Client Side

**Main Dashboard - Professional UI**

![Main Dashboard](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-08-01.png)

**Resume Upload Interface**

![Resume Upload](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-08-56.png)

**AI-Powered Resume Analysis**

![Resume Analysis](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-10-03.png)

**Detailed Skills Assessment**

![Skills Assessment](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-10-22.png)

**Personalized Recommendations**

![Recommendations](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-10-33.png)

**Career Guidance & Tips**

![Career Guidance](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-10-42.png)

### 💬 Feedback System

**User Feedback Interface**

![Feedback Form](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-11-25.png)

**Rating & Review System**

![Rating System](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-11-31.png)

### 🔧 Admin Dashboard

**Admin Control Panel**

![Admin Panel](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-11-38.png)

**Analytics & Data Insights**

![Analytics Dashboard](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-11-51.png)

**User Data Management**

![Data Management](https://raw.githubusercontent.com/18vikastg/ai-resume-analyser/main/Screenshot%20from%202025-08-20%2000-11-57.png)

---

<div align="center">
  <p>
    <strong>Built with 💜 and AI by <a href="https://github.com/18vikastg">Vikas TG</a></strong>
  </p>
  <p>
    <em>Empowering careers through intelligent resume analysis</em>
  </p>
</div>
>>>>>>> resume-analyser/main
