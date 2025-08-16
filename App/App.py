# Developed by Vikas TG [https://github.com/18vikastg]    Made with Streamlit


###### Packages Used ######
import streamlit as st # core package used in this project
import pandas as pd
import base64, random
import time,datetime
import pymysql
import os
import socket
import platform
import geocoder
import secrets
import io,random
import plotly.express as px # to create visualisations at the admin session
import plotly.graph_objects as go
from geopy.geocoders import Nominatim

# NLTK setup for Streamlit Cloud
import nltk
import ssl

# Handle SSL certificate issues for NLTK downloads
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download NLTK data if not present
@st.cache_resource
def setup_nltk_and_spacy():
    """Download and setup NLTK data and spaCy models"""
    # NLTK setup
    nltk_downloads = ['punkt', 'stopwords', 'averaged_perceptron_tagger', 'wordnet', 'omw-1.4']
    
    for item in nltk_downloads:
        try:
            # Try different possible locations for NLTK data
            try:
                nltk.data.find(f'tokenizers/{item}')
            except LookupError:
                try:
                    nltk.data.find(f'corpora/{item}')
                except LookupError:
                    try:
                        nltk.data.find(f'taggers/{item}')
                    except LookupError:
                        print(f"Downloading NLTK {item}...")
                        nltk.download(item, quiet=True)
        except Exception as e:
            print(f"Error downloading NLTK {item}: {e}")
    
    # spaCy model setup with multiple approaches
    try:
        import spacy
        print("🔧 Setting up spaCy models...")
        
        # Try to load the model first
        try:
            nlp = spacy.load('en_core_web_sm')
            print("✅ spaCy en_core_web_sm model already available")
            return True
        except OSError:
            print("📥 spaCy model not found, attempting to download...")
            
            # Method 1: Try pip install
            try:
                import subprocess
                import sys
                print("🔄 Attempting pip install of spaCy model...")
                subprocess.check_call([sys.executable, "-m", "pip", "install", 
                                     "https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.4.1/en_core_web_sm-3.4.1-py3-none-any.whl"])
                print("✅ spaCy model installed via pip")
                return True
            except Exception as e1:
                print(f"❌ Pip install failed: {e1}")
                
                # Method 2: Try spacy download command
                try:
                    print("🔄 Attempting spacy download command...")
                    subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
                    print("✅ spaCy model downloaded via spacy command")
                    return True
                except Exception as e2:
                    print(f"❌ Spacy download failed: {e2}")
                    
                    # Method 3: Download and link manually
                    try:
                        print("🔄 Attempting manual download...")
                        subprocess.check_call([sys.executable, "-m", "pip", "install", 
                                             "https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.4.1/en_core_web_sm-3.4.1.tar.gz"])
                        subprocess.check_call([sys.executable, "-m", "spacy", "link", "en_core_web_sm"])
                        print("✅ spaCy model manually installed and linked")
                        return True
                    except Exception as e3:
                        print(f"❌ Manual download failed: {e3}")
                        return False
    except Exception as e:
        print(f"❌ Error setting up spaCy: {e}")
        return False

# Setup NLTK and spaCy before importing pyresparser
spacy_available = setup_nltk_and_spacy()

# libraries used to parse the pdf files
# Conditional import of pyresparser based on spaCy availability
try:
    if spacy_available:
        from pyresparser import ResumeParser
        print("✅ pyresparser imported successfully")
    else:
        print("⚠️ pyresparser not available - using fallback parser")
        ResumeParser = None
except Exception as e:
    print(f"⚠️ pyresparser import failed: {e}")
    ResumeParser = None

# Fallback resume parsing functions
def parse_resume_safely(file_path):
    """Safely parse resume with fallback methods"""
    try:
        # Method 1: Try pyresparser with spaCy
        if ResumeParser is not None:
            try:
                resume_data = ResumeParser(file_path).get_extracted_data()
                print("✅ Resume parsed successfully with pyresparser")
                return resume_data
            except Exception as e:
                print(f"⚠️ pyresparser failed: {e}")
        
        # Method 2: Fallback to basic text extraction
        print("🔄 Using fallback text extraction...")
        import PyPDF2
        
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        
        # Basic parsing without spaCy
        resume_data = {
            'name': extract_name_from_text(text),
            'email': extract_email_from_text(text),
            'mobile_number': extract_phone_from_text(text),
            'skills': extract_skills_from_text(text),
            'college_name': extract_education_from_text(text),
            'degree': extract_degree_from_text(text),
            'designation': extract_designation_from_text(text),
            'experience': extract_experience_from_text(text),
            'company_names': extract_companies_from_text(text),
            'no_of_pages': len(pdf_reader.pages)
        }
        
        print("✅ Resume parsed successfully with fallback method")
        return resume_data
        
    except Exception as e:
        print(f"❌ All parsing methods failed: {e}")
        return {
            'name': 'Unable to extract',
            'email': 'Unable to extract',
            'mobile_number': 'Unable to extract',
            'skills': ['Data Analysis', 'Communication', 'Problem Solving'],  # Default skills
            'college_name': ['Unable to extract'],
            'degree': ['Unable to extract'],
            'designation': ['Unable to extract'],
            'experience': ['Unable to extract'],
            'company_names': ['Unable to extract'],
            'no_of_pages': 1  # Default to 1 page
        }

def extract_name_from_text(text):
    """Extract name from text using regex"""
    import re
    lines = text.split('\n')
    # Usually name is in the first few lines
    for line in lines[:5]:
        line = line.strip()
        if len(line) > 2 and len(line) < 50 and not any(char.isdigit() for char in line):
            # Check if it looks like a name (contains only letters and spaces)
            if re.match(r'^[A-Za-z\s\.]+$', line) and len(line.split()) <= 4:
                return line
    return "John Doe"  # Default name

def extract_email_from_text(text):
    """Extract email from text using regex"""
    import re
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else "user@example.com"

