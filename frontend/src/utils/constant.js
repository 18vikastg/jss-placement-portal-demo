export const USER_API_END_POINT="http://localhost:8001/api/v1/user";
export const PROFILE_API_END_POINT="http://localhost:8001/api/v1/profile";
export const JOB_API_END_POINT="http://localhost:8001/api/v1/job";
export const APPLICATION_API_END_POINT="http://localhost:8001/api/v1/application";
export const COMPANY_API_END_POINT="http://localhost:8001/api/v1/company";

// Tech Roles Data
export const TECH_ROLES = [
    {
        id: 1,
        title: "Full Stack Developer",
        category: "Development",
        description: "Build end-to-end web applications using modern frameworks",
        skills: ["React", "Node.js", "MongoDB", "Express"],
        level: "Mid-Senior",
        avgSalary: "₹8-15 LPA"
    },
    {
        id: 2,
        title: "Frontend Developer",
        category: "Development",
        description: "Create responsive and interactive user interfaces",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        level: "Entry-Mid",
        avgSalary: "₹6-12 LPA"
    },
    {
        id: 3,
        title: "Backend Developer",
        category: "Development",
        description: "Design and maintain server-side applications and APIs",
        skills: ["Node.js", "Python", "Java", "Database"],
        level: "Mid-Senior",
        avgSalary: "₹7-14 LPA"
    },
    {
        id: 4,
        title: "Data Scientist",
        category: "Data",
        description: "Analyze complex data to derive business insights",
        skills: ["Python", "Machine Learning", "SQL", "Statistics"],
        level: "Mid-Senior",
        avgSalary: "₹10-20 LPA"
    },
    {
        id: 5,
        title: "DevOps Engineer",
        category: "Operations",
        description: "Manage deployment pipelines and cloud infrastructure",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        level: "Mid-Senior",
        avgSalary: "₹9-18 LPA"
    },
    {
        id: 6,
        title: "Mobile Developer",
        category: "Development",
        description: "Build native and cross-platform mobile applications",
        skills: ["React Native", "Flutter", "iOS", "Android"],
        level: "Mid-Senior",
        avgSalary: "₹8-16 LPA"
    },
    {
        id: 7,
        title: "UI/UX Designer",
        category: "Design",
        description: "Design user-centered digital experiences",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        level: "Entry-Mid",
        avgSalary: "₹5-12 LPA"
    },
    {
        id: 8,
        title: "Machine Learning Engineer",
        category: "AI/ML",
        description: "Deploy and scale machine learning models in production",
        skills: ["Python", "TensorFlow", "MLOps", "Cloud"],
        level: "Senior",
        avgSalary: "₹12-25 LPA"
    }
];

// Companies Data
export const COMPANIES = [
    {
        id: 1,
        name: "Google",
        logo: "https://logo.clearbit.com/google.com",
        industry: "Technology",
        location: "Bangalore",
        employeeCount: "10,000+",
        openPositions: 25,
        description: "Leading technology company focused on internet-related services",
        techStack: ["JavaScript", "Python", "Go", "Java"],
        benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget"]
    },
    {
        id: 2,
        name: "Microsoft",
        logo: "https://logo.clearbit.com/microsoft.com",
        industry: "Technology",
        location: "Hyderabad",
        employeeCount: "5,000+",
        openPositions: 18,
        description: "Global technology corporation developing software and cloud services",
        techStack: ["C#", "Azure", "TypeScript", "Python"],
        benefits: ["Health Insurance", "Stock Purchase Plan", "Remote Work", "Professional Development"]
    },
    {
        id: 3,
        name: "Amazon",
        logo: "https://logo.clearbit.com/amazon.com",
        industry: "E-commerce & Cloud",
        location: "Chennai",
        employeeCount: "15,000+",
        openPositions: 35,
        description: "E-commerce and cloud computing giant with global presence",
        techStack: ["Java", "Python", "AWS", "React"],
        benefits: ["Health Coverage", "Stock Awards", "Career Growth", "Innovation Time"]
    },
    {
        id: 4,
        name: "Infosys",
        logo: "https://logo.clearbit.com/infosys.com",
        industry: "IT Services",
        location: "Pune",
        employeeCount: "20,000+",
        openPositions: 42,
        description: "Global leader in next-generation digital services and consulting",
        techStack: ["Java", "Angular", "Spring", "Oracle"],
        benefits: ["Medical Insurance", "Training Programs", "Flexible Work", "Performance Bonus"]
    },
    {
        id: 5,
        name: "TCS",
        logo: "https://logo.clearbit.com/tcs.com",
        industry: "IT Services",
        location: "Mumbai",
        employeeCount: "25,000+",
        openPositions: 50,
        description: "Leading global IT services and business solutions organization",
        techStack: ["Java", "Python", ".NET", "React"],
        benefits: ["Health Benefits", "Skill Development", "Global Opportunities", "Work-Life Balance"]
    },
    {
        id: 6,
        name: "Flipkart",
        logo: "https://logo.clearbit.com/flipkart.com",
        industry: "E-commerce",
        location: "Bangalore",
        employeeCount: "8,000+",
        openPositions: 22,
        description: "India's leading e-commerce marketplace with innovative technology",
        techStack: ["Java", "React", "Node.js", "Scala"],
        benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours"]
    },
    {
        id: 7,
        name: "Wipro",
        logo: "https://logo.clearbit.com/wipro.com",
        industry: "IT Services",
        location: "Bangalore",
        employeeCount: "12,000+",
        openPositions: 38,
        description: "Global information technology and business process services company",
        techStack: ["Java", "Python", "Angular", "Cloud"],
        benefits: ["Medical Coverage", "Professional Growth", "Innovation Labs", "Global Exposure"]
    },
    {
        id: 8,
        name: "Accenture",
        logo: "https://logo.clearbit.com/accenture.com",
        industry: "Consulting",
        location: "Hyderabad",
        employeeCount: "15,000+",
        openPositions: 28,
        description: "Global professional services company with leading capabilities in digital",
        techStack: ["Salesforce", "Java", "React", "Azure"],
        benefits: ["Health Benefits", "Career Coaching", "Flexible Work", "Skill Certifications"]
    }
];

