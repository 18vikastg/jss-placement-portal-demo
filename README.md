# AI Resume Analyzer 🚀

<div align="center">

![Best View in Light Mode and Desktop Site (Recommended)](https://img.shields.io/badge/Best%20View-Light%20Mode%20%26%20Desktop-brightgreen)

# 🌴 AI RESUME ANALYZER 🌴
**A Tool for Resume Analysis, Predictions and Recommendations**

![last update](https://img.shields.io/github/last-commit/18vikastg/ai-resume-analyser)
![open source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)
![language](https://img.shields.io/github/languages/top/18vikastg/ai-resume-analyser)
![code size](https://img.shields.io/github/languages/code-size/18vikastg/ai-resume-analyser)
![license](https://img.shields.io/github/license/18vikastg/ai-resume-analyser)

[View Demo](https://ai-resume-analyser.railway.app) · [Installation](#setup--installation-) · [Features](#features-)

**Built with 🤍 by Vikas TG - AI/ML Developer**

🚀 **A comprehensive AI-powered resume analysis tool with intelligent recommendations and analytics**

</div>

---

## About the Project 🥱

![screenshot](./screenshots/user/1-main-screen.png)

An intelligent tool that parses information from resumes using **Natural Language Processing** and **Machine Learning** techniques. It extracts keywords, clusters them into relevant sectors, and provides personalized recommendations, predictions, and analytics to help job seekers and recruiters make data-driven decisions.

### Key Capabilities:
- 🤖 **AI-Powered Resume Parsing** using spaCy and NLTK
- 📊 **Intelligent Analytics** with interactive visualizations
- 🎯 **Personalized Recommendations** for skills and career paths
- 🔍 **Smart Resume Scoring** algorithm
- 📈 **Predictive Analytics** for job role matching

---

## Scope 😲

✅ **For Organizations:**
- Extract resume data into structured formats (CSV/Database)
- Generate analytics and insights from candidate pool
- Automated screening and candidate ranking

✅ **For Job Seekers:**
- Get actionable recommendations to improve resumes
- Receive personalized career guidance
- Track resume performance with scoring metrics

✅ **For Educational Institutions:**
- Analyze student readiness for placements
- Generate placement statistics and trends
- Provide career counseling insights

✅ **For Recruiters:**
- Quick candidate assessment and filtering
- Skills gap analysis for roles
- Market trend analysis for hiring

---

## Tech Stack 🍻

### **Frontend**
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### **Backend**
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

### **Database**
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### **AI/ML Libraries**
![spaCy](https://img.shields.io/badge/spaCy-09A3D5?style=for-the-badge&logo=spacy&logoColor=white)
![NLTK](https://img.shields.io/badge/NLTK-154f3c?style=for-the-badge)
![scikit-learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

### **Visualization**
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557c?style=for-the-badge)

### **Deployment**
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## Features 🤦‍♂️

### **Client Side Features:**

#### 🔍 **Intelligent Resume Analysis**
- **Location & Metadata Extraction:** Automatically fetches user location and system information
- **Advanced Parsing:** Extracts basic info, skills, experience, and education details
- **Keyword Intelligence:** Identifies relevant keywords and technical skills

#### 🎯 **Smart Recommendations**
- **Skill Enhancement:** Suggests skills to add based on target roles
- **Job Role Prediction:** AI-powered career path recommendations  
- **Course Suggestions:** Relevant certifications and learning paths
- **Resume Optimization:** Actionable tips to improve resume quality
- **Performance Scoring:** Overall resume effectiveness score
- **Interview Preparation:** Video recommendations and tips

### **Admin Panel Features:**

#### 📊 **Data Analytics Dashboard**
- **User Management:** View all applicant data in tabular format
- **Data Export:** Download user analytics as CSV files
- **File Management:** Access all uploaded resumes in organized folders
- **Feedback System:** Collect and analyze user ratings and comments

#### 📈 **Advanced Analytics**
Interactive pie charts and visualizations for:
- User ratings and satisfaction scores
- Predicted job fields and career trends
- Experience level distribution
- Resume score analytics
- Geographic user distribution (City/State/Country)
- Real-time user engagement metrics

### **Feedback System:**

#### 💬 **User Experience**
- **Rating System:** 1-5 star rating mechanism
- **Comment Collection:** Detailed feedback from users
- **Analytics Dashboard:** Visual representation of overall ratings
- **History Tracking:** Complete user feedback timeline

---

## Requirements 😅

Make sure you have these installed for a smooth experience:

- **Python 3.11+** - [Download Here](https://www.python.org/downloads/)
- **MySQL 8.0+** - [Download Here](https://www.mysql.com/downloads/) *(Optional for local development)*
- **Visual Studio Code** - [Download Here](https://code.visualstudio.com/) *(Recommended)*
- **Git** - [Download Here](https://git-scm.com/downloads)

---

## Setup & Installation 👀

### **Quick Start** 🚀

1. **Clone the Repository**
   ```bash
   git clone https://github.com/18vikastg/ai-resume-analyser.git
   cd ai-resume-analyser
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download Language Model**
   ```bash
   python -m spacy download en_core_web_sm
   ```

5. **Run the Application**
   ```bash
   streamlit run App/App.py
   ```

6. **Access the App**
   - Open your browser and go to: `http://localhost:8501`
   - Admin Panel: Use `admin` / `admin@resume-analyzer`

### **Database Setup** (Optional)

For full functionality with database features:

1. **Install MySQL** and create a database named `resume_analyzer_db`
2. **Update credentials** in `App/config.py`:
   ```python
   DB_HOST = 'localhost'
   DB_USER = 'your_username'
   DB_PASSWORD = 'your_password'
   DB_NAME = 'resume_analyzer_db'
   ```

**Note:** The app works perfectly without a database in **demo mode**!

---

## Cloud Deployment 🌐

### **Railway** (Recommended)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/your-template)

1. Visit [Railway.app](https://railway.app)
2. Connect your GitHub account
3. Deploy from repository: `18vikastg/ai-resume-analyser`
4. Railway handles everything automatically!

### **Alternative Platforms**
- **Render:** Use the included `render.yaml`
- **Heroku:** Use the included `Procfile`
- **Docker:** Use `docker build -t ai-resume-analyzer .`

---

## Known Issues 🤪

- **Network Issues:** If geocoding fails, check your internet connection
- **Large Files:** Resume files larger than 16MB may not upload
- **Browser Compatibility:** Best experience on modern browsers in desktop mode

---

## Usage Guide 📖

### **For Job Seekers:**
1. Upload your resume (PDF format)
2. Wait for AI analysis to complete
3. Review your resume score and recommendations
4. Implement suggested improvements
5. Re-test your updated resume

### **For Recruiters:**
1. Access admin panel with provided credentials
2. View candidate analytics and statistics
3. Export data for further analysis
4. Use insights for hiring decisions

### **Sample Resume:**
Try the tool with the sample resume in `App/Uploaded_Resumes/` folder!

---

## Roadmap 🛵

- ✅ Predict user experience level
- ✅ Resume scoring for skills and projects  
- ✅ Multi-domain recommendations (Web, Mobile, Data Science)
- 🔄 **In Progress:** Advanced ML models for better predictions
- 📅 **Planned:** Integration with job portals
- 📅 **Planned:** Resume builder tool
- 📅 **Planned:** Interview scheduling system
- 📅 **Planned:** Mobile app version

---

## Contributing 🤘

Contributions are always welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

For major changes, please open an issue first to discuss your ideas.

---

## Preview 👽

### **Client Side**

#### **Main Dashboard**
![Main Screen](./screenshots/user/1-main-screen.png)

#### **Resume Analysis**
![Analysis](./screenshots/user/2-analysis.jpg)

#### **Smart Recommendations**
![Recommendations](./screenshots/user/3-recom.png)

#### **Skill Enhancement**
![Skills](./screenshots/user/4-recom.png)

#### **Performance Scoring**
![Scoring](./screenshots/user/5-tipsscore.png)

### **Admin Panel**

#### **Analytics Dashboard**
![Admin Dashboard](./screenshots/admin/1-main-screen.png)

#### **User Data Management**
![User Data](./screenshots/admin/2-user-data.png)

#### **Export Analytics**
![CSV Export](./screenshots/admin/3-user-datacsv.png)

#### **Visual Analytics**
![Charts](./screenshots/admin/5-pieexp.png)

### **Feedback System**

#### **User Feedback**
![Feedback Form](./screenshots/feedback/1-form.png)

#### **Analytics Overview**
![Feedback Analytics](./screenshots/feedback/2-analytics.png)

---

## Support 🤝

- **Issues:** [GitHub Issues](https://github.com/18vikastg/ai-resume-analyser/issues)
- **Discussions:** [GitHub Discussions](https://github.com/18vikastg/ai-resume-analyser/discussions)
- **Email:** vikas.tg.dev@gmail.com

---

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 🤗

- **spaCy Team** - For excellent NLP capabilities
- **Streamlit** - For the amazing web framework
- **pyresparser** - For resume parsing functionality
- **Plotly** - For interactive visualizations
- **Open Source Community** - For continuous inspiration

---

<div align="center">

### **Built with 🤍 by [Vikas TG](https://github.com/18vikastg)**

**AI Resume Analyzer - Empowering Careers with Intelligence** 

[![GitHub](https://img.shields.io/badge/GitHub-18vikastg-181717?style=for-the-badge&logo=github)](https://github.com/18vikastg)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vikas--tg-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vikas-tg)

**Star ⭐ this repository if it helped you!**

</div>

### 💡 The Vision Behind This Project

As a developer passionate about AI and career development, I recognized the need for an intelligent system that could:
- Automatically parse and analyze resume content
- Provide data-driven insights and recommendations  
- Help job seekers optimize their profiles effectively
- Offer recruiters powerful analytics and insights

### ✨ Core Features I've Built

🔍 **Smart Resume Parsing Engine**
- Advanced PDF text extraction and processing
- Intelligent skill identification and categorization
- Automatic experience level detection

📊 **AI-Powered Analysis Dashboard**
- Comprehensive resume scoring algorithm
- Skill gap analysis with industry standards
- Experience level prediction (Fresher/Intermediate/Experienced)

💡 **Personalized Recommendation System**
- Field-specific skill recommendations
- Curated course suggestions from top platforms
- Career advancement tips and strategies

📈 **Advanced Analytics Platform**
- Real-time user engagement metrics
- Geographic distribution analysis
- Skill trend visualization with interactive charts
- Complete admin dashboard with data export capabilities

🗄️ **Robust Database Integration**
- MySQL database with optimized schema
- Secure user data management
- Session-based state management
- Real-time feedback collection system

## 🛠️ Technology Stack I Used

| Category | Technologies |
|----------|-------------|
| **Frontend** | Streamlit, HTML, CSS, JavaScript |
| **Backend** | Python 3.8+, Streamlit Framework |
| **Database** | MySQL 8.0+ with PyMySQL connector |
| **AI/ML Libraries** | NLTK, spaCy, scikit-learn |
| **Data Processing** | pandas, numpy, pdfminer3 |
| **Visualization** | Plotly, matplotlib |
| **Other Tools** | pyresparser, PIL, io, base64 |

## 🎯 Application Architecture

### 🖥️ User Interface Features
- **Resume Upload & Analysis**: Drag-and-drop PDF processing with real-time feedback
- **Smart Skill Detection**: AI-powered extraction of technical and soft skills  
- **Career Recommendations**: Personalized suggestions based on industry trends
- **Interactive Scoring**: Comprehensive resume evaluation with improvement tips

### 🔧 Admin Dashboard Capabilities  
- **User Analytics**: Complete user data management with CSV export functionality
- **Visual Analytics**: Interactive pie charts for ratings, experience levels, and geographic distribution
- **Feedback Management**: Real-time user feedback collection and analysis system
- **Data Export**: Structured data export for further analysis and reporting

### 📊 Advanced Analytics I Implemented
- **Geographic Insights**: City, state, and country-wise user distribution analysis
- **Skill Trending**: Popular skills and career field analytics
- **Performance Metrics**: Resume scoring patterns and user engagement tracking  
- **Feedback Analytics**: Rating distribution and user satisfaction metrics

## 🚀 Quick Start & Installation

### Prerequisites
- Python 3.8 or higher
- MySQL 8.0 or higher  
- Git
- Visual Studio Code (recommended)

### 🔧 Setup Instructions

**1. Clone the Repository**
```bash
git clone https://github.com/18vikastg/ai-resume-analyser.git
cd ai-resume-analyser
```

**2. Create Virtual Environment**
```bash
python -m venv .venv

# On Linux/Mac:
source .venv/bin/activate

# On Windows:
.venv\Scripts\activate
```

**3. Install Dependencies**
```bash
cd App
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python -c "import nltk; nltk.download('stopwords')"
```

**4. Database Configuration**
```sql
-- Create database in MySQL
CREATE DATABASE resume_analyzer_db;
USE resume_analyzer_db;

-- Tables will be created automatically by the application
```

**5. Configure Application**
- Update `App/config.py` with your MySQL credentials:
```python
DB_HOST = "localhost"
DB_USER = "your_username" 
DB_PASSWORD = "your_password"
DB_NAME = "resume_analyzer_db"
```

**6. Run the Application**
```bash
streamlit run App.py
```

Visit `http://localhost:8501` to access the application!

### 🔐 Default Admin Access
- **Username:** `admin`
- **Password:** `admin@resume-analyzer`

> ⚠️ **Security Note:** Change these credentials in production environment

## 🌐 Cloud Deployment Options

### Streamlit Community Cloud (Recommended)
1. Push your code to GitHub
2. Visit [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub account and select this repository
4. Set main file path: `App/App.py`
5. Add your database credentials to secrets
6. Deploy!

### Other Free Platforms
- **Heroku** - Full-stack deployment with database addon
- **Railway** - Modern deployment with MySQL support  
- **PythonAnywhere** - Python-focused hosting platform
- **Render** - Free tier with database integration

## 💡 How to Use

1. **For Job Seekers:**
   - Upload your PDF resume
   - Get instant analysis and scoring
   - Receive personalized skill recommendations
   - Access curated course suggestions

2. **For Administrators:**
   - Login with admin credentials
   - View comprehensive user analytics
   - Export data for further analysis
   - Monitor feedback and ratings

## 🛣️ Development Roadmap

- ✅ **Advanced Resume Parsing** - Complete PDF analysis with skill extraction
- ✅ **AI-Powered Scoring** - Comprehensive resume evaluation system  
- ✅ **Smart Recommendations** - Personalized skill and course suggestions
- ✅ **Admin Analytics** - Interactive dashboards with data visualization
- ✅ **Database Integration** - Complete MySQL integration with session management
- 🔄 **Enhanced ML Models** - Improved prediction accuracy
- 🔄 **Additional Career Fields** - Support for more industry verticals
- 🔄 **Advanced Analytics** - More detailed user insights and trends

## 📸 Application Screenshots

### 🖥️ User Interface

**Main Dashboard**
![Main Interface](screenshots/user/1-main-screen.png)

**Resume Analysis Results**
![Resume Analysis](screenshots/user/2-analysis.jpg)

**Skill Recommendations**
![Skill Recommendations](screenshots/user/3-recom.png)

**Course Suggestions**
![Course Recommendations](screenshots/user/4-recom.png)

### 🔧 Admin Dashboard

**Admin Analytics**
![Admin Dashboard](screenshots/admin/1-main-screen.png)

**User Data Management**
![User Data](screenshots/admin/2-user-data.png)

**Interactive Analytics**
![Analytics Charts](screenshots/admin/5-pieexp.png)

### 💬 Feedback System

**User Feedback Form**
![Feedback Form](screenshots/feedback/1-form.png)

**Feedback Analytics**
![Feedback Analytics](screenshots/feedback/2-analytics.png)

## 🤝 Contributing

I welcome contributions to make this project even better! Here's how you can contribute:

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/amazing-feature`)
3. **Commit Your Changes** (`git commit -m 'Add amazing feature'`)
4. **Push to Branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### 📋 Contribution Guidelines
- Ensure code follows Python best practices
- Add comments for complex algorithms
- Update documentation for new features
- Test thoroughly before submitting PR

## 🐛 Known Issues & Solutions

### Common Issues
- **GeocoderUnavailable Error**: Check internet connection and network speed
- **Database Connection Issues**: Verify MySQL credentials in `config.py`
- **Module Import Errors**: Ensure all dependencies are installed correctly

### 🔧 Troubleshooting
For installation or setup issues, please:
1. Check the [Issues](https://github.com/18vikastg/ai-resume-analyser/issues) page
2. Create a new issue with detailed error logs
3. Include your system information (OS, Python version, etc.)

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Open Source Community** - For the amazing libraries and frameworks
- **Streamlit Team** - For the excellent web app framework
- **Contributors** - Everyone who helped improve this project
- **Users** - For valuable feedback and suggestions

## 📞 Contact & Support

**Vikas TG** - *Full Stack Developer & AI Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-18vikastg-181717?style=flat&logo=github)](https://github.com/18vikastg)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vikas%20TG-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/vikastg)
[![Email](https://img.shields.io/badge/Email-vikastg.dev%40gmail.com-D14836?style=flat&logo=gmail)](mailto:vikastg.dev@gmail.com)

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

*Built with ❤️ by [Vikas TG](https://github.com/18vikastg)*

**🚀 [Deploy on Streamlit Cloud](https://share.streamlit.io) | 📚 [View Documentation](https://github.com/18vikastg/ai-resume-analyser/blob/main/README.md) | 🐛 [Report Issues](https://github.com/18vikastg/ai-resume-analyser/issues)**

</div>
