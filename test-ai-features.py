#!/usr/bin/env python3
"""
Test script to verify AI Resume Analyzer features are working
"""

import sys
import os
import requests
import time

def test_ai_analyzer_features():
    """Test if the AI analyzer web interface is working"""
    
    print("🧪 Testing AI Resume Analyzer Features...")
    print("=" * 50)
    
    # Test 1: Check if AI analyzer web interface is accessible
    try:
        response = requests.get("http://localhost:8501", timeout=10)
        if response.status_code == 200:
            print("✅ AI Analyzer web interface is accessible")
            
            # Check if specific features are available in the response
            content = response.text.lower()
            
            features_to_check = [
                "resume analysis",
                "career recommendation", 
                "skill enhancement",
                "course recommendation",
                "upload",
                "streamlit"
            ]
            
            print("\n🔍 Checking available features:")
            for feature in features_to_check:
                if feature in content:
                    print(f"✅ {feature.title()}: Available")
                else:
                    print(f"❌ {feature.title()}: Not found")
                    
        else:
            print(f"❌ AI Analyzer returned status code: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to AI Analyzer: {e}")
        return False
    
    # Test 2: Check if we can access the admin login
    try:
        admin_url = "http://localhost:8501"
        response = requests.get(admin_url, timeout=5)
        if "admin" in response.text.lower():
            print("✅ Admin interface is available")
        else:
            print("⚠️ Admin interface may not be accessible")
    except:
        print("⚠️ Could not verify admin interface")
    
    print("\n" + "=" * 50)
    print("🎯 AI Analyzer Test Complete!")
    
    return True

def test_resume_parsing():
    """Test if resume parsing libraries are working"""
    print("\n📄 Testing Resume Parsing Libraries...")
    print("=" * 50)
    
    try:
        # Test spaCy
        import spacy
        nlp = spacy.load('en_core_web_sm')
        test_text = "John Doe is a software engineer with Python and JavaScript skills."
        doc = nlp(test_text)
        print("✅ spaCy NLP processing: Working")
        
        # Test NLTK
        import nltk
        from nltk.corpus import stopwords
        from nltk.tokenize import word_tokenize
        
        stop_words = set(stopwords.words('english'))
        words = word_tokenize(test_text)
        print("✅ NLTK tokenization: Working")
        
        # Test PDF extraction (if available)
        try:
            from pdfplumber import pdfplumber
            print("✅ PDF parsing library: Available")
        except ImportError:
            print("⚠️ PDF parsing library: Not available (but may still work)")
        
        return True
        
    except Exception as e:
        print(f"❌ Resume parsing test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 JSS Placement Portal - AI Feature Testing")
    print("=" * 60)
    
    # Wait for services to be ready
    print("⏳ Waiting for services to be ready...")
    time.sleep(5)
    
    success = True
    
    # Test AI analyzer web interface
    if not test_ai_analyzer_features():
        success = False
    
    # Test resume parsing capabilities
    if not test_resume_parsing():
        success = False
    
    print("\n" + "=" * 60)
    if success:
        print("🎉 All AI features appear to be working!")
        print("\n💡 If you're still experiencing issues:")
        print("   1. Try uploading a PDF resume to http://localhost:8501")
        print("   2. Check if you're logged in as admin (admin/admin@resume-analyzer)")
        print("   3. Ensure your resume is in PDF format")
        print("   4. Check browser console for any JavaScript errors")
    else:
        print("⚠️ Some AI features may not be working properly.")
        print("   Please check the error messages above.")
    
    return success

if __name__ == "__main__":
    main()
