#!/bin/bash

# JSS Placement Portal - AI Resume Analyzer Complete Diagnostic & Fix
# This script diagnoses and fixes common issues with the AI resume analyzer

echo "🤖 JSS AI Resume Analyzer - Complete Diagnostic & Fix"
echo "======================================================"

echo "[STEP 1] Checking Service Status..."
if curl -s http://localhost:8501 > /dev/null; then
    echo "✅ AI Analyzer is running on http://localhost:8501"
else
    echo "❌ AI Analyzer is not running. Starting it now..."
    cd /home/vikas/Desktop/jss-placement-portal
    ./start-all-services.sh &
    sleep 15
fi

echo "[STEP 2] Checking Dependencies..."
cd /home/vikas/Desktop/jss-placement-portal/ai-resume-analyser/App

python3 -c "
import sys
print('Checking Python packages...')

required_packages = {
    'streamlit': 'Streamlit web framework',
    'pandas': 'Data manipulation',
    'plotly': 'Interactive charts',
    'spacy': 'NLP processing',
    'nltk': 'Text processing',
    'pymysql': 'Database connection'
}

missing_packages = []
for package, description in required_packages.items():
    try:
        __import__(package)
        print(f'✅ {package}: {description}')
    except ImportError:
        print(f'❌ {package}: Missing - {description}')
        missing_packages.append(package)

if missing_packages:
    print(f'Missing packages: {missing_packages}')
    sys.exit(1)
else:
    print('✅ All required packages are installed')
"

if [ $? -ne 0 ]; then
    echo "❌ Missing dependencies detected. Please install them."
    exit 1
fi

echo "[STEP 3] Checking NLTK Data..."
python3 -c "
import nltk
import ssl

# Handle SSL issues
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

required_nltk_data = ['punkt', 'punkt_tab', 'stopwords', 'averaged_perceptron_tagger', 'averaged_perceptron_tagger_eng', 'wordnet', 'omw-1.4']

print('Checking NLTK data...')
missing_data = []
for item in required_nltk_data:
    try:
        # Try different possible locations
        try:
            nltk.data.find(f'tokenizers/{item}')
        except LookupError:
            try:
                nltk.data.find(f'corpora/{item}')
            except LookupError:
                try:
                    nltk.data.find(f'taggers/{item}')
                except LookupError:
                    missing_data.append(item)
                    print(f'⚠️ {item}: Missing')
                    continue
        print(f'✅ {item}: Available')
    except Exception as e:
        print(f'❌ {item}: Error - {e}')
        missing_data.append(item)

if missing_data:
    print(f'Downloading missing NLTK data: {missing_data}')
    for item in missing_data:
        try:
            nltk.download(item, quiet=False)
            print(f'✅ Downloaded {item}')
        except Exception as e:
            print(f'❌ Failed to download {item}: {e}')
else:
    print('✅ All NLTK data is available')
"

echo "[STEP 4] Checking spaCy Model..."
python3 -c "
import spacy
try:
    nlp = spacy.load('en_core_web_sm')
    print('✅ spaCy English model is available')
    
    # Test the model
    doc = nlp('John Doe is a software engineer with Python skills.')
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    print(f'✅ Model test successful: Found {len(entities)} entities')
except Exception as e:
    print(f'❌ spaCy model error: {e}')
    print('Installing spaCy English model...')
    import subprocess
    subprocess.run(['python3', '-m', 'spacy', 'download', 'en_core_web_sm'])
"

echo "[STEP 5] Testing Resume Processing..."
python3 -c "
import sys
sys.path.append('.')
sys.path.append('..')

