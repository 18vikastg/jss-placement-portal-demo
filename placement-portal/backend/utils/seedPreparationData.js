import { PreparationResource } from "../models/preparationResource.model.js";

export const preparationResources = [
    // APTITUDE RESOURCES
    {
        title: "Complete Quantitative Aptitude for Placements",
        description: "Comprehensive course covering all quantitative aptitude topics including profit & loss, time & work, probability, and more.",
        category: "Aptitude",
        subcategory: "Quantitative Aptitude",
        type: "Course",
        url: "https://www.khanacademy.org/math/arithmetic",
        provider: "Khan Academy",
        difficulty: "Beginner",
        duration: "4-6 weeks",
        isPremium: false,
        rating: 4.2,
        tags: ["quantitative", "arithmetic", "profit-loss", "time-work", "probability"],
        estimatedTime: "40 hours",
        prerequisites: "Basic mathematics",
        learningOutcomes: [
            "Master quantitative aptitude for competitive exams",
            "Solve complex arithmetic problems quickly",
            "Understand profit & loss calculations",
            "Learn time and work concepts"
        ]
    },
    {
        title: "Logical Reasoning Mastery",
        description: "Complete logical reasoning preparation with puzzles, patterns, and analytical thinking exercises.",
        category: "Aptitude",
        subcategory: "Logical Reasoning",
        type: "Practice Test",
        url: "https://www.khanacademy.org/math/geometry/logic-and-proof",
        provider: "Khan Academy",
        difficulty: "Intermediate",
        duration: "3-4 weeks",
        isPremium: false,
        rating: 4.3,
        tags: ["logical-reasoning", "puzzles", "patterns", "analytical"],
        estimatedTime: "30 hours",
        prerequisites: "None",
        learningOutcomes: [
            "Develop logical thinking skills",
            "Solve complex puzzles and patterns",
            "Improve analytical reasoning",
            "Master coding-decoding problems"
        ]
    },
    {
        title: "Verbal Ability for Campus Placements",
        description: "English grammar, vocabulary, reading comprehension, and verbal reasoning for placement tests.",
        category: "Aptitude",
        subcategory: "Verbal Ability",
        type: "Course",
        url: "https://www.coursera.org/learn/english-for-career-development",
        provider: "Coursera",
        difficulty: "Beginner",
        duration: "2-3 weeks",
        isPremium: false,
        rating: 4.1,
        tags: ["english", "grammar", "vocabulary", "comprehension"],
        estimatedTime: "25 hours",
        prerequisites: "Basic English knowledge",
        learningOutcomes: [
            "Improve English grammar and vocabulary",
            "Master reading comprehension techniques",
            "Learn sentence correction methods",
            "Develop verbal reasoning skills"
        ]
    },

    // CODING & DSA RESOURCES
    {
        title: "Data Structures and Algorithms Complete Course",
        description: "Comprehensive DSA course covering arrays, linked lists, trees, graphs, dynamic programming, and more.",
        category: "Coding & DSA",
        subcategory: "Data Structures",
        type: "Course",
        url: "https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/",
        provider: "GeeksforGeeks",
        difficulty: "Intermediate",
        duration: "12-16 weeks",
        isPremium: false,
        rating: 4.6,
        tags: ["dsa", "algorithms", "data-structures", "programming"],
        estimatedTime: "120 hours",
        prerequisites: "Basic programming knowledge",
        learningOutcomes: [
            "Master fundamental data structures",
            "Learn essential algorithms",
            "Solve complex programming problems",
            "Prepare for technical interviews"
        ]
    },
    {
        title: "LeetCode Problem Solving Patterns",
        description: "Curated LeetCode problems organized by patterns and difficulty levels for systematic practice.",
        category: "Coding & DSA",
        subcategory: "Problem Solving",
        type: "Practice Test",
        url: "https://leetcode.com/problemset/",
        provider: "LeetCode",
        difficulty: "Advanced",
        duration: "Self-paced",
        isPremium: true,
        rating: 4.8,
        tags: ["leetcode", "problem-solving", "algorithms", "interview"],
        estimatedTime: "200+ hours",
        prerequisites: "Good understanding of DSA",
        learningOutcomes: [
            "Master problem-solving patterns",
            "Improve coding interview skills",
            "Learn optimization techniques",
            "Practice time complexity analysis"
        ]
    },
    {
        title: "System Design Interview Preparation",
        description: "Learn to design scalable systems, databases, and architectures for senior developer interviews.",
        category: "Coding & DSA",
        subcategory: "System Design",
        type: "Course",
        url: "https://www.geeksforgeeks.org/system-design-tutorial/",
        provider: "GeeksforGeeks",
        difficulty: "Advanced",
        duration: "8-10 weeks",
        isPremium: false,
        rating: 4.5,
        tags: ["system-design", "scalability", "architecture", "databases"],
        estimatedTime: "60 hours",
        prerequisites: "3+ years programming experience",
        learningOutcomes: [
            "Design scalable web applications",
            "Understand database design principles",
            "Learn caching and load balancing",
            "Master microservices architecture"
        ]
    },

    // MOCK INTERVIEWS
    {
        title: "Pramp - Free Mock Interviews",
        description: "Practice coding interviews with peers in a real interview environment.",
        category: "Mock Interviews",
        subcategory: "Technical Interviews",
        type: "Tool",
        url: "https://www.pramp.com/",
        provider: "Pramp",
        difficulty: "Intermediate",
        duration: "1 hour per session",
        isPremium: false,
        rating: 4.4,
        tags: ["mock-interview", "peer-practice", "technical", "real-time"],
        estimatedTime: "Multiple sessions",
        prerequisites: "Basic DSA knowledge",
        learningOutcomes: [
            "Practice real interview scenarios",
            "Get feedback from peers",
            "Improve communication skills",
            "Build interview confidence"
        ]
    },
    {
        title: "InterviewBit Mock Interviews",
        description: "AI-powered mock interviews with detailed feedback and performance analysis.",
        category: "Mock Interviews",
        subcategory: "Technical Interviews",
        type: "Tool",
        url: "https://www.interviewbit.com/mock-interview/",
        provider: "InterviewBit",
        difficulty: "Intermediate",
        duration: "45-60 minutes",
        isPremium: true,
        rating: 4.3,
        tags: ["ai-powered", "feedback", "analysis", "technical"],
        estimatedTime: "Multiple sessions",
        prerequisites: "Programming knowledge",
        learningOutcomes: [
            "Get AI-powered interview feedback",
            "Analyze performance metrics",
            "Practice with real interview questions",
            "Improve technical communication"
        ]
    },

    // COMMUNICATION SKILLS
    {
        title: "Effective Communication for Technical Professionals",
        description: "YouTube playlist covering communication skills, presentation techniques, and soft skills for engineers.",
        category: "Communication Skills",
        subcategory: "Soft Skills",
        type: "Video",
        url: "https://www.coursera.org/learn/communication-strategies",
        provider: "Coursera - University of California",
        difficulty: "Beginner",
        duration: "4-6 hours",
        isPremium: false,
        rating: 4.2,
        tags: ["communication", "presentation", "soft-skills", "professional"],
        estimatedTime: "6 hours",
        prerequisites: "None",
        learningOutcomes: [
            "Improve verbal communication",
            "Learn presentation skills",
            "Develop professional etiquette",
            "Master interview communication"
        ]
    },
    {
        title: "English Speaking Course for IT Professionals",
        description: "Comprehensive English speaking course tailored for technical professionals and job interviews.",
        category: "Communication Skills",
        subcategory: "English Speaking",
        type: "Course",
        url: "https://www.udemy.com/course/english-speaking-complete-course/",
        provider: "Udemy",
        difficulty: "Beginner",
        duration: "6-8 weeks",
        isPremium: true,
        rating: 4.1,
        tags: ["english", "speaking", "pronunciation", "interview"],
        estimatedTime: "20 hours",
        prerequisites: "Basic English knowledge",
        learningOutcomes: [
            "Improve English pronunciation",
            "Build speaking confidence",
            "Learn technical vocabulary",
            "Master interview discussions"
        ]
    },

    // COMPANY SPECIFIC RESOURCES
    {
        title: "Google Coding Interview Questions",
        description: "Curated collection of Google interview questions, solutions, and preparation strategies.",
        category: "Company Specific",
        subcategory: "FAANG Preparation",
        type: "Practice Test",
        url: "https://www.geeksforgeeks.org/google-interview-questions/",
        provider: "GeeksforGeeks",
        difficulty: "Advanced",
        duration: "4-6 weeks",
        isPremium: false,
        rating: 4.7,
        tags: ["google", "faang", "coding-interview", "algorithms"],
        estimatedTime: "50 hours",
        prerequisites: "Strong DSA knowledge",
        learningOutcomes: [
            "Understand Google interview format",
            "Practice Google-style questions",
            "Learn optimization techniques",
            "Master complex algorithms"
        ],
        companySpecific: ["Google", "Alphabet"]
    },
    {
        title: "Microsoft Interview Experience & Questions",
        description: "Real Microsoft interview experiences, questions, and detailed solutions from successful candidates.",
        category: "Company Specific",
        subcategory: "Microsoft Preparation",
        type: "Article",
        url: "https://www.geeksforgeeks.org/microsoft-interview-questions/",
        provider: "GeeksforGeeks",
        difficulty: "Advanced",
        duration: "3-4 weeks",
        isPremium: false,
        rating: 4.5,
        tags: ["microsoft", "interview-experience", "real-questions"],
        estimatedTime: "40 hours",
        prerequisites: "Good programming skills",
        learningOutcomes: [
            "Learn Microsoft interview process",
            "Practice actual interview questions",
            "Understand evaluation criteria",
            "Get insider tips and strategies"
        ],
        companySpecific: ["Microsoft"]
    },
    {
        title: "Amazon SDE Interview Preparation Guide",
        description: "Complete Amazon Software Development Engineer interview preparation with leadership principles focus.",
        category: "Company Specific",
        subcategory: "Amazon Preparation",
        type: "Course",
        url: "https://www.geeksforgeeks.org/amazon-interview-questions/",
        provider: "GeeksforGeeks",
        difficulty: "Advanced",
        duration: "6-8 weeks",
        isPremium: false,
        rating: 4.6,
        tags: ["amazon", "sde", "leadership-principles", "behavioral"],
        estimatedTime: "60 hours",
        prerequisites: "Strong technical skills",
        learningOutcomes: [
            "Master Amazon's 16 leadership principles",
            "Practice behavioral interviews",
            "Solve Amazon coding questions",
            "Understand Amazon's hiring bar"
        ],
        companySpecific: ["Amazon"]
    },

    // CAREER GROWTH & RESUME
    {
        title: "Tech Resume Builder & Templates",
        description: "Professional resume templates and builder specifically designed for software engineers and tech professionals.",
        category: "Career Growth & Resume",
        subcategory: "Resume Building",
        type: "Tool",
        url: "https://www.overleaf.com/latex/templates/software-engineer-resume/gqxmqsvsbdjf",
        provider: "Overleaf",
        difficulty: "Beginner",
        duration: "2-3 hours",
        isPremium: false,
        rating: 4.3,
        tags: ["resume", "template", "tech", "professional"],
        estimatedTime: "3 hours",
        prerequisites: "None",
        learningOutcomes: [
            "Create professional tech resume",
            "Learn ATS-friendly formatting",
            "Highlight technical skills effectively",
            "Optimize for job applications"
        ]
    },
    {
        title: "LinkedIn Profile Optimization for Developers",
        description: "Complete guide to building an impressive LinkedIn profile that attracts tech recruiters.",
        category: "Career Growth & Resume",
        subcategory: "LinkedIn Optimization",
        type: "Article",
        url: "https://www.linkedin.com/advice/0/how-do-you-optimize-your-linkedin-profile",
        provider: "LinkedIn Learning",
        difficulty: "Beginner",
        duration: "2-3 hours",
        isPremium: false,
        rating: 4.1,
        tags: ["linkedin", "profile", "networking", "personal-branding"],
        estimatedTime: "3 hours",
        prerequisites: "LinkedIn account",
        learningOutcomes: [
            "Optimize LinkedIn headline and summary",
            "Showcase technical projects",
            "Build professional network",
            "Attract recruiter attention"
        ]
    },
    {
        title: "Coursera - Introduction to Data Science",
        description: "University-level course introduction to data science concepts, tools, and methodologies.",
        category: "Career Growth & Resume",
        subcategory: "Skill Development",
        type: "Course",
        url: "https://www.coursera.org/learn/what-is-datascience",
        provider: "Coursera - IBM",
        difficulty: "Beginner",
        duration: "6 weeks",
        isPremium: true,
        rating: 4.4,
        tags: ["data-science", "certification", "ibm", "beginner"],
        estimatedTime: "15 hours",
        prerequisites: "Basic math knowledge",
        learningOutcomes: [
            "Understand data science fundamentals",
            "Learn popular data science tools",
            "Get IBM certification",
            "Build portfolio projects"
        ]
    },

    // Additional High-Quality Resources
    {
        title: "CS50's Introduction to Computer Science",
        description: "Harvard's legendary computer science course covering programming fundamentals and computational thinking.",
        category: "Coding & DSA",
        subcategory: "Programming Fundamentals",
        type: "Course",
        url: "https://cs50.harvard.edu/x/",
        provider: "Harvard University (edX)",
        difficulty: "Beginner",
        duration: "12 weeks",
        isPremium: false,
        rating: 4.9,
        tags: ["harvard", "cs50", "programming", "fundamentals"],
        estimatedTime: "100 hours",
        prerequisites: "None",
        learningOutcomes: [
            "Learn programming fundamentals",
            "Understand computational thinking",
            "Master multiple programming languages",
            "Build real-world projects"
        ]
    },
    {
        title: "Frontend Development Complete Course",
        description: "Complete frontend development course covering HTML, CSS, JavaScript, React, and modern frameworks.",
        category: "Coding & DSA",
        subcategory: "Web Development",
        type: "Course",
        url: "https://www.freecodecamp.org/learn/responsive-web-design/",
        provider: "FreeCodeCamp",
        difficulty: "Beginner",
        duration: "16-20 weeks",
        isPremium: false,
        rating: 4.7,
        tags: ["frontend", "html", "css", "javascript", "react"],
        estimatedTime: "300 hours",
        prerequisites: "Basic computer skills",
        learningOutcomes: [
            "Master HTML, CSS, JavaScript",
            "Learn modern frontend frameworks",
            "Build responsive web applications",
            "Create portfolio projects"
        ]
    },
    {
        title: "Group Discussion Topics & Techniques",
        description: "Comprehensive guide to group discussions with current topics, strategies, and evaluation criteria.",
        category: "Communication Skills",
        subcategory: "Group Discussion",
        type: "Article",
        url: "https://www.edx.org/learn/communication/university-of-washington-speaking-to-inform-discussing-complex-ideas-with-clear-explanations-and-dynamic-slides",
        provider: "edX - University of Washington",
        difficulty: "Intermediate",
        duration: "2-3 weeks",
        isPremium: false,
        rating: 4.0,
        tags: ["group-discussion", "current-affairs", "debate", "leadership"],
        estimatedTime: "15 hours",
        prerequisites: "Basic communication skills",
        learningOutcomes: [
            "Master group discussion techniques",
            "Learn current affairs topics",
            "Develop leadership skills",
            "Improve public speaking"
        ]
    }
];

export const seedPreparationResources = async () => {
    try {
        // Clear existing resources
        await PreparationResource.deleteMany({});
        
        // Insert new resources
        await PreparationResource.insertMany(preparationResources);
        
        console.log("✅ Preparation resources seeded successfully!");
        console.log(`📊 Inserted ${preparationResources.length} resources`);
        
        // Log category breakdown
        const categoryBreakdown = preparationResources.reduce((acc, resource) => {
            acc[resource.category] = (acc[resource.category] || 0) + 1;
            return acc;
        }, {});
        
        console.log("📈 Category breakdown:", categoryBreakdown);
        
    } catch (error) {
        console.error("❌ Error seeding preparation resources:", error);
    }
};
