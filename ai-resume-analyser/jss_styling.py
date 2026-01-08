# jss_styling.py - JSS Academy Theme Styling for AI Resume Analyzer
# Matches PrepLink/Placement Portal Design Language

def get_jss_custom_css():
    """Returns JSS Academy themed CSS with Maroon & Gold color palette"""
    return """
    <style>
    /* ========== JSS Academy Color Variables ========== */
    :root {
        --jss-maroon: #8B1538;
        --jss-dark-maroon: #6B1029;
        --jss-light-maroon: #A52D4D;
        --jss-gold: #D4AF37;
        --jss-light-gold: #E8D48A;
        --jss-dark-gold: #B8960C;
        --jss-cream: #FDF8E8;
        --jss-bg-light: #FEF7F0;
        --jss-bg-gradient: linear-gradient(135deg, #FEF2F2 0%, #FFFFFF 50%, #FFF7ED 100%);
        --glass-bg: rgba(255, 255, 255, 0.7);
        --glass-border: rgba(139, 21, 56, 0.1);
        --shadow-color: rgba(139, 21, 56, 0.15);
    }
    
    /* ========== Import Google Fonts ========== */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap');
    
    /* ========== Global Styling ========== */
    .main {
        padding-top: 0.5rem;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: var(--jss-bg-gradient) !important;
    }
    
    .stApp {
        background: var(--jss-bg-gradient) !important;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* ========== JSS Header Component ========== */
    .jss-header {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 50%, #4A0D1C 100%);
        padding: 2.5rem 2rem;
        border-radius: 20px;
        margin-bottom: 2rem;
        box-shadow: 0 15px 40px var(--shadow-color);
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.3);
    }
    
    .jss-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
    
    .jss-header::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.05), transparent);
        transform: rotate(45deg);
        animation: shimmer 4s infinite linear;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    .jss-header h1 {
        color: #FFFFFF !important;
        font-size: 2.8rem !important;
        font-weight: 700 !important;
        font-family: 'Poppins', sans-serif !important;
        margin-bottom: 0.5rem !important;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
        position: relative;
        z-index: 1;
        letter-spacing: -0.5px;
    }
    
    .jss-header .gold-text {
        background: linear-gradient(135deg, var(--jss-gold) 0%, var(--jss-light-gold) 50%, var(--jss-gold) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .jss-header p {
        color: var(--jss-light-gold) !important;
        font-size: 1.15rem !important;
        margin: 0 !important;
        font-weight: 400 !important;
        position: relative;
        z-index: 1;
        opacity: 0.95;
    }
    
    /* ========== JSS Logo Container ========== */
    .jss-logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 1rem;
    }
    
    .jss-logo-container img {
        filter: drop-shadow(0 8px 20px rgba(139, 21, 56, 0.2));
        border-radius: 12px;
    }
    
    /* ========== Glass Card Effect ========== */
    .glass-card {
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 16px;
        border: 1px solid var(--glass-border);
        padding: 1.5rem;
        margin: 1rem 0;
        box-shadow: 0 8px 32px rgba(139, 21, 56, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .glass-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 48px rgba(139, 21, 56, 0.12);
        border-color: rgba(139, 21, 56, 0.2);
    }
    
    /* ========== JSS Section Headers ========== */
    .jss-section-header {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 14px;
        margin: 2rem 0 1.5rem 0;
        font-weight: 600;
        font-size: 1.2rem;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 6px 24px var(--shadow-color);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-left: 4px solid var(--jss-gold);
    }
    
    /* ========== JSS Sidebar Styling ========== */
    .css-1d391kg, .css-1lcbmhc, [data-testid="stSidebar"] {
        background: linear-gradient(180deg, #FEF7F0 0%, #FEFEFE 50%, #FEF2F2 100%) !important;
    }
    
    [data-testid="stSidebar"] > div:first-child {
        background: linear-gradient(180deg, #FEF7F0 0%, #FEFEFE 50%, #FEF2F2 100%) !important;
        border-right: 2px solid rgba(139, 21, 56, 0.1);
    }
    
    .sidebar-header {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        padding: 1.5rem;
        border-radius: 14px;
        margin-bottom: 1.5rem;
        box-shadow: 0 8px 24px var(--shadow-color);
        border: 1px solid rgba(212, 175, 55, 0.2);
    }
    
    .sidebar-header h2 {
        color: white;
        text-align: center;
        margin: 0;
        font-weight: 600;
        font-size: 1.4rem;
        font-family: 'Poppins', sans-serif;
    }
    
    .sidebar-header p {
        color: var(--jss-light-gold);
        text-align: center;
        margin: 0.5rem 0 0 0;
        font-size: 0.9rem;
    }
    
    /* ========== JSS Buttons ========== */
    .stButton > button {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 0.75rem 2rem !important;
        color: white !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
        font-family: 'Inter', sans-serif !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 4px 16px var(--shadow-color) !important;
        text-transform: none !important;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 28px var(--shadow-color) !important;
        background: linear-gradient(135deg, var(--jss-light-maroon) 0%, var(--jss-maroon) 100%) !important;
    }
    
    .stButton > button:active {
        transform: translateY(0) !important;
    }
    
    /* Gold Button Variant */
    .gold-button > button {
        background: linear-gradient(135deg, var(--jss-gold) 0%, var(--jss-dark-gold) 100%) !important;
        color: #1a1a1a !important;
    }
    
    /* ========== JSS File Uploader ========== */
    .stFileUploader {
        border: 2px dashed var(--jss-maroon) !important;
        border-radius: 16px !important;
        padding: 2rem !important;
        background: linear-gradient(135deg, rgba(139, 21, 56, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%) !important;
        transition: all 0.3s ease !important;
    }
    
    .stFileUploader:hover {
        border-color: var(--jss-gold) !important;
        background: linear-gradient(135deg, rgba(139, 21, 56, 0.06) 0%, rgba(212, 175, 55, 0.06) 100%) !important;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px var(--shadow-color);
    }
    
    /* ========== JSS Success/Info/Warning Messages ========== */
    .stSuccess {
        background: linear-gradient(90deg, #059669 0%, #10B981 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 1rem 1.25rem !important;
        color: white !important;
        box-shadow: 0 4px 16px rgba(5, 150, 105, 0.25) !important;
    }
    
    .stInfo {
        background: linear-gradient(90deg, var(--jss-maroon) 0%, var(--jss-light-maroon) 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        color: white !important;
        box-shadow: 0 4px 16px var(--shadow-color) !important;
    }
    
    .stWarning {
        background: linear-gradient(90deg, var(--jss-gold) 0%, var(--jss-dark-gold) 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        color: #1a1a1a !important;
        box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25) !important;
    }
    
    /* ========== JSS Resume Card ========== */
    .jss-resume-card {
        background: white;
        border-radius: 16px;
        padding: 1.75rem;
        margin: 1rem 0;
        box-shadow: 0 4px 20px rgba(139, 21, 56, 0.06);
        border: 1px solid rgba(139, 21, 56, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }
    
    .jss-resume-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--jss-maroon), var(--jss-gold));
    }
    
    .jss-resume-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 36px rgba(139, 21, 56, 0.12);
    }
    
    .jss-resume-card h4 {
        color: var(--jss-maroon);
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    /* ========== JSS Level Badges ========== */
    .jss-level-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.75rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    }
    
    .jss-level-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    
    .fresher-badge {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        color: white;
    }
    
    .intermediate-badge {
        background: linear-gradient(135deg, var(--jss-gold) 0%, var(--jss-dark-gold) 100%);
        color: #1a1a1a;
    }
    
    .experienced-badge {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        color: white;
    }
    
    /* ========== JSS Skill Tags ========== */
    .jss-skill-tag {
        display: inline-flex;
        align-items: center;
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        color: white;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 2px 8px var(--shadow-color);
        transition: all 0.2s ease;
    }
    
    .jss-skill-tag:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--shadow-color);
    }
    
    .jss-skill-tag.recommended {
        background: linear-gradient(135deg, var(--jss-gold) 0%, var(--jss-dark-gold) 100%);
        color: #1a1a1a;
    }
    
    /* ========== JSS Progress Bar ========== */
    .stProgress > div > div > div > div {
        background: linear-gradient(90deg, var(--jss-maroon), var(--jss-gold)) !important;
        border-radius: 10px !important;
    }
    
    /* ========== JSS Score Display ========== */
    .jss-score-container {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        margin: 1.5rem 0;
        box-shadow: 0 10px 40px var(--shadow-color);
        position: relative;
        overflow: hidden;
    }
    
    .jss-score-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    }
    
    .jss-score-number {
        font-size: 4rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--jss-gold) 0%, var(--jss-light-gold) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-family: 'Poppins', sans-serif;
        position: relative;
        z-index: 1;
    }
    
    .jss-score-label {
        color: white;
        font-size: 1.1rem;
        font-weight: 500;
        opacity: 0.9;
        position: relative;
        z-index: 1;
    }
    
    /* ========== JSS Career Path Card ========== */
    .jss-career-path {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        border-radius: 16px;
        padding: 1.5rem;
        margin: 1rem 0;
        border-left: 5px solid var(--jss-gold);
        box-shadow: 0 6px 24px var(--shadow-color);
    }
    
    .jss-career-path h4 {
        color: var(--jss-gold);
        margin: 0 0 0.5rem 0;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }
    
    .jss-career-path p {
        color: rgba(255,255,255,0.9);
        margin: 0;
        font-size: 1rem;
    }
    
    /* ========== JSS Input Fields ========== */
    .stTextInput > div > div > input,
    .stSelectbox > div > div {
        border-radius: 10px !important;
        border: 2px solid rgba(139, 21, 56, 0.15) !important;
        transition: all 0.3s ease !important;
        font-family: 'Inter', sans-serif !important;
    }
    
    .stTextInput > div > div > input:focus,
    .stSelectbox > div > div:focus-within {
        border-color: var(--jss-maroon) !important;
        box-shadow: 0 0 0 3px rgba(139, 21, 56, 0.1) !important;
    }
    
    /* ========== JSS Slider ========== */
    .stSlider > div > div > div > div {
        background: var(--jss-maroon) !important;
    }
    
    .stSlider > div > div > div > div > div {
        background: var(--jss-gold) !important;
        border: 2px solid var(--jss-maroon) !important;
    }
    
    /* ========== JSS Footer ========== */
    .jss-footer {
        background: linear-gradient(135deg, var(--jss-maroon) 0%, var(--jss-dark-maroon) 100%);
        padding: 1.5rem;
        border-radius: 14px;
        text-align: center;
        margin-top: 2rem;
        box-shadow: 0 6px 24px var(--shadow-color);
        border: 1px solid rgba(212, 175, 55, 0.2);
    }
    
    .jss-footer a {
        color: var(--jss-gold) !important;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s ease;
    }
    
    .jss-footer a:hover {
        color: var(--jss-light-gold) !important;
    }
    
    /* ========== Animations ========== */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.5);
        }
    }
    
    .pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
    }
    
    /* ========== Responsive Design ========== */
    @media (max-width: 768px) {
        .jss-header h1 {
            font-size: 2rem !important;
        }
        
        .jss-header p {
            font-size: 1rem !important;
        }
        
        .jss-score-number {
            font-size: 3rem;
        }
    }
    </style>
    """


