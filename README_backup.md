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

<!-- TechStack -->
## Tech Stack 🍻
<details>
  <summary>Frontend</summary>
  <ul>
    <li><a href="https://streamlit.io/">Streamlit</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Learn/HTML">HTML</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript">JavaScript</a></li>
  </ul>
</details>

<details>
  <summary>Backend</summary>
  <ul>
    <li><a href="https://streamlit.io/">Streamlit</a></li>
    <li><a href="https://www.python.org/">Python</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mysql.com/">MySQL</a></li>
  </ul>
</details>

<details>
<summary>Modules</summary>
  <ul>
    <li><a href="https://pandas.pydata.org/">pandas</a></li>
    <li><a href="https://github.com/OmkarPathak/pyresparser">pyresparser</a></li>
    <li><a href="https://pypi.org/project/pdfminer3/">pdfminer3</a></li>
    <li><a href="https://plotly.com/">Plotly</a></li>
    <li><a href="https://www.nltk.org/">NLTK</a></li>
  </ul>
</details>

<!-- Features -->
## Key Features 🌟

✨ **Resume Parsing & Analysis**
- Extract comprehensive information from PDF resumes
- Natural language processing for skill identification
- Automated categorization of technical and soft skills

📊 **Smart Recommendations**
- Personalized course suggestions based on skill gaps
- Career path recommendations
- Industry-specific insights and analytics

🎯 **Scoring System**
- Resume quality scoring with detailed feedback
- Skill match analysis for specific job roles
- Performance benchmarking against industry standards

📈 **Analytics Dashboard**
- Visual representation of skills distribution
- Geographic analytics of candidates
- Trend analysis for HR insights

🔒 **Admin Panel**
- Comprehensive user data management
- Feedback collection and analysis
- Export functionality for data analytics
### Client: -
- Fetching Location and Miscellaneous Data

  Using Parsing Techniques to fetch
- Basic Info
- Skills
- Keywords

Using logical programs, it will recommend
- Skills that can be added
- Predicted job role
- Course and certificates
- Resume tips and ideas
- Overall Score
- Interview & Resume tip videos

### Admin: -
- Get all applicant’s data into tabular format
- Download user’s data into csv file
- View all saved uploaded pdf in Uploaded Resume folder
- Get user feedback and ratings
  
  Pie Charts for: -
- Ratings
- Predicted field / roles
- Experience level
- Resume score
- User count
- City
- State
- Country

### Feedback: -
- Form filling
- Rating from 1 – 5
- Show overall ratings pie chart
- Past user comments history 

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

## Setup & Installation �

### Quick Setup (Automated)

1. **Clone the repository**
```bash
git clone https://github.com/18vikastg/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

2. **Run the setup script**
```bash
./setup.sh
```

### Manual Setup

#### Prerequisites
- Python 3.7+ 
- MySQL 8.0+
- Git

#### Installation Steps

1. **Clone and navigate to the project**
```bash
git clone https://github.com/18vikastg/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

2. **Create and activate virtual environment**
```bash
python -m venv resume_analyzer_env

# On Linux/Mac:
source resume_analyzer_env/bin/activate

# On Windows:
resume_analyzer_env\Scripts\activate
```

3. **Install dependencies**
```bash
cd App
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

4. **Database Setup**
```bash
# Login to MySQL and run:
mysql -u root -p < ../database_schema.sql
```

5. **Configure the application**
   - Copy `App/config.py` and update your database credentials
   - Update MySQL password and database name as needed

6. **Run the application**
```bash
streamlit run App.py
```

The application will be available at `http://localhost:8501`

### Default Admin Credentials
- **Username:** admin
- **Password:** admin@resume-analyzer

⚠️ **Important:** Change these credentials in production!

Go to ```venvapp\Lib\site-packages\pyresparser``` folder

And replace the ```resume_parser.py``` with ```resume_parser.py``` 

which was provided by me inside ```pyresparser``` folder

``Congratulations 🥳😱 your set-up 👆 and installation is finished 😵🤯``

I hope that your ``venvapp`` is activated and working directory is inside ``App``

Run the ```App.py``` file using
```bash
streamlit run App.py

```