def extract_phone_from_text(text):
    """Extract phone number from text using regex"""
    import re
    phone_pattern = r'(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones = re.findall(phone_pattern, text)
    return ''.join(phones[0]) if phones else "+1-555-0123"

def extract_skills_from_text(text):
    """Extract skills from text using keyword matching"""
    common_skills = [
        'python', 'java', 'javascript', 'html', 'css', 'sql', 'react', 'node',
        'angular', 'vue', 'php', 'c++', 'c#', 'ruby', 'go', 'swift', 'kotlin',
        'flutter', 'dart', 'typescript', 'mongodb', 'mysql', 'postgresql',
        'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github',
        'machine learning', 'data science', 'artificial intelligence', 'ai',
        'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'sklearn',
        'excel', 'powerpoint', 'word', 'communication', 'leadership',
        'project management', 'data analysis', 'problem solving', 'teamwork'
    ]
    
    text_lower = text.lower()
    found_skills = []
    for skill in common_skills:
        if skill in text_lower:
            found_skills.append(skill.title())
    
    # If no skills found, provide some defaults
    if not found_skills:
        found_skills = ['Data Analysis', 'Communication', 'Problem Solving', 'Microsoft Office']
    
    return found_skills[:10]  # Return top 10 skills

def extract_education_from_text(text):
    """Extract education information"""
    education_keywords = ['university', 'college', 'institute', 'school', 'bachelor', 'master', 'phd']
    lines = text.split('\n')
    education = []
    
    for line in lines:
        for keyword in education_keywords:
            if keyword.lower() in line.lower() and len(line.strip()) > 5:
                education.append(line.strip())
                break
    
    return education[:3] if education else ['University/College Information Not Available']

def extract_degree_from_text(text):
    """Extract degree information"""
    degree_patterns = [
        r'\bb\.?tech\b', r'\bb\.?e\b', r'\bm\.?tech\b', r'\bm\.?e\b',
        r'\bb\.?sc\b', r'\bm\.?sc\b', r'\bbca\b', r'\bmca\b',
        r'\bmba\b', r'\bphd\b', r'\bms\b', r'\bbs\b', r'\bba\b',
        r'\bbachelor', r'\bmaster', r'\bdegree'
    ]
    
    import re
    degrees = []
    for pattern in degree_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        degrees.extend(matches)
    
    return list(set(degrees)) if degrees else ['Degree Information Not Available']

def extract_designation_from_text(text):
    """Extract job designations"""
    designations = [
        'software engineer', 'data scientist', 'product manager', 'developer',
        'analyst', 'consultant', 'manager', 'director', 'lead', 'senior',
        'junior', 'intern', 'trainee', 'associate', 'specialist', 'coordinator'
    ]
    
    text_lower = text.lower()
    found_designations = []
    
    for designation in designations:
        if designation in text_lower:
            found_designations.append(designation.title())
    
    return found_designations if found_designations else ['Professional']

def extract_experience_from_text(text):
    """Extract experience information"""
    import re
    exp_patterns = [
        r'(\d+)\s*years?\s*of\s*experience',
        r'(\d+)\s*years?\s*experience',
        r'experience\s*:\s*(\d+)\s*years?',
        r'(\d+)\+?\s*years?'
    ]
    
    for pattern in exp_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            return [f"{matches[0]} years of experience"]
    
    return ['Experience level not specified']

def extract_companies_from_text(text):
    """Extract company names (basic implementation)"""
    common_companies = [
        'google', 'microsoft', 'amazon', 'apple', 'facebook', 'meta',
        'netflix', 'uber', 'airbnb', 'spotify', 'twitter', 'linkedin',
        'salesforce', 'oracle', 'ibm', 'intel', 'nvidia', 'tesla',
        'accenture', 'deloitte', 'pwc', 'ey', 'kpmg', 'tcs', 'infosys',
        'wipro', 'hcl', 'cognizant'
    ]
    
    text_lower = text.lower()
    found_companies = []
    
    for company in common_companies:
        if company in text_lower:
            found_companies.append(company.title())
    
    return found_companies if found_companies else ['Previous work experience']
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import TextConverter
from streamlit_tags import st_tags
from PIL import Image
# pre stored data for prediction purposes
from Courses import ds_course,web_course,android_course,ios_course,uiux_course,resume_videos,interview_videos
try:
    import config
    print(f"✅ Config imported successfully! DB: {config.DB_NAME}")
except ImportError as e:
    print(f"❌ Config import failed: {e}")
    # Default configuration if config.py doesn't exist
    class Config:
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PASSWORD = 'Vikas@2004'  # Update this with your MySQL root password
        DB_NAME = 'resume_analyzer_db'
    config = Config()
    print("⚠️ Using fallback configuration")

nltk.download('stopwords')


###### Preprocessing functions ######


# Generates a link allowing the data in a given panda dataframe to be downloaded in csv format 
def get_csv_download_link(df,filename,text):
    csv = df.to_csv(index=False)
    ## bytes conversions
    b64 = base64.b64encode(csv.encode()).decode()      
    href = f'<a href="data:file/csv;base64,{b64}" download="{filename}">{text}</a>'
    return href


