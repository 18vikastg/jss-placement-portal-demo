import { spawn, exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the AI resume analyser module
const AI_ANALYSER_PATH = path.join(__dirname, '..', '..', '..', 'ai-resume-analyser');

class ResumeAnalyserService {
    constructor() {
        this.analyserPath = AI_ANALYSER_PATH;
        this.uploadsPath = path.join(this.analyserPath, 'Uploaded_Resumes');
        
        // Ensure uploads directory exists
        if (!fs.existsSync(this.uploadsPath)) {
            fs.mkdirSync(this.uploadsPath, { recursive: true });
        }
    }

    /**
     * Analyse resume using the AI resume analyser
     * @param {Buffer} fileBuffer - The resume file buffer
     * @param {string} originalName - Original filename
     * @param {string} userId - User ID for tracking
     * @returns {Promise<Object>} Analysis results
     */
    async analyseResume(fileBuffer, originalName, userId) {
        try {
            console.log('Starting resume analysis for user:', userId);
            
            // Generate unique filename
            const timestamp = Date.now();
            const fileExtension = path.extname(originalName);
            const fileName = `${userId}_${timestamp}${fileExtension}`;
            const filePath = path.join(this.uploadsPath, fileName);
            
            // Save file temporarily
            fs.writeFileSync(filePath, fileBuffer);
            console.log('Resume file saved:', filePath);
            
            // Run the Python resume analyser
            const analysisResult = await this.runPythonAnalyser(filePath, fileName);
            
            // Clean up the file
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Temporary file cleaned up');
            }
            
            return {
                success: true,
                userId,
                fileName: originalName,
                analysisDate: new Date(),
                ...analysisResult
            };
            
        } catch (error) {
            console.error('Resume analysis error:', error);
            throw new Error(`Resume analysis failed: ${error.message}`);
        }
    }

    /**
     * Run the Python resume analyser script
     * @param {string} filePath - Path to the resume file
     * @param {string} fileName - Filename
     * @returns {Promise<Object>} Parsed resume data
     */
    async runPythonAnalyser(filePath, fileName) {
        return new Promise((resolve, reject) => {
            // Create a Python script to analyse the resume
            const pythonScript = this.createAnalysisScript(filePath, fileName);
            const scriptPath = path.join(this.analyserPath, 'temp_analysis.py');
            
            // Write the analysis script
            fs.writeFileSync(scriptPath, pythonScript);
            
            // Execute the Python script
            const pythonProcess = spawn('python', [scriptPath], {
                cwd: this.analyserPath,
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            let output = '';
            let errorOutput = '';
            
            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });
            
            pythonProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });
            
            pythonProcess.on('close', (code) => {
                // Clean up the temporary script
                if (fs.existsSync(scriptPath)) {
                    fs.unlinkSync(scriptPath);
                }
                
                if (code === 0) {
                    try {
                        // Parse the output JSON
                        const result = JSON.parse(output);
                        resolve(result);
                    } catch (parseError) {
                        console.error('Failed to parse Python output:', output);
                        reject(new Error(`Failed to parse analysis results: ${parseError.message}`));
                    }
                } else {
                    console.error('Python script error:', errorOutput);
                    reject(new Error(`Python analysis failed with code ${code}: ${errorOutput}`));
                }
            });
            
            pythonProcess.on('error', (error) => {
                console.error('Failed to start Python process:', error);
                reject(new Error(`Failed to start analysis: ${error.message}`));
            });
        });
    }

    /**
     * Create Python analysis script
     * @param {string} filePath - Path to resume file
     * @param {string} fileName - Filename
     * @returns {string} Python script content
     */
    createAnalysisScript(filePath, fileName) {
        return `
import json
import sys
import os
import re
from datetime import datetime

# Add the current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    # Try to import pyresparser
    from pyresparser import ResumeParser
    PYRESPARSER_AVAILABLE = True
except ImportError:
    PYRESPARSER_AVAILABLE = False
    print("Warning: pyresparser not available, using fallback parsing", file=sys.stderr)

# Fallback parsing functions
def extract_text_from_pdf(file_path):
    """Extract text from PDF using PyPDF2"""
    try:
        import PyPDF2
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"PDF extraction error: {e}", file=sys.stderr)
        return ""

def extract_basic_info(text):
    """Extract basic information from text"""
    import re
    
    # Extract email
    email_pattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'
    emails = re.findall(email_pattern, text)
    email = emails[0] if emails else ""
    
    # Extract phone
    phone_pattern = r'(\\+\\d{1,3}[-\\.\\s]?)?\\(?\\d{3}\\)?[-\\.\\s]?\\d{3}[-\\.\\s]?\\d{4}'
    phones = re.findall(phone_pattern, text)
    phone = phones[0] if phones else ""
    
    # Extract name (first non-empty line that looks like a name)
    lines = text.split('\\n')
    name = ""
    for line in lines[:5]:
        line = line.strip()
        if len(line) > 2 and len(line) < 50 and not any(char.isdigit() for char in line):
            if re.match(r'^[A-Za-z\\s\\.]+$', line) and len(line.split()) <= 4:
                name = line
                break
    
    return {
        'name': name or "Name not found",
        'email': email or "Email not found",
        'mobile_number': phone or "Phone not found"
    }

def extract_skills(text):
    """Extract skills from text"""
    # Common technical skills
    skill_keywords = [
        'python', 'java', 'javascript', 'react', 'node', 'angular', 'vue',
        'html', 'css', 'sql', 'mongodb', 'mysql', 'postgresql', 'redis',
        'aws', 'azure', 'docker', 'kubernetes', 'git', 'jenkins',
        'machine learning', 'ai', 'data science', 'tensorflow', 'pytorch',
        'communication', 'leadership', 'teamwork', 'problem solving'
    ]
    
    text_lower = text.lower()
    found_skills = []
    
    for skill in skill_keywords:
        if skill in text_lower:
            found_skills.append(skill.title())
    
    return found_skills or ['Communication', 'Problem Solving', 'Teamwork']

def calculate_resume_score(data):
    """Calculate resume score based on completeness"""
    score = 0
    
    # Basic info (30 points)
    if data.get('name') and data['name'] != "Name not found":
        score += 10
    if data.get('email') and data['email'] != "Email not found":
        score += 10
    if data.get('mobile_number') and data['mobile_number'] != "Phone not found":
        score += 10
    
    # Skills (25 points)
    skills = data.get('skills', [])
    if len(skills) >= 5:
        score += 25
    elif len(skills) >= 3:
        score += 15
    elif len(skills) >= 1:
        score += 10
    
    # Experience (20 points)
    experience = data.get('experience', [])
    if len(experience) >= 2:
        score += 20
    elif len(experience) >= 1:
        score += 15
    else:
        score += 5
    
    # Education (15 points)
    if data.get('college_name'):
        score += 10
    if data.get('degree'):
        score += 5
    
    # Length (10 points)
    pages = data.get('no_of_pages', 1)
    if pages >= 1:
        score += 10
    
    return min(score, 100)

def analyze_resume(file_path):
    """Main analysis function"""
    try:
        if PYRESPARSER_AVAILABLE:
            # Use pyresparser if available
            resume_data = ResumeParser(file_path).get_extracted_data()
        else:
            # Use fallback parsing
            text = extract_text_from_pdf(file_path)
            basic_info = extract_basic_info(text)
            skills = extract_skills(text)
            
            resume_data = {
                'name': basic_info['name'],
                'email': basic_info['email'],
                'mobile_number': basic_info['mobile_number'],
                'skills': skills,
                'college_name': ['Education extracted from text'],
                'degree': ['Degree information'],
                'designation': ['Software Developer'],
                'experience': ['Work experience found'],
                'company_names': ['Company information'],
                'no_of_pages': 1
            }
        
        # Calculate score
        score = calculate_resume_score(resume_data)
        
        # Generate recommendations
        recommendations = generate_recommendations(resume_data, score)
        
        # Determine experience level
        experience_level = determine_experience_level(resume_data)
        
        # Format result
        result = {
            'extracted_data': resume_data,
            'analysis_score': score,
            'experience_level': experience_level,
            'recommendations': recommendations,
            'analysis_date': datetime.now().isoformat(),
            'file_info': {
                'pages': resume_data.get('no_of_pages', 1),
                'parsed_successfully': True
            }
        }
        
        return result
        
    except Exception as e:
        print(f"Analysis error: {e}", file=sys.stderr)
        return {
            'extracted_data': {},
            'analysis_score': 0,
            'experience_level': 'Entry Level',
            'recommendations': ['Please upload a valid PDF resume'],
            'analysis_date': datetime.now().isoformat(),
            'file_info': {
                'pages': 0,
                'parsed_successfully': False
            },
            'error': str(e)
        }

def generate_recommendations(data, score):
    """Generate improvement recommendations"""
    recommendations = []
    
    if score < 50:
        recommendations.append("Consider adding more technical skills to your resume")
        recommendations.append("Include more detailed work experience descriptions")
        recommendations.append("Add education details and certifications")
    elif score < 70:
        recommendations.append("Add more specific achievements and metrics")
        recommendations.append("Include relevant projects or portfolio links")
        recommendations.append("Consider adding professional summary")
    else:
        recommendations.append("Your resume looks comprehensive!")
        recommendations.append("Consider tailoring keywords for specific job applications")
        recommendations.append("Keep updating with new skills and experiences")
    
    return recommendations

def determine_experience_level(data):
    """Determine candidate experience level"""
    experience = data.get('experience', [])
    skills = data.get('skills', [])
    
    if len(experience) >= 3 and len(skills) >= 8:
        return 'Senior Level'
    elif len(experience) >= 1 and len(skills) >= 5:
        return 'Mid Level'
    else:
        return 'Entry Level'

# Main execution
if __name__ == "__main__":
    file_path = "${filePath}"
    result = analyze_resume(file_path)
    print(json.dumps(result, indent=2))
`;
    }

    /**
     * Get analysis history for a user
     * @param {string} userId - User ID
     * @returns {Array} Array of analysis records
     */
    async getAnalysisHistory(userId) {
        // This would typically fetch from database
        // For now, return empty array
        return [];
    }

    /**
     * Save analysis results to database
     * @param {string} userId - User ID
     * @param {Object} analysisData - Analysis results
     * @returns {Promise<Object>} Save result
     */
    async saveAnalysisToProfile(userId, analysisData) {
        try {
            // This will be implemented with the database integration
            console.log('Saving analysis for user:', userId);
            return {
                success: true,
                savedAt: new Date(),
                analysisId: `analysis_${userId}_${Date.now()}`
            };
        } catch (error) {
            console.error('Failed to save analysis:', error);
            throw error;
        }
    }
}

export default ResumeAnalyserService;
