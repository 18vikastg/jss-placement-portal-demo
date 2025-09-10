# 🎓 JSS Placement Portal - Complete Career Development Platform

<div align="center">

![JSS Placement Portal](https://img.shields.io/badge/JSS-Placement%20Portal-red?style=for-the-badge&logo=graduation-cap)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=artificial-intelligence)

**A comprehensive full-stack placement portal system built for JSS Academy of Technical Education**

[🚀 Live Demo](https://jss-placement-portal.vercel.app) • [📖 Documentation](#-features) • [💻 Installation](#-installation) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

The JSS Placement Portal is a comprehensive career development platform that facilitates seamless interaction between students, faculty, and recruiters. It combines traditional placement portal functionality with cutting-edge features like AI-powered resume analysis, professional portfolio building, and alumni networking.

### 🎯 Key Highlights
- **Complete MERN Stack Implementation** with modern React patterns
- **AI-Powered Resume Analysis** with ML-based insights and recommendations
- **Professional Portfolio Builder** (NewLinkFolio Integration)
- **Alumni Networking Platform** with messaging and scheduling
- **Comprehensive Placement Management** for all stakeholders
- **Real-time Analytics** and progress tracking

---

## 🚀 Features

### 👨‍🎓 **For Students**

#### 🔐 **Authentication & Profile Management**
- Secure JWT-based authentication system
- Complete profile setup with skills, education, and experience
- Profile completion tracking with progress indicators
- Resume upload and management with Cloudinary integration

#### 💼 **Job Discovery & Applications**
- Advanced job search with filtering by company, location, salary, and requirements
- One-click job applications with application status tracking
- Personalized job recommendations based on profile and skills
- Application history and analytics dashboard

#### 🎯 **Preparation Hub**
- Access to curated study materials and preparation resources
- Mock interview scheduling and practice sessions
- Skill-based learning paths and recommendations
- Progress tracking and performance analytics

#### 🤖 **AI Resume Analyzer**
- **Intelligent Resume Parsing** with NLP-powered extraction
- **AI-Powered Recommendations** for skill enhancement
- **Comprehensive Analysis** with experience level assessment
- **Quality Scoring** with detailed feedback and improvement suggestions
- **Career Path Predictions** based on profile analysis

#### 🌐 **LinkFolio - Professional Portfolio Builder**
- **Complete Portfolio Creation** with step-by-step guidance
- **Professional Templates** with JSS Academy branding
- **Skills & Experience Showcase** with visual representations
- **Portfolio Analytics** with view tracking and engagement metrics
- **Export & Share Options** for easy distribution

#### 👥 **Alumni Network (AlumniLink)**
- **Connect with JSS Alumni** working at top companies (Google, Microsoft, Amazon, Flipkart)
- **Real-time Messaging System** with read/unread status tracking
- **Meeting Scheduling** with calendar integration
- **Alumni Search & Filter** by company, skills, and graduation year
- **Mentorship Requests** and professional guidance
- **Networking Events** and alumni meetup coordination

#### 📊 **Analytics Dashboard**
- Profile completion percentage and recommendations
- Application success rates and interview conversion
- Skill development tracking and progress visualization
- Notification center with priority-based alerts

### 🏢 **For Recruiters**

#### 🏬 **Company Management**
- Comprehensive company profile setup with branding
- Team member management and role assignments
- Company analytics and recruitment metrics

#### 💼 **Job Posting & Management**
- Advanced job posting with detailed requirements and specifications
- Bulk job posting capabilities for placement drives
- Job performance analytics and application insights
- Custom application forms and screening questions

#### 👥 **Candidate Management**
- Advanced candidate filtering and search capabilities
- Resume analysis integration for candidate assessment
- Interview scheduling and calendar management
- Application tracking with status updates and feedback

#### 📈 **Recruitment Analytics**
- Application conversion rates and funnel analysis
- Time-to-hire metrics and recruitment efficiency
- Candidate quality assessment and scoring
- Custom reporting and data export capabilities

### 👨‍🏫 **For Faculty**

#### 📊 **Student Management**
- Complete student profile oversight and monitoring
- Placement progress tracking and success metrics
- Academic performance correlation with placement outcomes
- Student mentoring and guidance tools

#### 📚 **Resource Management**
- Preparation material creation and curation
- Study plan creation and assignment
- Progress monitoring and assessment tools
- Resource usage analytics and effectiveness tracking

#### 📈 **Analytics & Reporting**
- Comprehensive placement statistics and trends
- Department-wise performance analysis
- Industry placement patterns and insights
- Custom report generation for administrative purposes

### 🔧 **Admin Features**

#### 🎛️ **System Management**
- User role management and permissions
- System configuration and settings
- Database management and backup tools
- Performance monitoring and optimization

#### 📊 **Analytics Dashboard**
- Platform usage statistics and user engagement
- Feature adoption rates and user behavior analysis
- System performance metrics and health monitoring
- Custom dashboard creation and reporting

---

## 🛠️ Tech Stack

### **Frontend Technologies**
```
React 18               - Modern UI library with hooks and context
Vite                  - Fast build tool and development server
Redux Toolkit         - Predictable state management
React Router DOM      - Client-side routing with lazy loading
Tailwind CSS          - Utility-first CSS framework
Radix UI              - Accessible component primitives
Framer Motion         - Smooth animations and transitions
Recharts              - Responsive data visualization
Lucide React          - Beautiful icon library
Axios                 - HTTP client with interceptors
```

### **Backend Technologies**
```
Node.js               - JavaScript runtime environment
Express.js            - Fast web application framework
MongoDB               - NoSQL database with flexible schema
Mongoose              - Elegant MongoDB ODM with validation
JWT                   - Secure authentication tokens
Bcrypt                - Password hashing and security
Cloudinary            - Image and file upload management
Multer                - File upload middleware
CORS                  - Cross-origin resource sharing
Helmet                - Security middleware for Express
```

### **AI & Machine Learning**
```
Python 3.11+          - Core AI processing language
Streamlit             - AI dashboard and interface
spaCy                 - Advanced NLP processing
NLTK                  - Natural language toolkit
PyResParser           - Resume parsing engine
PDFMiner3             - PDF text extraction
Plotly                - Interactive AI visualizations
MySQL                 - AI data storage and analytics
```

### **Development & Deployment**
```
Vercel                - Frontend and backend hosting
MongoDB Atlas         - Cloud database hosting
Git & GitHub          - Version control and collaboration
ESLint                - Code linting and quality
Prettier              - Code formatting
Husky                 - Git hooks for quality control
```

---

## 🏗️ Project Architecture

```
jss-placement-portal/
├── 📁 placement-portal/
│   ├── 📁 frontend/                 # React Frontend Application
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/       # Reusable UI Components
│   │   │   │   ├── 📁 auth/         # Authentication Components
│   │   │   │   ├── 📁 student/      # Student Dashboard & Features
│   │   │   │   ├── 📁 recruiter/    # Recruiter Management
│   │   │   │   ├── 📁 admin/        # Admin Panel Components
│   │   │   │   ├── 📁 linkfolio/    # Portfolio Builder (NewLinkFolio)
│   │   │   │   ├── 📁 shared/       # Shared Components
│   │   │   │   ├── 📁 ui/           # UI Component Library
│   │   │   │   └── 📁 3D/           # 3D Animations & Effects
│   │   │   ├── 📁 hooks/            # Custom React Hooks
│   │   │   ├── 📁 redux/            # State Management
│   │   │   ├── 📁 utils/            # Utility Functions
│   │   │   └── 📁 assets/           # Static Assets
│   │   └── 📁 public/               # Public Static Files
│   │
│   └── 📁 backend/                  # Node.js Backend API
│       ├── 📁 controllers/          # Business Logic Controllers
│       ├── 📁 models/               # Database Models & Schemas
│       ├── 📁 routes/               # API Route Definitions
│       ├── 📁 middlewares/          # Custom Middleware
│       ├── 📁 utils/                # Backend Utilities
│       └── 📁 config/               # Configuration Files
│
├── 📁 ai-resume-analyser/           # AI-Powered Resume Analysis
│   ├── 📁 App/                      # Streamlit Application
│   │   ├── App.py                   # Main AI Application
│   │   ├── config.py                # AI Configuration
│   │   └── requirements.txt         # AI Dependencies
│   └── 📁 pyresparser/              # Resume Parsing Engine
│
├── 📁 NewLinkFolio-main/           # Original Portfolio Source
│   └── 📁 NewLinkFolio-main/       # Source HTML Application
│       └── index.html               # 3000+ lines of portfolio features
│
├── 📁 database-backup/              # MongoDB Backup Files
├── 📄 README.md                     # Project Documentation
└── 📄 LICENSE                       # MIT License
```

---

## 🚀 Installation & Setup

### 📋 Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (v6.0 or higher) or MongoDB Atlas account
- **Python** (v3.11+ for AI features)
- **Git** for version control
- **Cloudinary** account for file uploads

### 🔧 Environment Setup

#### 1. **Clone the Repository**
```bash
git clone https://github.com/18vikastg/jss-placement-portal-demo.git
cd jss-placement-portal-demo
```

#### 2. **Backend Configuration**
```bash
cd placement-portal/backend
npm install

# Create environment file
cp .env.example .env
```

**Backend Environment Variables (.env):**
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/jobportal
# Or for production: mongodb+srv://username:password@cluster.mongodb.net/jobportal

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters

# Cloudinary Configuration (for file uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=8001
NODE_ENV=development
```

#### 3. **Frontend Configuration**
```bash
cd ../frontend
npm install

# Create environment files
cp .env.example .env.development
cp .env.example .env.production
```

**Frontend Environment Variables:**
```env
# Development (.env.development)
VITE_API_BASE_URL=http://localhost:8001
VITE_NODE_ENV=development

# Production (.env.production)
VITE_API_BASE_URL=https://your-backend-domain.vercel.app
VITE_NODE_ENV=production
```

#### 4. **AI Resume Analyzer Setup**
```bash
cd ../../ai-resume-analyser/App
pip install -r requirements.txt

# Download required NLP models
python -m spacy download en_core_web_sm

# Set up MySQL database for AI features
mysql -u root -p
CREATE DATABASE resume_analyzer_db;
```

#### 5. **Database Setup**
```bash
# Import sample data (optional)
cd ../../database-backup
mongorestore --host localhost:27017 --db jobportal jobportal/
```

### 🏃‍♂️ Running the Application

#### **Development Mode**
```bash
# Terminal 1: Start Backend Server
cd placement-portal/backend
npm run dev
# Backend runs on http://localhost:8001

# Terminal 2: Start Frontend Development Server
cd placement-portal/frontend
npm run dev
# Frontend runs on http://localhost:5173

# Terminal 3: Start AI Resume Analyzer
cd ai-resume-analyser/App
streamlit run App.py
# AI service runs on http://localhost:8501
```

#### **Production Build**
```bash
# Build frontend for production
cd placement-portal/frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

---

## 🌐 Live Demo & Deployment

### **🔗 Live URLs**
- **Main Portal**: [https://jss-placement-portal.vercel.app](https://jss-placement-portal.vercel.app)
- **Backend API**: [https://jss-placement-portal-backend.vercel.app](https://jss-placement-portal-backend.vercel.app)

### **🧪 Test Accounts**

#### **Student Account**
```
Email: patel@gmail.com
Password: patel@gmail.com
Role: Student
Features: Complete access to all student features
```

#### **Recruiter Account**
```
Email: recruiter@company.com
Password: recruiter123
Role: Recruiter
Features: Job posting, candidate management
```

#### **Faculty Account**
```
Email: faculty@jssateb.ac.in
Password: faculty123
Role: Faculty
Features: Student management, analytics
```

#### **AI Resume Analyzer Admin**
```
Username: admin
Password: admin@resume-analyzer
Features: Analytics dashboard, user data management
```

---

## 📱 Feature Showcase

### 🎨 **LinkFolio Portfolio Builder**
The integrated NewLinkFolio-main features provide a complete portfolio building experience:

- **🏠 Landing Page**: Professional welcome interface with JSS branding
- **📝 Account Creation**: Streamlined signup process for new users
- **👤 Profile Builder**: Step-by-step profile creation with:
  - Personal information management
  - Skills assessment and tracking
  - Education and experience documentation
  - Career objective setting
  - Professional photo upload
- **📊 Portfolio Display**: Beautiful portfolio showcase with:
  - Responsive design across all devices
  - Professional templates and layouts
  - Skills visualization and progress tracking
  - Contact information and social links
- **🎓 Alumni Network**: Connect with JSS alumni featuring:
  - Alumni directory with company affiliations
  - Direct messaging and communication
  - Meeting scheduling and calendar integration
  - Mentorship request system
- **📈 Analytics**: Portfolio performance tracking with:
  - View statistics and engagement metrics
  - Profile completion progress
  - Interaction tracking and insights

### 🤖 **AI Resume Analyzer**
Advanced artificial intelligence features for resume enhancement:

- **📄 Intelligent Parsing**: Extract structured data from PDF resumes
- **🧠 NLP Analysis**: Advanced natural language processing for content analysis
- **⭐ Quality Scoring**: Comprehensive resume scoring with improvement suggestions
- **🎯 Skill Recommendations**: Personalized skill enhancement suggestions
- **📊 Career Insights**: Data-driven career path predictions
- **📈 Progress Tracking**: Monitor resume improvement over time

### 📊 **Analytics Dashboard**
Comprehensive analytics for all user types:

- **Student Analytics**:
  - Application success rates and conversion metrics
  - Profile completion tracking and recommendations
  - Skill development progress and growth areas
  - Interview performance and feedback analysis

- **Recruiter Analytics**:
  - Job posting performance and application metrics
  - Candidate quality assessment and filtering
  - Time-to-hire optimization and efficiency tracking
  - Recruitment funnel analysis and conversion rates

- **Faculty Analytics**:
  - Student placement success rates and trends
  - Department-wise performance comparisons
  - Industry placement patterns and insights
  - Academic correlation with placement outcomes

---

## 🧪 Test Accounts & Usage

### **👥 Pre-configured Test Users**

#### **Student Access**
- **Primary**: patel@gmail.com / patel@gmail.com
- **Secondary**: test@student.com / password123
- **Features**: Portfolio builder, job applications, AI resume analysis, alumni networking

#### **Recruiter Dashboard**
- **Email**: recruiter@company.com / recruiter123
- **Features**: Job posting, candidate management, application review, analytics

#### **Faculty Panel**
- **Email**: faculty@jssateb.ac.in / faculty123
- **Features**: Student oversight, resource management, placement analytics

#### **AI System Admin**
- **Credentials**: admin / admin@resume-analyzer
- **Features**: AI analytics, user data management, system insights

---

## 📞 Support & Help

### **Getting Help**
- **📧 Email Support**: [vikastg2000@gmail.com](mailto:vikastg2000@gmail.com)
- **🐛 Bug Reports**: [Create an Issue](https://github.com/18vikastg/jss-placement-portal-demo/issues)
- **💡 Feature Requests**: [Feature Request Template](https://github.com/18vikastg/jss-placement-portal-demo/issues/new)
- **📖 Documentation**: Check this README and code comments

### **Common Issues & Solutions**
```bash
# Database connection issues
1. Check MongoDB service status
2. Verify connection string in .env
3. Ensure network connectivity

# Build failures
1. Clear node_modules: rm -rf node_modules && npm install
2. Clear cache: npm cache clean --force
3. Check Node.js version compatibility

# Authentication issues
1. Verify JWT_SECRET in environment
2. Check token expiration settings
3. Clear browser localStorage
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** from main
4. **Make your changes** with proper testing
5. **Submit a pull request** with detailed description

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for any API changes
- Ensure all tests pass before submitting PR
- Use meaningful commit messages

### **Development Workflow**
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create pull request on GitHub
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **MIT License Summary**
- ✅ **Commercial Use** - Use for commercial purposes
- ✅ **Modification** - Modify the source code
- ✅ **Distribution** - Distribute copies of the software
- ✅ **Private Use** - Use for private purposes
- ❌ **Liability** - No warranty or liability
- ❌ **Warranty** - No warranty provided

---

## 🙏 Acknowledgments

### **Technology Partners**
- **[React Team]** for the amazing UI library
- **[MongoDB]** for the flexible database solution
- **[Vercel]** for seamless deployment experience
- **[Cloudinary]** for robust file management
- **[Tailwind CSS]** for the utility-first CSS framework

### **Educational Institution**
- **JSS Academy of Technical Education** for the inspiration and use case
- **Students and Faculty** for feedback and testing
- **Placement Cell** for requirements and guidance

### **Open Source Community**
- **Contributors** who helped improve the project
- **Issue Reporters** who identified bugs and improvements
- **Documentation Writers** who enhanced project documentation

---

<div align="center">

### **Made with ❤️ by [Vikas T. G](https://github.com/18vikastg)**

**🎓 Empowering education through technology**

**🚀 Building the future of career development**

---

[![GitHub followers](https://img.shields.io/github/followers/18vikastg?style=social)](https://github.com/18vikastg)

**⭐ Star this repository if you found it helpful!**

</div>
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
