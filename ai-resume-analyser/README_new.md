# 🚀 AI Resume Analyzer

<div align="center">
  
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://python.org)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28%2B-red.svg)](https://streamlit.io)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-orange.svg)](https://mysql.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**🎯 A comprehensive AI-powered resume analysis tool built with cutting-edge machine learning and NLP techniques**

</div>

---

## 🌟 Project Overview

The **AI Resume Analyzer** is an intelligent web application I developed to revolutionize how resumes are analyzed and optimized. This tool combines advanced Natural Language Processing, Machine Learning algorithms, and an intuitive Streamlit interface to provide comprehensive resume analysis, personalized recommendations, and detailed analytics.

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
