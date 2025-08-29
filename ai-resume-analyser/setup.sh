#!/bin/bash

echo "🚀 AI Resume Analyzer Setup Script"
echo "================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.7+ first."
    exit 1
fi

echo "✅ Python 3 found"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3 first."
    exit 1
fi

echo "✅ pip3 found"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv resume_analyzer_env

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source resume_analyzer_env/bin/activate

# Install required packages
echo "📥 Installing required packages..."
cd App
pip install -r requirements.txt

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Install MySQL and create a database named 'resume_analyzer_db'"
echo "2. Update the database configuration in App/config.py"
echo "3. Run the SQL schema (check database_schema.sql)"
echo "4. To start the application:"
echo "   cd App"
echo "   source ../resume_analyzer_env/bin/activate"
echo "   streamlit run App.py"
echo ""
echo "For any issues, visit: https://github.com/18vikastg/AI-Resume-Analyzer"
