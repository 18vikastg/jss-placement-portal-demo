# Database Configuration with Streamlit Cloud support
import streamlit as st
import os

# Try to get configuration from Streamlit secrets (for cloud deployment)
# If not available, fall back to local configuration
try:
    if hasattr(st, 'secrets') and 'mysql' in st.secrets:
        DB_HOST = st.secrets["mysql"]["host"]
        DB_USER = st.secrets["mysql"]["user"]
        DB_PASSWORD = st.secrets["mysql"]["password"]
        DB_NAME = st.secrets["mysql"]["database"]
    else:
        # Local development configuration
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PASSWORD = 'Vikas@2004'
        DB_NAME = 'resume_analyzer_db'
except:
    # Fallback to local configuration
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASSWORD = 'Vikas@2004'
    DB_NAME = 'resume_analyzer_db'

# Security
SECRET_KEY = 'vikas_resume_analyzer_2024'

# Application Settings
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'admin@resume-analyzer'

# File Upload Settings
UPLOAD_FOLDER = './Uploaded_Resumes/'
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB max file size