# Reads Pdf file and check_extractable
def pdf_reader(file):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    with open(file, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            page_interpreter.process_page(page)
            print(page)
        text = fake_file_handle.getvalue()

    ## close open handles
    converter.close()
    fake_file_handle.close()
    return text


# show uploaded file path to view pdf_display
def show_pdf(file_path):
    with open(file_path, "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')
    pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="700" height="1000" type="application/pdf"></iframe>'
    st.markdown(pdf_display, unsafe_allow_html=True)


# course recommendations which has data already loaded from Courses.py
def course_recommender(course_list):
    st.subheader("**Courses & Certificates Recommendations 👨‍🎓**")
    c = 0
    rec_course = []
    ## slider to choose from range 1-10
    no_of_reco = st.slider('Choose Number of Course Recommendations:', 1, 10, 5)
    random.shuffle(course_list)
    for c_name, c_link in course_list:
        c += 1
        st.markdown(f"({c}) [{c_name}]({c_link})")
        rec_course.append(c_name)
        if c == no_of_reco:
            break
    return rec_course


###### Database Stuffs ######

# sql connector
def init_database():
    try:
        print(f"🔍 Attempting database connection...")
        print(f"Host: {config.DB_HOST}")
        print(f"User: {config.DB_USER}")
        print(f"Database: {config.DB_NAME}")
        print(f"Password: {'*' * len(config.DB_PASSWORD)}")
        
        connection = pymysql.connect(
            host=config.DB_HOST,
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            db=config.DB_NAME
        )
        cursor = connection.cursor()
        print("✅ Database connection successful!")
        
        # Store in session state for persistence
        st.session_state.db_connection = connection
        st.session_state.db_cursor = cursor
        st.session_state.db_connected = True
        
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        st.warning(f"Database connection failed: {e}")
        st.info("The app will run in demo mode without database functionality.")
        st.session_state.db_connected = False
        return False


# inserting miscellaneous data, fetched results, prediction and recommendation into database
def insert_data(sec_token,ip_add,host_name,dev_user,os_name_ver,latlong,city,state,country,act_name,act_mail,act_mob,name,email,res_score,timestamp,no_of_pages,reco_field,cand_level,skills,recommended_skills,courses,pdf_name):
    # Get connection from session state
    connection = st.session_state.get('db_connection', None)
    cursor = st.session_state.get('db_cursor', None)
    
    if not connection or not cursor:
        st.warning("Database not connected. Data not saved.")
        return
        
    try:
        insert_sql = """INSERT INTO user_data 
        (sec_token, ip_add, host_name, dev_user, os_name_ver, latlong, city, state, country, 
         act_name, act_mail, act_mob, name, email, res_score, timestamp, no_of_pages, reco_field, 
         cand_level, skills, recommended_skills, courses, pdf_name) 
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        
        rec_values = (str(sec_token), str(ip_add), host_name, dev_user, os_name_ver, str(latlong), 
                     city, state, country, act_name, act_mail, act_mob, name, email, 
                     str(res_score), timestamp, str(no_of_pages), reco_field, cand_level, str(skills), 
                     str(recommended_skills), str(courses), pdf_name)
        cursor.execute(insert_sql, rec_values)
        connection.commit()
        st.success("✅ Data saved successfully!")
    except Exception as e:
        st.warning(f"Error saving data: {e}")


# inserting feedback data into user_feedback table
def insertf_data(feed_name,feed_email,feed_score,comments,Timestamp):
    # Get connection from session state
    connection = st.session_state.get('db_connection', None)
    cursor = st.session_state.get('db_cursor', None)
    
    if not connection or not cursor:
        st.warning("Database not available - feedback not saved")
        return
    try:
        insert_sql = """INSERT INTO user_feedback 
        (feed_name, feed_email, feed_score, comments) 
        VALUES (%s,%s,%s,%s)"""
        rec_values = (feed_name, feed_email, feed_score, comments)
        cursor.execute(insert_sql, rec_values)
        connection.commit()
        st.success("✅ Feedback saved successfully!")
    except Exception as e:
        st.warning(f"Error saving feedback: {e}")


###### Setting Page Configuration (favicon, Logo, Title) ######

# Set page config with fallback for favicon
try:
    # Try different possible icon paths
    icon_paths = [
        'Logo/recommend.png',
        './Logo/recommend.png',
        os.path.join(os.path.dirname(__file__), 'Logo', 'recommend.png')
    ]
    
    page_icon = "🚀"  # Default emoji fallback
    for icon_path in icon_paths:
        if os.path.exists(icon_path):
            page_icon = icon_path
            break
            
    st.set_page_config(
       page_title="AI Resume Analyzer",
       page_icon=page_icon,
    )
except:
    # Fallback to emoji if image fails
    st.set_page_config(
       page_title="AI Resume Analyzer",
       page_icon="🚀",
    )


###### Main function run() ######


def run():
    # Initialize database connection only if not already connected
    if 'db_connected' not in st.session_state or not st.session_state.get('db_connected', False):
        db_connected = init_database()
    else:
        db_connected = st.session_state.get('db_connected', False)
        
    if not db_connected:
        st.info("💡 Running in demo mode - some features may be limited")
    
    # (Logo, Heading, Sidebar etc)
    try:
        # Try different possible logo paths
        logo_paths = [
            'Logo/RESUM.png',
            './Logo/RESUM.png',
            os.path.join(os.path.dirname(__file__), 'Logo', 'RESUM.png'),
            '/mount/src/ai-resume-analyser/App/Logo/RESUM.png'  # Streamlit Cloud path
        ]
        
        img = None
        for logo_path in logo_paths:
            try:
                if os.path.exists(logo_path):
                    img = Image.open(logo_path)
                    break
            except:
                continue
        
        if img:
            st.image(img)
        else:
            # Fallback if logo not found
            st.markdown("# 🚀 AI Resume Analyzer")
            
    except Exception as e:
        # Fallback if any error with logo
        st.markdown("# 🚀 AI Resume Analyzer")
        
    st.sidebar.markdown("# Choose Something...")
    activities = ["User", "Feedback", "About", "Admin"]
    choice = st.sidebar.selectbox("Choose among the given options:", activities)
    link = '<b>Built with ❤️ by <a href="https://github.com/18vikastg" style="text-decoration: none; color: #021659;">Vikas TG</a></b>' 
    st.sidebar.markdown(link, unsafe_allow_html=True)
    st.sidebar.markdown('''
        <!-- site visitors -->

        <div id="sfct2xghr8ak6lfqt3kgru233378jya38dy" hidden></div>

        <noscript>
            <a href="https://www.freecounterstat.com" title="hit counter">
                <img src="https://counter9.stat.ovh/private/freecounterstat.php?c=t2xghr8ak6lfqt3kgru233378jya38dy" border="0" title="hit counter" alt="hit counter"> -->
            </a>
        </noscript>
    
        <p>Visitors <img src="https://counter9.stat.ovh/private/freecounterstat.php?c=t2xghr8ak6lfqt3kgru233378jya38dy" title="Free Counter" Alt="web counter" width="60px"  border="0" /></p>
    
    ''', unsafe_allow_html=True)

    ###### Creating Database and Table ######

    # Since database and tables already exist, we'll just ensure they're available
    cursor = st.session_state.get('db_cursor', None)
    if cursor is not None:
        try:
            # The database 'resume_analyzer_db' already exists, so we just use it
            cursor.execute("USE resume_analyzer_db;")
        except Exception as e:
            st.warning(f"Error accessing database: {e}")

    # Tables already exist in MySQL, so we don't need to recreate them

    ###### CODE FOR CLIENT SIDE (USER) ######

    if choice == 'User':
        
        # Collecting Miscellaneous Information
        act_name = st.text_input('Name*')
        act_mail = st.text_input('Mail*')
        act_mob  = st.text_input('Mobile Number*')
        sec_token = secrets.token_urlsafe(12)
        host_name = socket.gethostname()
        ip_add = socket.gethostbyname(host_name)
        try:
            dev_user = os.getlogin()
        except:
            dev_user = "unknown_user"
        os_name_ver = platform.system() + " " + platform.release()
        try:
            g = geocoder.ip('me')
            latlong = g.latlng
            geolocator = Nominatim(user_agent="http")
            location = geolocator.reverse(latlong, language='en')
            address = location.raw['address']
            cityy = address.get('city', '')
            statee = address.get('state', '')
        except:
            latlong = [0, 0]
            cityy = "Unknown"
            statee = "Unknown"
            countryy = "Unknown"
        try:
            countryy = address.get('country', '')
        except:
            countryy = "Unknown"
        city = cityy
        state = statee
        country = countryy


        # Upload Resume
        st.markdown('''<h5 style='text-align: left; color: #021659;'> Upload Your Resume, And Get Smart Recommendations</h5>''',unsafe_allow_html=True)
        
        ## file upload in pdf format
        pdf_file = st.file_uploader("Choose your Resume", type=["pdf"])
        if pdf_file is not None:
            with st.spinner('Hang On While We Cook Magic For You...'):
                time.sleep(4)
        
            ### saving the uploaded resume to folder
            # Create upload directory if it doesn't exist
            upload_dir = 'Uploaded_Resumes'
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir, exist_ok=True)
                
            save_image_path = os.path.join(upload_dir, pdf_file.name)
            pdf_name = pdf_file.name
            with open(save_image_path, "wb") as f:
                f.write(pdf_file.getbuffer())
            show_pdf(save_image_path)

            ### parsing and extracting whole resume with error handling
            try:
                resume_data = parse_resume_safely(save_image_path)
                if resume_data['name'] == 'Unable to extract':
                    st.warning("⚠️ Resume parsing had some issues, but we'll analyze what we can!")
                    st.info("💡 For better results, try a resume with clear text formatting.")
            except Exception as e:
                st.error(f"❌ Resume parsing failed: {str(e)}")
                st.info("💡 Using fallback analysis with default values.")
                # Provide completely fallback data
                resume_data = {
                    'name': 'Resume Analysis User',
                    'email': 'user@example.com',
                    'mobile_number': 'Contact information not extracted',
                    'skills': ['Data Analysis', 'Communication', 'Problem Solving'],
                    'college_name': ['Education information not available'],
                    'degree': ['Degree information not available'],
                    'designation': ['Professional'],
                    'experience': ['Experience not specified'],
                    'company_names': ['Previous work experience'],
                    'no_of_pages': 1
                }
                
            # We always have resume_data now (either real or fallback)
            if resume_data:
                
                ## Get the whole resume data into resume_text
                resume_text = pdf_reader(save_image_path)

                ## Showing Analyzed data from (resume_data)
                st.header("**Resume Analysis 🤘**")
                st.success("Hello "+ resume_data['name'])
                st.subheader("**Your Basic info 👀**")
                try:
                    st.text('Name: '+resume_data['name'])
                    st.text('Email: ' + resume_data['email'])
                    st.text('Contact: ' + resume_data['mobile_number'])
                    st.text('Degree: '+str(resume_data['degree']))                    
                    st.text('Resume pages: '+str(resume_data['no_of_pages']))

                except:
                    pass
                ## Predicting Candidate Experience Level 

                ### Trying with different possibilities
                cand_level = ''
                if resume_data['no_of_pages'] < 1:                
                    cand_level = "NA"
                    st.markdown( '''<h4 style='text-align: left; color: #d73b5c;'>You are at Fresher level!</h4>''',unsafe_allow_html=True)
                
                #### if internship then intermediate level
                elif 'INTERNSHIP' in resume_text:
                    cand_level = "Intermediate"
                    st.markdown('''<h4 style='text-align: left; color: #1ed760;'>You are at intermediate level!</h4>''',unsafe_allow_html=True)
                elif 'INTERNSHIPS' in resume_text:
                    cand_level = "Intermediate"
                    st.markdown('''<h4 style='text-align: left; color: #1ed760;'>You are at intermediate level!</h4>''',unsafe_allow_html=True)
                elif 'Internship' in resume_text:
                    cand_level = "Intermediate"
                    st.markdown('''<h4 style='text-align: left; color: #1ed760;'>You are at intermediate level!</h4>''',unsafe_allow_html=True)
                elif 'Internships' in resume_text:
                    cand_level = "Intermediate"
                    st.markdown('''<h4 style='text-align: left; color: #1ed760;'>You are at intermediate level!</h4>''',unsafe_allow_html=True)
                
                #### if Work Experience/Experience then Experience level
                elif 'EXPERIENCE' in resume_text:
                    cand_level = "Experienced"
                    st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at experience level!''',unsafe_allow_html=True)
                elif 'WORK EXPERIENCE' in resume_text:
                    cand_level = "Experienced"
                    st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at experience level!''',unsafe_allow_html=True)
                elif 'Experience' in resume_text:
                    cand_level = "Experienced"
                    st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at experience level!''',unsafe_allow_html=True)
                elif 'Work Experience' in resume_text:
                    cand_level = "Experienced"
                    st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at experience level!''',unsafe_allow_html=True)
                else:
                    cand_level = "Fresher"
                    st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at Fresher level!!''',unsafe_allow_html=True)


                ## Skills Analyzing and Recommendation
                st.subheader("**Skills Recommendation 💡**")
                
                ### Current Analyzed Skills
                keywords = st_tags(label='### Your Current Skills',
                text='See our skills recommendation below',value=resume_data['skills'],key = '1  ')

                ### Keywords for Recommendations
                ds_keyword = ['tensorflow','keras','pytorch','machine learning','deep Learning','flask','streamlit']
                web_keyword = ['react', 'django', 'node jS', 'react js', 'php', 'laravel', 'magento', 'wordpress','javascript', 'angular js', 'C#', 'Asp.net', 'flask']
                android_keyword = ['android','android development','flutter','kotlin','xml','kivy']
                ios_keyword = ['ios','ios development','swift','cocoa','cocoa touch','xcode']
                uiux_keyword = ['ux','adobe xd','figma','zeplin','balsamiq','ui','prototyping','wireframes','storyframes','adobe photoshop','photoshop','editing','adobe illustrator','illustrator','adobe after effects','after effects','adobe premier pro','premier pro','adobe indesign','indesign','wireframe','solid','grasp','user research','user experience']
                n_any = ['english','communication','writing', 'microsoft office', 'leadership','customer management', 'social media']
                ### Skill Recommendations Starts                
                recommended_skills = []
                reco_field = ''
                rec_course = ''

                ### condition starts to check skills from keywords and predict field
                for i in resume_data['skills']:
                
                    #### Data science recommendation
                    if i.lower() in ds_keyword:
                        print(i.lower())
                        reco_field = 'Data Science'
                        st.success("** Our analysis says you are looking for Data Science Jobs.**")
                        recommended_skills = ['Data Visualization','Predictive Analysis','Statistical Modeling','Data Mining','Clustering & Classification','Data Analytics','Quantitative Analysis','Web Scraping','ML Algorithms','Keras','Pytorch','Probability','Scikit-learn','Tensorflow',"Flask",'Streamlit']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '2')
                        st.markdown('''<h5 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost🚀 the chances of getting a Job</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = course_recommender(ds_course)
                        break

                    #### Web development recommendation
                    elif i.lower() in web_keyword:
                        print(i.lower())
                        reco_field = 'Web Development'
                        st.success("** Our analysis says you are looking for Web Development Jobs **")
                        recommended_skills = ['React','Django','Node JS','React JS','php','laravel','Magento','wordpress','Javascript','Angular JS','c#','Flask','SDK']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '3')
                        st.markdown('''<h5 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost🚀 the chances of getting a Job💼</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = course_recommender(web_course)
                        break

                    #### Android App Development
                    elif i.lower() in android_keyword:
                        print(i.lower())
                        reco_field = 'Android Development'
                        st.success("** Our analysis says you are looking for Android App Development Jobs **")
                        recommended_skills = ['Android','Android development','Flutter','Kotlin','XML','Java','Kivy','GIT','SDK','SQLite']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '4')
                        st.markdown('''<h5 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost🚀 the chances of getting a Job💼</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = course_recommender(android_course)
                        break

                    #### IOS App Development
                    elif i.lower() in ios_keyword:
                        print(i.lower())
                        reco_field = 'IOS Development'
                        st.success("** Our analysis says you are looking for IOS App Development Jobs **")
                        recommended_skills = ['IOS','IOS Development','Swift','Cocoa','Cocoa Touch','Xcode','Objective-C','SQLite','Plist','StoreKit',"UI-Kit",'AV Foundation','Auto-Layout']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '5')
                        st.markdown('''<h5 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost🚀 the chances of getting a Job💼</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = course_recommender(ios_course)
                        break

                    #### Ui-UX Recommendation
                    elif i.lower() in uiux_keyword:
                        print(i.lower())
                        reco_field = 'UI-UX Development'
                        st.success("** Our analysis says you are looking for UI-UX Development Jobs **")
                        recommended_skills = ['UI','User Experience','Adobe XD','Figma','Zeplin','Balsamiq','Prototyping','Wireframes','Storyframes','Adobe Photoshop','Editing','Illustrator','After Effects','Premier Pro','Indesign','Wireframe','Solid','Grasp','User Research']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '6')
                        st.markdown('''<h5 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost🚀 the chances of getting a Job💼</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = course_recommender(uiux_course)
                        break

                    #### For Not Any Recommendations
                    elif i.lower() in n_any:
                        print(i.lower())
                        reco_field = 'NA'
                        st.warning("** Currently our tool only predicts and recommends for Data Science, Web, Android, IOS and UI/UX Development**")
                        recommended_skills = ['No Recommendations']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Currently No Recommendations',value=recommended_skills,key = '6')
                        st.markdown('''<h5 style='text-align: left; color: #092851;'>Maybe Available in Future Updates</h5>''',unsafe_allow_html=True)
                        # course recommendation
                        rec_course = "Sorry! Not Available for this Field"
                        break


                ## Resume Scorer & Resume Writing Tips
                st.subheader("**Resume Tips & Ideas 🥂**")
                resume_score = 0
                
                ### Predicting Whether these key points are added to the resume
                if 'Objective' or 'Summary' in resume_text:
                    resume_score = resume_score+6
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Objective/Summary</h4>''',unsafe_allow_html=True)                
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add your career objective, it will give your career intension to the Recruiters.</h4>''',unsafe_allow_html=True)

                if 'Education' or 'School' or 'College'  in resume_text:
                    resume_score = resume_score + 12
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Education Details</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Education. It will give Your Qualification level to the recruiter</h4>''',unsafe_allow_html=True)

                if 'EXPERIENCE' in resume_text:
                    resume_score = resume_score + 16
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Experience</h4>''',unsafe_allow_html=True)
                elif 'Experience' in resume_text:
                    resume_score = resume_score + 16
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Experience</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Experience. It will help you to stand out from crowd</h4>''',unsafe_allow_html=True)

                if 'INTERNSHIPS'  in resume_text:
                    resume_score = resume_score + 6
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Internships</h4>''',unsafe_allow_html=True)
                elif 'INTERNSHIP'  in resume_text:
                    resume_score = resume_score + 6
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Internships</h4>''',unsafe_allow_html=True)
                elif 'Internships'  in resume_text:
                    resume_score = resume_score + 6
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Internships</h4>''',unsafe_allow_html=True)
                elif 'Internship'  in resume_text:
                    resume_score = resume_score + 6
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Internships</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Internships. It will help you to stand out from crowd</h4>''',unsafe_allow_html=True)

                if 'SKILLS'  in resume_text:
                    resume_score = resume_score + 7
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Skills</h4>''',unsafe_allow_html=True)
                elif 'SKILL'  in resume_text:
                    resume_score = resume_score + 7
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Skills</h4>''',unsafe_allow_html=True)
                elif 'Skills'  in resume_text:
                    resume_score = resume_score + 7
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Skills</h4>''',unsafe_allow_html=True)
                elif 'Skill'  in resume_text:
                    resume_score = resume_score + 7
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added Skills</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Skills. It will help you a lot</h4>''',unsafe_allow_html=True)

                if 'HOBBIES' in resume_text:
                    resume_score = resume_score + 4
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Hobbies</h4>''',unsafe_allow_html=True)
                elif 'Hobbies' in resume_text:
                    resume_score = resume_score + 4
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Hobbies</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Hobbies. It will show your personality to the Recruiters and give the assurance that you are fit for this role or not.</h4>''',unsafe_allow_html=True)

                if 'INTERESTS'in resume_text:
                    resume_score = resume_score + 5
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Interest</h4>''',unsafe_allow_html=True)
                elif 'Interests'in resume_text:
                    resume_score = resume_score + 5
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Interest</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Interest. It will show your interest other that job.</h4>''',unsafe_allow_html=True)

                if 'ACHIEVEMENTS' in resume_text:
                    resume_score = resume_score + 13
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Achievements </h4>''',unsafe_allow_html=True)
                elif 'Achievements' in resume_text:
                    resume_score = resume_score + 13
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Achievements </h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Achievements. It will show that you are capable for the required position.</h4>''',unsafe_allow_html=True)

                if 'CERTIFICATIONS' in resume_text:
                    resume_score = resume_score + 12
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Certifications </h4>''',unsafe_allow_html=True)
                elif 'Certifications' in resume_text:
                    resume_score = resume_score + 12
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Certifications </h4>''',unsafe_allow_html=True)
                elif 'Certification' in resume_text:
                    resume_score = resume_score + 12
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Certifications </h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Certifications. It will show that you have done some specialization for the required position.</h4>''',unsafe_allow_html=True)

                if 'PROJECTS' in resume_text:
                    resume_score = resume_score + 19
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Projects</h4>''',unsafe_allow_html=True)
                elif 'PROJECT' in resume_text:
                    resume_score = resume_score + 19
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Projects</h4>''',unsafe_allow_html=True)
                elif 'Projects' in resume_text:
                    resume_score = resume_score + 19
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Projects</h4>''',unsafe_allow_html=True)
                elif 'Project' in resume_text:
                    resume_score = resume_score + 19
                    st.markdown('''<h5 style='text-align: left; color: #1ed760;'>[+] Awesome! You have added your Projects</h4>''',unsafe_allow_html=True)
                else:
                    st.markdown('''<h5 style='text-align: left; color: #000000;'>[-] Please add Projects. It will show that you have done work related the required position or not.</h4>''',unsafe_allow_html=True)

                st.subheader("**Resume Score 📝**")
                
                st.markdown(
                    """
                    <style>
                        .stProgress > div > div > div > div {
                            background-color: #d73b5c;
                        }
                    </style>""",
                    unsafe_allow_html=True,
                )

                ### Score Bar
                my_bar = st.progress(0)
                score = 0
                for percent_complete in range(resume_score):
                    score +=1
                    time.sleep(0.1)
                    my_bar.progress(percent_complete + 1)

                ### Score
                st.success('** Your Resume Writing Score: ' + str(score)+'**')
                st.warning("** Note: This score is calculated based on the content that you have in your Resume. **")

                # print(str(sec_token), str(ip_add), (host_name), (dev_user), (os_name_ver), (latlong), (city), (state), (country), (act_name), (act_mail), (act_mob), resume_data['name'], resume_data['email'], str(resume_score), timestamp, str(resume_data['no_of_pages']), reco_field, cand_level, str(resume_data['skills']), str(recommended_skills), str(rec_course), pdf_name)


                ### Getting Current Date and Time
                ts = time.time()
                cur_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
                cur_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
                timestamp = str(cur_date+'_'+cur_time)


                ## Calling insert_data to add all the data into user_data                
                insert_data(str(sec_token), str(ip_add), (host_name), (dev_user), (os_name_ver), (latlong), (city), (state), (country), (act_name), (act_mail), (act_mob), resume_data['name'], resume_data['email'], str(resume_score), timestamp, str(resume_data['no_of_pages']), reco_field, cand_level, str(resume_data['skills']), str(recommended_skills), str(rec_course), pdf_name)

                ## Recommending Resume Writing Video
                st.header("**Bonus Video for Resume Writing Tips💡**")
                resume_vid = random.choice(resume_videos)
                st.video(resume_vid)

                ## Recommending Interview Preparation Video
                st.header("**Bonus Video for Interview Tips💡**")
                interview_vid = random.choice(interview_videos)
                st.video(interview_vid)

                ## On Successful Result 
                st.balloons()

            else:
                st.error('Something went wrong..')                


    ###### CODE FOR FEEDBACK SIDE ######
    elif choice == 'Feedback':   
        
        # timestamp 
        ts = time.time()
        cur_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
        cur_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
        timestamp = str(cur_date+'_'+cur_time)

        # Feedback Form
        with st.form("my_form"):
            st.write("Feedback form")            
            feed_name = st.text_input('Name')
            feed_email = st.text_input('Email')
            feed_score = st.slider('Rate Us From 1 - 5', 1, 5)
            comments = st.text_input('Comments')
            Timestamp = timestamp        
            submitted = st.form_submit_button("Submit")
            if submitted:
                ## Calling insertf_data to add dat into user feedback
                insertf_data(feed_name,feed_email,feed_score,comments,Timestamp)    
                ## Success Message 
                st.success("Thanks! Your Feedback was recorded.") 
                ## On Successful Submit
                st.balloons()    


        # query to fetch data from user feedback table
        connection = st.session_state.get('db_connection', None)
        cursor = st.session_state.get('db_cursor', None)
        
        if connection is not None and cursor is not None:
            try:
                # Fetch feedback data manually to avoid pandas warning
                cursor.execute('SELECT * FROM user_feedback')
                feedback_data = cursor.fetchall()
                
                if feedback_data:
                    # Get column names
                    cursor.execute('DESCRIBE user_feedback')
                    columns = [col[0] for col in cursor.fetchall()]
                    plotfeed_data = pd.DataFrame(feedback_data, columns=columns)
                else:
                    plotfeed_data = pd.DataFrame()

                # fetching feed_score from the query and getting the unique values and total value count 
                if not plotfeed_data.empty:
                    labels = plotfeed_data.feed_score.unique()
                    values = plotfeed_data.feed_score.value_counts()

                    # plotting pie chart for user ratings
                    st.subheader("**Past User Rating's**")
                    fig = px.pie(values=values, names=labels, title="Chart of User Rating Score From 1 - 5", color_discrete_sequence=px.colors.sequential.Aggrnyl)
                    st.plotly_chart(fig)

                #  Fetching Comment History
                cursor.execute('select feed_name, comments from user_feedback')
                plfeed_cmt_data = cursor.fetchall()
            except Exception as e:
                st.info("📊 Analytics not available in demo mode")
                plfeed_cmt_data = []
        else:
            st.info("📊 Analytics not available in demo mode")
            plfeed_cmt_data = []

        st.subheader("**User Comment's**")
        dff = pd.DataFrame(plfeed_cmt_data, columns=['User', 'Comment'])
        st.dataframe(dff, width=1000)

    
    ###### CODE FOR ABOUT PAGE ######
    elif choice == 'About':   

        st.subheader("**About The Tool - AI RESUME ANALYZER**")

        st.markdown('''

        <p align='justify'>
            A tool which parses information from a resume using natural language processing and finds the keywords, cluster them onto sectors based on their keywords. And lastly show recommendations, predictions, analytics to the applicant based on keyword matching.
        </p>

        <p align="justify">
            <b>How to use it: -</b> <br/><br/>
            <b>User -</b> <br/>
            In the Side Bar choose yourself as user and fill the required fields and upload your resume in pdf format.<br/>
            Just sit back and relax our tool will do the magic on it's own.<br/><br/>
            <b>Feedback -</b> <br/>
            A place where user can suggest some feedback about the tool.<br/><br/>
            <b>Admin -</b> <br/>
            For login use <b>admin</b> as username and <b>admin@resume-analyzer</b> as password.<br/>
            It will load all the required stuffs and perform analysis.
        </p><br/><br/>

        <p align="justify">
            Built with ❤️ by 
            <a href="https://github.com/18vikastg" style="text-decoration: none; color: grey;">Vikas TG</a>
        </p>

        ''',unsafe_allow_html=True)  


    ###### CODE FOR ADMIN SIDE (ADMIN) ######
    else:
        st.success('Welcome to Admin Side')

        #  Admin Login
        ad_user = st.text_input("Username")
        ad_password = st.text_input("Password", type='password')

        if st.button('Login'):
            
            ## Credentials 
            if ad_user == 'admin' and ad_password == 'admin@resume-analyzer':
                
                # Get connection from session state
                connection = st.session_state.get('db_connection', None)
                cursor = st.session_state.get('db_cursor', None)
                db_connected = st.session_state.get('db_connected', False)
                
                if connection is not None and cursor is not None and db_connected:
                    try:
                        ### Fetch miscellaneous data from user_data(table) and convert it into dataframe
                        cursor.execute('''SELECT ID, ip_add, res_score, reco_field, cand_level, city, state, country from user_data''')
                        datanalys = cursor.fetchall()
                        plot_data = pd.DataFrame(datanalys, columns=['Idt', 'IP_add', 'resume_score', 'Predicted_Field', 'User_Level', 'City', 'State', 'Country'])
                        
                        ### Total Users Count with a Welcome Message
                        values = plot_data.Idt.count()
                        st.success("Welcome Admin ! Total %d " % values + " User's Have Used Our Tool : )")                
                        
                        ### Fetch user data from user_data(table) and convert it into dataframe
                        cursor.execute('''SELECT ID, sec_token, ip_add, act_name, act_mail, act_mob, reco_field, timestamp, name, email, res_score, no_of_pages, pdf_name, cand_level, skills, recommended_skills, courses, city, state, country, latlong, os_name_ver, host_name, dev_user from user_data''')
                        data = cursor.fetchall()                

                        st.header("**User's Data**")
                        df = pd.DataFrame(data, columns=['ID', 'Token', 'IP Address', 'Name', 'Mail', 'Mobile Number', 'Predicted Field', 'Timestamp',
                                                         'Predicted Name', 'Predicted Mail', 'Resume Score', 'Total Page',  'File Name',   
                                                         'User Level', 'Actual Skills', 'Recommended Skills', 'Recommended Course',
                                                         'City', 'State', 'Country', 'Lat Long', 'Server OS', 'Server Name', 'Server User',])
                        
                        ### Viewing the dataframe
                        st.dataframe(df)
                        
                        ### Downloading Report of user_data in csv file
                        st.markdown(get_csv_download_link(df,'User_Data.csv','Download Report'), unsafe_allow_html=True)

                        ### Fetch feedback data from user_feedback(table) and convert it into dataframe
                        cursor.execute('''SELECT * from user_feedback''')
                        data = cursor.fetchall()

                        st.header("**User's Feedback Data**")
                        df = pd.DataFrame(data, columns=['ID', 'Name', 'Email', 'Feedback Score', 'Comments', 'Timestamp'])
                        st.dataframe(df)

                        ### query to fetch data from user_feedback(table)
                        query = 'select * from user_feedback'
                        plotfeed_data = pd.read_sql(query, connection)                        

                        ### Analyzing All the Data's in pie charts

                        # fetching feed_score from the query and getting the unique values and total value count 
                        feed_score_counts = plotfeed_data.feed_score.value_counts()
                        
                        # Pie chart for user ratings
                        st.subheader("**User Rating's**")
                        if len(feed_score_counts) > 0:
                            fig = px.pie(values=feed_score_counts.values, names=feed_score_counts.index, 
                                       title="Chart of User Rating Score From 1 - 5 🤗", 
                                       color_discrete_sequence=px.colors.sequential.Aggrnyl)
                            st.plotly_chart(fig)
                        else:
                            st.info("No feedback data available for chart")

                        # fetching Predicted_Field from the query and getting the unique values and total value count                 
                        predicted_field_counts = plot_data.Predicted_Field.value_counts()

                        # Pie chart for predicted field recommendations
                        st.subheader("**Pie-Chart for Predicted Field Recommendation**")
                        if len(predicted_field_counts) > 0:
                            fig = px.pie(values=predicted_field_counts.values, names=predicted_field_counts.index, 
                                       title='Predicted Field according to the Skills 👽', 
                                       color_discrete_sequence=px.colors.sequential.Aggrnyl_r)
                            st.plotly_chart(fig)
                        else:
                            st.info("No predicted field data available for chart")

                        # fetching User_Level from the query and getting the unique values and total value count                 
                        user_level_counts = plot_data.User_Level.value_counts()

                        # Pie chart for User's👨‍💻 Experienced Level
                        st.subheader("**Pie-Chart for User's Experienced Level**")
                        if len(user_level_counts) > 0:
                            fig = px.pie(values=user_level_counts.values, names=user_level_counts.index, 
                                       title="Pie-Chart 📈 for User's 👨‍💻 Experienced Level", 
                                       color_discrete_sequence=px.colors.sequential.RdBu)
                            st.plotly_chart(fig)
                        else:
                            st.info("No user level data available for chart")

                        # fetching resume_score from the query and getting the unique values and total value count                 
                        resume_score_counts = plot_data.resume_score.value_counts()

                        # Pie chart for Resume Score
                        st.subheader("**Pie-Chart for Resume Score**")
                        if len(resume_score_counts) > 0:
                            fig = px.pie(values=resume_score_counts.values, names=resume_score_counts.index, 
                                       title='From 1 to 100 💯', 
                                       color_discrete_sequence=px.colors.sequential.Agsunset)
                            st.plotly_chart(fig)
                        else:
                            st.info("No resume score data available for chart")

                        # fetching IP_add from the query and getting the unique values and total value count 
                        ip_counts = plot_data.IP_add.value_counts()

                        # Pie chart for Users
                        st.subheader("**Pie-Chart for Users App Used Count**")
                        if len(ip_counts) > 0:
                            fig = px.pie(values=ip_counts.values, names=ip_counts.index, 
                                       title='Usage Based On IP Address 👥', 
                                       color_discrete_sequence=px.colors.sequential.matter_r)
                            st.plotly_chart(fig)
                        else:
                            st.info("No IP address data available for chart")

                        # fetching City from the query and getting the unique values and total value count 
                        city_counts = plot_data.City.value_counts()

                        # Pie chart for City
                        st.subheader("**Pie-Chart for City**")
                        if len(city_counts) > 0:
                            fig = px.pie(values=city_counts.values, names=city_counts.index, 
                                       title='Usage Based On City 🌆', 
                                       color_discrete_sequence=px.colors.sequential.Jet)
                            st.plotly_chart(fig)
                        else:
                            st.info("No city data available for chart")

                        # fetching State from the query and getting the unique values and total value count 
                        state_counts = plot_data.State.value_counts()

                        # Pie chart for State
                        st.subheader("**Pie-Chart for State**")
                        if len(state_counts) > 0:
                            fig = px.pie(values=state_counts.values, names=state_counts.index, 
                                       title='Usage Based on State 🚉', 
                                       color_discrete_sequence=px.colors.sequential.PuBu_r)
                            st.plotly_chart(fig)
                        else:
                            st.info("No state data available for chart")

                        # fetching Country from the query and getting the unique values and total value count 
                        country_counts = plot_data.Country.value_counts()

                        # Pie chart for Country
                        st.subheader("**Pie-Chart for Country**")
                        if len(country_counts) > 0:
                            fig = px.pie(values=country_counts.values, names=country_counts.index, 
                                       title='Usage Based on Country 🌏', 
                                       color_discrete_sequence=px.colors.sequential.Purpor_r)
                            st.plotly_chart(fig)
                        else:
                            st.info("No country data available for chart")
                        
                    except Exception as e:
                        st.error(f"Error in admin dashboard: {str(e)}")
                        st.info("Some charts may not display correctly. Core data is still available above.")
                else:
                    st.warning("Database not connected. Please configure database settings.")
                    st.info("Set up MySQL database using the provided schema to enable admin features.")

            ## For Wrong Credentials
            else:
                st.error("Wrong ID & Password Provided")

# Calling the main (run()) function to make the whole process run
run()