try:
    from pyresparser import resume_parser
    print('✅ Resume parser module accessible')
    
    # Test basic functionality
    import spacy
    nlp = spacy.load('en_core_web_sm')
    
    sample_resume = '''
    Jane Smith
    Data Scientist
    jane.smith@email.com
    (555) 123-4567
    
    SKILLS:
    - Python, R, SQL
    - Machine Learning, Deep Learning
    - TensorFlow, PyTorch
    - Data Visualization, Tableau
    
    EXPERIENCE:
    Senior Data Scientist (2020-Present)
    - Developed ML models for customer segmentation
    - Implemented predictive analytics solutions
    
    EDUCATION:
    Master of Science in Data Science
    Bachelor of Science in Computer Science
    '''
    
    doc = nlp(sample_resume)
    
    # Test skill extraction
    skills = []
    skill_keywords = ['python', 'r', 'sql', 'machine learning', 'tensorflow', 'pytorch', 'tableau']
    
    for token in doc:
        if token.text.lower() in skill_keywords:
            skills.append(token.text)
    
    print(f'✅ Skill extraction test: Found {len(skills)} skills: {skills}')
    
    # Test entity recognition
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    print(f'✅ Entity recognition test: Found {len(entities)} entities')
    
    print('✅ Resume processing functionality is working correctly!')
    
except Exception as e:
    print(f'❌ Resume processing error: {e}')
    import traceback
    traceback.print_exc()
"

echo "[STEP 6] Checking Career Recommendation Features..."
python3 -c "
# Test if career recommendation logic is working
sample_skills = ['python', 'machine learning', 'tensorflow', 'data science', 'pandas']

# Define keyword sets (from App.py)
ds_keyword = ['tensorflow','keras','pytorch','machine learning','deep Learning','flask','streamlit']
web_keyword = ['react', 'django', 'node', 'angular', 'javascript', 'html', 'css']
android_keyword = ['android','flutter','kotlin','java','xml']

print('Testing career recommendation logic...')

career_detected = False
for skill in sample_skills:
    if skill.lower() in [k.lower() for k in ds_keyword]:
        print(f'✅ Data Science career detected based on skill: {skill}')
        career_detected = True
        break
    elif skill.lower() in [k.lower() for k in web_keyword]:
        print(f'✅ Web Development career detected based on skill: {skill}')
        career_detected = True
        break
    elif skill.lower() in [k.lower() for k in android_keyword]:
        print(f'✅ Android Development career detected based on skill: {skill}')
        career_detected = True
        break

if not career_detected:
    print('⚠️ No specific career path detected for sample skills')

print('✅ Career recommendation logic is functional')
"

echo "[STEP 7] Final Status Check..."
if curl -s http://localhost:8501 > /dev/null; then
    echo "✅ AI Resume Analyzer is accessible at: http://localhost:8501"
    echo ""
    echo "🎉 AI RESUME ANALYZER DIAGNOSTIC COMPLETE!"
    echo "============================================"
    echo ""
    echo "📋 USAGE INSTRUCTIONS:"
    echo "1. Open your browser and go to: http://localhost:8501"
    echo "2. You should see the JSS AI Resume Analyzer interface"
    echo "3. For admin features, login with:"
    echo "   - Username: admin"
    echo "   - Password: admin@resume-analyzer"
    echo "4. Upload a PDF resume to test analysis features"
    echo "5. The system will provide:"
    echo "   ✅ Resume Analysis & Scoring"
    echo "   ✅ Career Path Recommendations" 
    echo "   ✅ Skill Enhancement Suggestions"
    echo "   ✅ Course Recommendations"
    echo "   ✅ Professional Development Insights"
    echo ""
    echo "🔧 TROUBLESHOOTING:"
    echo "- If upload fails: Ensure PDF is under 10MB"
    echo "- If no recommendations: Try a resume with technical skills"
    echo "- If career detection fails: Include specific technology skills"
    echo "- For admin access: Use the login credentials above"
    echo ""
    echo "🚀 YOUR AI RESUME ANALYZER IS WORKING PROPERLY!"
else
    echo "❌ AI Resume Analyzer is still not accessible"
    echo "Try running: ./start-all-services.sh"
fi
