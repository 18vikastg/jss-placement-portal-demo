# AI Resume Analyzer 🚀

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=flat&logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)
![spaCy](https://img.shields.io/badge/spaCy-09A3D5?style=flat&logo=spacy&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

**AI-powered resume analysis tool with intelligent recommendations and analytics**

[🌐 Live Demo](https://ai-resume-analyser.railway.app) • [⚡ Quick Start](#quick-start) • [🚀 Deploy](#deployment)

Built by **Vikas TG**

</div>

---

## Features

### **Resume Analysis**
- Extract skills, experience, education from PDF resumes
- AI-powered job role predictions
- Resume scoring with improvement suggestions
- Skills gap analysis and recommendations

### **Analytics Dashboard**
- User data management and export
- Interactive charts and statistics
- Feedback system with ratings
- Geographic distribution analytics

### **Smart Recommendations**
- Personalized skill suggestions
- Course and certification recommendations
- Career path guidance
- Interview preparation tips

---

## Tech Stack

**Backend:** Python, spaCy, NLTK, Pandas  
**Frontend:** Streamlit  
**Database:** MySQL (optional - works without DB)  
**Deployment:** Railway, Docker  
**ML/NLP:** pyresparser, scikit-learn, Plotly  

---

## Quick Start

1. **Clone and setup**
   ```bash
   git clone https://github.com/18vikastg/ai-resume-analyser.git
   cd ai-resume-analyser
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

3. **Run the app**
   ```bash
   streamlit run App/App.py
   ```

4. **Access at** `http://localhost:8501`

**Admin Login:** `admin` / `admin@resume-analyzer`

---

## Deployment

### Railway (Recommended)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/github)

1. Fork this repository
2. Connect to Railway
3. Deploy automatically

### Alternative Options
- **Render:** Use included `render.yaml`
- **Docker:** `docker build -t ai-resume-analyzer .`
- **Heroku:** Use included `Procfile`

---

## Database Setup (Optional)

The app works perfectly without a database. For full features:

1. Create MySQL database: `resume_analyzer_db`
2. Update credentials in `App/config.py`

---

## Usage

1. **Upload PDF resume** → AI analysis begins
2. **View analysis results** → Skills, experience, scores
3. **Get recommendations** → Improve resume based on suggestions
4. **Admin panel** → View analytics and manage data

---

## Screenshots

### Main Dashboard
![Dashboard](./screenshots/user/1-main-screen.png)

### Resume Analysis
![Analysis](./screenshots/user/2-analysis.jpg)

### Admin Analytics
![Admin](./screenshots/admin/1-main-screen.png)

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push and create Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if it helped you!**

**Built with ❤️ by [Vikas TG](https://github.com/18vikastg)**

</div>