def get_jss_header():
    """Returns the JSS themed header HTML"""
    return """
    <div class="jss-header fade-in-up">
        <h1>🎯 <span class="gold-text">PrepLink</span> Resume Analyzer</h1>
        <p>AI-Powered Career Intelligence • JSS Academy of Technical Education</p>
    </div>
    """


def get_jss_sidebar_header():
    """Returns JSS themed sidebar header"""
    return """
    <div class="sidebar-header">
        <h2>🧭 Navigation</h2>
        <p>Choose your destination</p>
    </div>
    """


def get_jss_section_header(icon, title):
    """Returns a JSS themed section header"""
    return f"""
    <div class="jss-section-header">
        <span>{icon}</span>
        <span>{title}</span>
    </div>
    """


def get_jss_resume_card(title, content):
    """Returns a JSS themed resume card"""
    return f"""
    <div class="jss-resume-card fade-in-up">
        <h4>{title}</h4>
        {content}
    </div>
    """


def get_jss_career_path_card(field, description):
    """Returns career path identification card"""
    return f"""
    <div class="jss-career-path fade-in-up">
        <h4>🎯 Career Path Identified</h4>
        <p>Our AI analysis suggests you're perfect for <strong>{field}</strong> roles!</p>
    </div>
    """


def get_jss_level_badge(level):
    """Returns experience level badge HTML"""
    badges = {
        'fresher': ('🌱', 'Fresher Level', 'fresher-badge', "You're at the beginning of your career journey. Focus on building foundational skills."),
        'intermediate': ('🚀', 'Intermediate Level', 'intermediate-badge', "Great! You have practical experience. Keep building your expertise."),
        'experienced': ('💼', 'Experienced Level', 'experienced-badge', "Excellent! You're ready for advanced roles and leadership opportunities.")
    }
    
    icon, label, badge_class, desc = badges.get(level.lower(), badges['fresher'])
    
    return f"""
    <div class="jss-resume-card fade-in-up">
        <div class="jss-level-badge {badge_class}">
            {icon} {label}
        </div>
        <p style="margin-top: 1rem; color: #6B7280;">{desc}</p>
    </div>
    """