// Job Categories
export const JOB_CATEGORIES = [
    {
        name: "Full Stack Development",
        count: "150+ jobs",
        trending: true
    },
    {
        name: "Frontend Development", 
        count: "120+ jobs",
        trending: true
    },
    {
        name: "Backend Development",
        count: "110+ jobs",
        trending: false
    },
    {
        name: "Data Science",
        count: "85+ jobs",
        trending: true
    },
    {
        name: "DevOps Engineering",
        count: "75+ jobs",
        trending: true
    },
    {
        name: "Mobile Development",
        count: "65+ jobs",
        trending: false
    },
    {
        name: "UI/UX Design",
        count: "55+ jobs",
        trending: false
    },
    {
        name: "Machine Learning",
        count: "45+ jobs",
        trending: true
    }
];

// Sample Jobs Data for Browse page
export const SAMPLE_JOBS = [
    {
        _id: "sample1",
        title: "Software Engineer",
        company: {
            name: "TCS",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/TCS-Logo.png"
        },
        location: "Bangalore",
        description: "Join our dynamic team as a Software Engineer. Work on cutting-edge technologies and develop innovative solutions.",
        requirements: ["JavaScript", "React", "Node.js", "MongoDB"],
        salary: "8-12 LPA",
        experienceLevel: "0-2 years",
        jobType: "Full-time",
        position: 5,
        createdAt: new Date().toISOString()
    },
    {
        _id: "sample2",
        title: "Frontend Developer",
        company: {
            name: "Infosys",
            logo: "https://logos-world.net/wp-content/uploads/2020/06/Infosys-Logo.png"
        },
        location: "Mysore",
        description: "Create amazing user experiences with modern frontend technologies. Work with a collaborative team on exciting projects.",
        requirements: ["React", "TypeScript", "CSS", "HTML"],
        salary: "6-10 LPA",
        experienceLevel: "1-3 years",
        jobType: "Full-time",
        position: 3,
        createdAt: new Date().toISOString()
    },
    {
        _id: "sample3",
        title: "Full Stack Developer",
        company: {
            name: "Wipro",
            logo: "https://logos-world.net/wp-content/uploads/2020/06/Wipro-Logo.png"
        },
        location: "Bangalore",
        description: "Build end-to-end applications using modern tech stack. Opportunity to work on diverse projects and grow your skills.",
        requirements: ["Python", "Django", "React", "PostgreSQL"],
        salary: "10-15 LPA",
        experienceLevel: "2-4 years",
        jobType: "Full-time",
        position: 4,
        createdAt: new Date().toISOString()
    },
    {
        _id: "sample4",
        title: "Data Analyst",
        company: {
            name: "Accenture",
            logo: "https://logos-world.net/wp-content/uploads/2020/07/Accenture-Logo.png"
        },
        location: "Pune",
        description: "Analyze complex datasets to drive business insights. Work with advanced analytics tools and machine learning algorithms.",
        requirements: ["Python", "SQL", "Tableau", "Excel"],
        salary: "7-11 LPA",
        experienceLevel: "1-3 years",
        jobType: "Full-time",
        position: 2,
        createdAt: new Date().toISOString()
    },
    {
        _id: "sample5",
        title: "DevOps Engineer",
        company: {
            name: "HCL Technologies",
            logo: "https://logos-world.net/wp-content/uploads/2020/06/HCL-Logo.png"
        },
        location: "Chennai",
        description: "Streamline development and deployment processes. Work with cloud technologies and automation tools.",
        requirements: ["AWS", "Docker", "Kubernetes", "Jenkins"],
        salary: "12-18 LPA",
        experienceLevel: "3-5 years",
        jobType: "Full-time",
        position: 3,
        createdAt: new Date().toISOString()
    }
];