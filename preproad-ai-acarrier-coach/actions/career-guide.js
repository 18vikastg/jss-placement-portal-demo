"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "@/lib/logger";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCareerGuide(careerRole) {
  try {
    logger.info("Generating career guide", { careerRole });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a senior career coach and resume roadmap builder for engineering and technology students.
Your role is to guide a student who has no prior knowledge of career domains, timelines, or skill levels.

TASK: Generate a complete career guidance package for: "${careerRole}"

Provide a detailed response in the following JSON format:

{
  "title": "Career Guide: [Role Name]",
  "overview": "Simple 3-4 sentence explanation of the domain, its importance, and what industries need it",
  "positions": [
    {
      "title": "Job Title 1",
      "description": "One-line description of the role"
    },
    {
      "title": "Job Title 2", 
      "description": "One-line description of the role"
    },
    {
      "title": "Job Title 3",
      "description": "One-line description of the role"
    },
    {
      "title": "Job Title 4",
      "description": "One-line description of the role"
    },
    {
      "title": "Job Title 5",
      "description": "One-line description of the role"
    },
    {
      "title": "Job Title 6",
      "description": "One-line description of the role"
    }
  ],
  "salaryRange": "Global: $X-Y, India: ₹X-Y LPA with specific numbers",
  "marketDemand": "High/Medium/Growing - brief description with current market trends",
  "growthOutlook": "Brief future growth description with percentage growth expected",
  "textRoadmap": [
    "Phase 1: Foundation Skills - List specific foundational skills needed",
    "Phase 2: Core Technical Skills - List advanced technical skills", 
    "Phase 3: Projects & Internships - Specific project types and internship advice",
    "Phase 4: Job Preparation - Interview practice, resume building, networking tips"
  ],
  "roadmap": [
    {
      "title": "Phase 1: Foundation Skills",
      "duration": "2-4 months",
      "description": "Build fundamental knowledge and core concepts",
      "skills": ["Fundamental Skill 1", "Fundamental Skill 2", "Fundamental Skill 3", "Fundamental Skill 4"],
      "tools": ["Basic Tool 1", "Basic Tool 2", "Basic Tool 3"],
      "projects": ["Beginner Project 1", "Beginner Project 2", "Beginner Project 3"],
      "certifications": ["Relevant Certification 1", "Relevant Certification 2"]
    },
    {
      "title": "Phase 2: Core Technical Skills",
      "duration": "4-8 months", 
      "description": "Develop advanced technical expertise and practical application",
      "skills": ["Advanced Skill 1", "Advanced Skill 2", "Advanced Skill 3", "Advanced Skill 4"],
      "tools": ["Professional Tool 1", "Professional Tool 2", "Professional Tool 3"],
      "projects": ["Intermediate Project 1", "Intermediate Project 2", "Intermediate Project 3"],
      "certifications": ["Professional Certification 1", "Professional Certification 2"]
    },
    {
      "title": "Phase 3: Projects & Internships", 
      "duration": "8-12 months",
      "description": "Build portfolio with real-world projects and gain industry experience",
      "skills": ["Portfolio Skill 1", "Portfolio Skill 2", "Portfolio Skill 3", "Portfolio Skill 4"],
      "tools": ["Industry Tool 1", "Industry Tool 2", "Industry Tool 3"], 
      "projects": ["Portfolio Project 1", "Portfolio Project 2", "Capstone Project"],
      "certifications": ["Industry Certification 1", "Specialization Certification"]
    },
    {
      "title": "Phase 4: Job Preparation",
      "duration": "12+ months",
      "description": "Master interview skills, optimize resume, and secure employment", 
      "skills": ["Interview Skills", "System Design", "Problem Solving", "Communication"],
      "tools": ["Interview Prep Tools", "Resume Builders", "Portfolio Platforms"],
      "projects": ["Final Portfolio", "Open Source Contributions", "Personal Website"],
      "certifications": ["Expert Level Certification", "Leadership Certification"]
    }
  ],
  "flowchartOutline": "Valid Mermaid.js flowchart code starting with 'flowchart TD' showing the complete learning journey with decision points",
  "courses": [
    {
      "name": "Course Name 1",
      "platform": "Coursera/Udemy/edX/YouTube",
      "link": "https://actual-working-url.com/course1",
      "description": "Brief description of what this course covers",
      "level": "Beginner/Intermediate/Advanced",
      "duration": "X weeks/months"
    },
    {
      "name": "Course Name 2",
      "platform": "Coursera/Udemy/edX/YouTube", 
      "link": "https://actual-working-url.com/course2",
      "description": "Brief description of what this course covers",
      "level": "Beginner/Intermediate/Advanced",
      "duration": "X weeks/months"
    },
    {
      "name": "Course Name 3",
      "platform": "Coursera/Udemy/edX/YouTube",
      "link": "https://actual-working-url.com/course3", 
      "description": "Brief description of what this course covers",
      "level": "Beginner/Intermediate/Advanced",
      "duration": "X weeks/months"
    },
    {
      "name": "Course Name 4",
      "platform": "Coursera/Udemy/edX/YouTube",
      "link": "https://actual-working-url.com/course4",
      "description": "Brief description of what this course covers", 
      "level": "Beginner/Intermediate/Advanced",
      "duration": "X weeks/months"
    },
    {
      "name": "Course Name 5",
      "platform": "Coursera/Udemy/edX/YouTube",
      "link": "https://actual-working-url.com/course5",
      "description": "Brief description of what this course covers",
      "level": "Beginner/Intermediate/Advanced", 
      "duration": "X weeks/months"
    }
  ],
  "resumeGuidance": [
    "What type of projects to include in your resume for this domain",
    "Which certifications to pursue and highlight prominently", 
    "How to showcase technical skills effectively for recruiters",
    "Key buzzwords and technologies to include",
    "How to structure experience section for entry-level positions",
    "Tips for highlighting relevant coursework and academic projects"
  ],
  "resources": [
    {
      "category": "Documentation & Tutorials",
      "items": [
        {
          "title": "Official Documentation",
          "platform": "Official Website", 
          "url": "https://actual-working-url.com/docs",
          "description": "Comprehensive documentation and guides"
        }
      ]
    },
    {
      "category": "Practice Platforms",
      "items": [
        {
          "title": "Practice Platform 1",
          "platform": "Platform Name",
          "url": "https://actual-working-url.com/practice1",
          "description": "Hands-on practice and coding challenges"
        }
      ]
    },
    {
      "category": "Communities & Forums",
      "items": [
        {
          "title": "Community 1", 
          "platform": "Reddit/Discord/Stack Overflow",
          "url": "https://actual-working-url.com/community1",
          "description": "Active community for support and networking"
        }
      ]
    }
  ]
}

REQUIREMENTS:
- Keep explanations beginner-friendly and motivational
- Make the roadmap realistic and achievable
- Provide REAL working URLs from trusted platforms (Coursera, Udemy, edX, YouTube)
- Include specific salary ranges with current market data
- Create a comprehensive Mermaid.js flowchart showing the complete learning journey
- Focus on practical, actionable advice for students with no prior experience
- Include current industry trends and in-demand skills
- Provide step-by-step guidance that a complete beginner can follow

EXAMPLE Mermaid.js flowchart format:
flowchart TD
    Start([Start Your Journey]) --> Assess{Assess Current Skills}
    Assess --> Beginner[Beginner Path]
    Assess --> Some[Some Experience]
    
    Beginner --> Foundation[Learn Fundamentals]
    Foundation --> BasicProjects[Build Basic Projects]
    BasicProjects --> CoreSkills[Develop Core Skills]
    
    Some --> CoreSkills
    CoreSkills --> AdvancedProjects[Advanced Projects]
    AdvancedProjects --> Internship[Apply for Internships]
    Internship --> Portfolio[Build Portfolio]
    Portfolio --> JobReady[Job Ready]
    JobReady --> Interview[Interview Prep]
    Interview --> Job[Land Your Job]
    
    style Start fill:#e1f5fe
    style Job fill:#c8e6c9
    style Portfolio fill:#fff3e0

Respond only with valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse the JSON response
    const cleanedText = text.replace(/```json\s*/, '').replace(/```\s*$/, '').trim();
    
    let careerGuide;
    try {
      careerGuide = JSON.parse(cleanedText);
    } catch (parseError) {
      logger.error("Failed to parse AI response as JSON", { 
        error: parseError.message,
        responseText: cleanedText.substring(0, 500)
      });
      throw new Error("Failed to generate properly formatted career guide");
    }

    // Validate required fields
    const requiredFields = ['title', 'overview', 'positions', 'textRoadmap', 'roadmap', 'flowchartOutline', 'courses', 'resumeGuidance', 'resources'];
    for (const field of requiredFields) {
      if (!careerGuide[field]) {
        throw new Error(`Invalid career guide: missing ${field}`);
      }
    }

    // Validate and fix Mermaid flowchart if needed
    if (careerGuide.flowchartOutline && typeof careerGuide.flowchartOutline === 'string') {
      const flowchart = careerGuide.flowchartOutline.trim();
      if (!flowchart.startsWith('flowchart') && !flowchart.startsWith('graph')) {
        // Generate a simple fallback flowchart
        logger.warn("Generated flowchart doesn't start with 'flowchart' or 'graph', creating fallback", { careerRole });
        careerGuide.flowchartOutline = createFallbackFlowchart(careerRole, careerGuide.roadmap);
      }
    } else {
      // Create fallback if flowchart is missing or invalid
      logger.warn("Invalid or missing flowchart, creating fallback", { careerRole });
      careerGuide.flowchartOutline = createFallbackFlowchart(careerRole, careerGuide.roadmap);
    }

    logger.info("Career guide generated successfully", { 
      careerRole,
      roadmapPhases: careerGuide.roadmap.length,
      resourceCategories: careerGuide.resources.length
    });

    return careerGuide;

  } catch (error) {
    logger.error("Career guide generation failed", {
      careerRole,
      error: error.message
    });

    // Return a fallback response in case of error
    return {
      title: `Career Guide: ${careerRole}`,
      overview: `${careerRole} is a growing field in the technology industry. This domain combines technical expertise with problem-solving skills. Professionals in this field work across various industries including tech, finance, healthcare, and startups. The demand for skilled ${careerRole.toLowerCase()} professionals continues to grow as companies increasingly rely on technology solutions.`,
      positions: [
        { title: "Junior " + careerRole, description: "Entry-level position focusing on learning and basic tasks" },
        { title: "Mid-level " + careerRole, description: "Experienced professional handling complex projects" },
        { title: "Senior " + careerRole, description: "Expert-level role with leadership responsibilities" },
        { title: "Lead " + careerRole, description: "Team leader managing multiple projects and mentoring juniors" },
        { title: "Principal " + careerRole, description: "Strategic role setting technical direction" },
        { title: careerRole + " Manager", description: "Management position overseeing teams and business objectives" }
      ],
      salaryRange: "Global: $50,000-150,000, India: ₹4-25 LPA",
      marketDemand: "High - Growing demand across all industries with 15-20% annual growth",
      growthOutlook: "Excellent growth prospects with 25-30% expected growth over next 5 years",
      textRoadmap: [
        "Phase 1: Foundation Skills - Learn programming basics, understand core concepts, get familiar with tools",
        "Phase 2: Core Technical Skills - Master advanced technical skills, frameworks, and best practices", 
        "Phase 3: Projects & Internships - Build portfolio projects, gain real-world experience through internships",
        "Phase 4: Job Preparation - Practice interviews, optimize resume, network with professionals, apply for positions"
      ],
      roadmap: [
        {
          title: "Phase 1: Foundation Skills",
          duration: "3-6 months",
          description: "Build fundamental knowledge and core concepts",
          skills: ["Programming basics", "Core principles", "Industry terminology"],
          tools: ["Code editors", "Version control", "Basic frameworks"],
          projects: ["Hello World projects", "Basic tutorials", "Simple applications"],
          certifications: ["Introduction certificates", "Basic programming certificates"]
        },
        {
          title: "Phase 2: Core Technical Skills", 
          duration: "6-12 months",
          description: "Develop advanced technical expertise and practical application",
          skills: ["Advanced programming", "Framework mastery", "Problem-solving"],
          tools: ["Professional IDEs", "Testing tools", "Deployment platforms"],
          projects: ["Portfolio projects", "API development", "Database integration"],
          certifications: ["Professional certifications", "Technology-specific credentials"]
        },
        {
          title: "Phase 3: Projects & Internships",
          duration: "12-18 months", 
          description: "Build portfolio with real-world projects and gain industry experience",
          skills: ["System design", "Team collaboration", "Code review"],
          tools: ["Project management tools", "CI/CD pipelines", "Monitoring systems"],
          projects: ["Full-stack applications", "Open source contributions", "Capstone projects"],
          certifications: ["Industry certifications", "Leadership credentials"]
        },
        {
          title: "Phase 4: Job Preparation",
          duration: "18+ months",
          description: "Master interview skills, optimize resume, and secure employment",
          skills: ["Interview skills", "Technical communication", "Networking"],
          tools: ["Interview platforms", "Resume builders", "Portfolio websites"],
          projects: ["Personal website", "Advanced portfolio", "Technical blog"],
          certifications: ["Expert certifications", "Professional development courses"]
        }
      ],
      flowchartOutline: createFallbackFlowchart(careerRole),
      courses: [
        { name: "Introduction to " + careerRole, platform: "Coursera", link: "https://www.coursera.org/browse/computer-science", description: "Foundational course covering basics", level: "Beginner", duration: "4 weeks" },
        { name: "Advanced " + careerRole, platform: "Udemy", link: "https://www.udemy.com/courses/development/", description: "Deep dive into advanced concepts", level: "Intermediate", duration: "8 weeks" },
        { name: "Professional " + careerRole, platform: "edX", link: "https://www.edx.org/learn/computer-science", description: "Industry-level skills and practices", level: "Advanced", duration: "12 weeks" },
        { name: careerRole + " Bootcamp", platform: "freeCodeCamp", link: "https://www.freecodecamp.org/", description: "Comprehensive practical training", level: "All levels", duration: "6 months" },
        { name: careerRole + " Masterclass", platform: "YouTube", link: "https://www.youtube.com/results?search_query=" + careerRole.replace(" ", "+"), description: "Expert-led tutorials and tips", level: "All levels", duration: "Ongoing" }
      ],
      resumeGuidance: [
        "Include 2-3 relevant projects showcasing your " + careerRole.toLowerCase() + " skills",
        "Highlight programming languages and frameworks specific to " + careerRole.toLowerCase(),
        "Showcase problem-solving abilities through specific examples and metrics",
        "Include relevant certifications and online course completions",
        "Structure experience section to highlight transferable skills for entry-level positions",
        "Use industry keywords and technical terms that ATS systems recognize"
      ],
      resources: [
        {
          category: "Online Learning",
          items: [
            {
              title: "Coursera Career Courses",
              platform: "Coursera",
              url: "https://www.coursera.org/browse/computer-science",
              description: "Professional courses and certifications"
            },
            {
              title: "Free Programming Resources",
              platform: "freeCodeCamp",
              url: "https://www.freecodecamp.org/",
              description: "Free coding bootcamp and tutorials"
            }
          ]
        },
        {
          category: "Practice & Community",
          items: [
            {
              title: "GitHub Projects",
              platform: "GitHub",
              url: "https://github.com/explore",
              description: "Open source projects and collaboration"
            },
            {
              title: "Professional Network",
              platform: "LinkedIn",
              url: "https://www.linkedin.com/",
              description: "Connect with industry professionals"
            }
          ]
        }
      ]
    };
  }
}

/**
 * Creates a fallback flowchart with valid Mermaid.js syntax
 * @param {string} careerRole - The career role for the flowchart
 * @returns {string} Valid Mermaid.js flowchart syntax
 */
function createFallbackFlowchart(careerRole) {
  const sanitizedRole = careerRole.replace(/[^a-zA-Z0-9]/g, '');
  
  return `flowchart TD
    A[Start Career in ${careerRole}] --> B[Learn Core Skills]
    B --> C{Have Experience?}
    C -->|No| D[Entry Level Position]
    C -->|Yes| E[Mid Level Position]
    D --> F[Build Portfolio]
    F --> G[Gain Experience]
    G --> H[Apply for Better Roles]
    E --> I[Specialize in Domain]
    I --> J[Lead Projects]
    H --> K[Senior Position]
    J --> K
    K --> L[Expert Level]
    L --> M[Mentor Others]
    M --> N[Career Success]
    
    style A fill:#e1f5fe
    style N fill:#c8e6c9
    style K fill:#fff3e0
    style L fill:#fce4ec`;
}