def get_score_display(score):
    """Returns JSS themed score display"""
    return f"""
    <div class="jss-score-container fade-in-up pulse-glow">
        <div class="jss-score-number">{score}</div>
        <div class="jss-score-label">Resume Score</div>
    </div>
    """


def get_jss_skill_tags(skills, recommended=False):
    """Returns skill tags HTML"""
    tag_class = "jss-skill-tag recommended" if recommended else "jss-skill-tag"
    tags_html = '<div style="margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem;">'
    for skill in skills:
        tags_html += f'<span class="{tag_class}">{skill}</span>'
    tags_html += '</div>'
    return tags_html


def get_jss_footer():
    """Returns JSS themed footer"""
    return """
    <div class="jss-footer fade-in-up">
        <div style="color: rgba(255,255,255,0.9); font-size: 0.95rem; margin-bottom: 0.5rem;">
            ⚡ Powered by <strong>PrepLink</strong> • JSS Academy
        </div>
        <a href="https://github.com/18vikastg">Built with ❤️ by Vikas TG</a>
    </div>
    """


def get_welcome_message(name):
    """Returns welcome message card"""
    return f"""
    <div style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 1.5rem; border-radius: 14px; margin: 1rem 0; box-shadow: 0 6px 24px rgba(5, 150, 105, 0.25);">
        <h3 style="color: white; margin: 0; text-align: center; font-family: 'Poppins', sans-serif;">👋 Hello {name}!</h3>
        <p style="color: rgba(255,255,255,0.9); margin: 0.5rem 0 0 0; text-align: center;">Your resume has been successfully analyzed. Here are your personalized insights:</p>
    </div>
    """


def get_upload_prompt():
    """Returns upload prompt card"""
    return """
    <div style="background: linear-gradient(135deg, #8B1538 0%, #6B1029 50%, #4A0D1C 100%); padding: 2rem; border-radius: 16px; margin: 1.5rem 0; box-shadow: 0 10px 30px rgba(139, 21, 56, 0.25); border: 1px solid rgba(212, 175, 55, 0.2);">
        <h3 style="color: #D4AF37; margin: 0 0 1rem 0; text-align: center; font-weight: 600; font-family: 'Poppins', sans-serif;">🎯 Ready for AI-Powered Analysis?</h3>
        <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 1.05rem; text-align: center; line-height: 1.6;">
            Upload your resume and unlock personalized insights with our advanced AI engine. 
            Get detailed skill analysis, career recommendations, and professional growth strategies.
        </p>
    </div>
    """