## Known Error 🤪
If ``GeocoderUnavailable`` error comes up then just check your internet connection and network speed

## Issue While Installation and Set-up 🤧

Feel free to open an issue on [GitHub](https://github.com/18vikastg/AI-Resume-Analyzer/issues) if you encounter any problems during installation or setup.

## Usage
- After the setup it will do stuff's automatically
- You just need to upload a resume and see it's magic
- Try first with my resume uploaded in ``Uploaded_Resumes`` folder
- Admin userid is ``admin`` and password is ``admin@resume-analyzer``

<!-- Roadmap -->
## Roadmap 🛵
* [x] Predict user experience level.
* [x] Add resume scoring criteria for skills and projects.
* [x] Added fields and recommendations for web, android, ios, data science.
* [ ] Add more fields for other roles, and its recommendations respectively. 
* [x] Fetch more details from users resume.
* [ ] View individual user details.

## Contributing 🤘
Pull requests are welcome. 

For major changes, please open an issue first to discuss what you would like to change.

I've attached the <a href="https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/RESUME%20ANALYSER%20SYNOPSIS.pdf">synopsis</a> of the project

If you want the full report of project
<a href="mailto:dnoobnerd@gmail.com?subject=I%20Want%20The%20Project%20Report%20of%20AI-RESUME-ANALYZER%20(2022%20-%2023)&body=Here%20Are%20My%20Details%20%F0%9F%98%89%0D%0A%0D%0AOrganization%2FCollege%20Name%3A%20%0D%0A%0D%0AFull%20Name%3A%20%0D%0A%0D%0AGitHub%20Profile%20%3A%20%0D%0A%0D%0AFrom%20where%20did%20you%20get%20to%20know%20about%20this%20project%3A%0D%0A%0D%0APurpose%20of%20asking%20project%20report%20(describe)%3A%0D%0A%0D%0A%0D%0AIf%20the%20above%20information%20satisfy%20your%20identity%20you%20will%20get%20the%20report%20to%20your%20email.">Email Me</a> ``it's FREE``

## Acknowledgement 🤗
- <a href="https://www.linkedin.com/in/mrbriit/">Dr Bright</a> - <a href="https://www.udemy.com/course/the-full-stack-data-scientist-bootcamp/">(The Full Stack Data Scientist BootCamp)</a>
- <a href="https://www.academia.edu/32543544/Resume_Parser_with_Natural_Language_Processing">Resume Parser with Natural Language Processing</a>
- <a href="https://github.com/OmkarPathak/pyresparser">pyresparser</a>

## Preview 👽

### Client Side

**Main Screen**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/1-main-screen.png?raw=true)

**Resume Analysis**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/2-analysis.jpg?raw=true)

**Skill Recommendation**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/3-recom.png?raw=true)

**Course Recommendation**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/4-recom.png?raw=true)

**Tips and Overall Score**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/5-tipsscore.png?raw=true)

**Video Recommendation**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/user/6-recom.png?raw=true)

### Feedback

**Feedback Form**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/feedback/1-form.png?raw=true)

**Overall Rating Analysis and Comment History**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/feedback/2-analytics.png?raw=true)

### Admin

**Login**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/1-main-screen.png?raw=true)

**User Count and it's data**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/2-user-data.png?raw=true)

**Exported csv file**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/3-user-datacsv.png?raw=true)

**Feedback Data**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/4-feed-data.png?raw=true)

**Pie Chart Analytical Representation of clusters**

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/5-pieexp.png?raw=true)

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/6-piescre.jpg?raw=true)

![Screenshot](https://github.com/18vikastg/AI-Resume-Analyzer/blob/main/screenshots/admin/7-pielocation.png?raw=true)

### Built with ❤️ AI RESUME ANALYZER by <a href="https://github.com/18vikastg">Vikas TG</a>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing libraries used in this project
- Special thanks to all contributors and users who provide feedback

## 📞 Support

If you found this project helpful, please give it a ⭐!

For support, create an issue or contact via [GitHub](https://github.com/18vikastg/AI-Resume-Analyzer/issues).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/18vikastg">Vikas TG</a>
  <br>
  <sub>⭐ If this helped you, please star this repository!</sub>
</div>
