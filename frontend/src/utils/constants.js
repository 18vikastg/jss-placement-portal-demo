export const USER_API_END_POINT="http://localhost:8001/api/v1/user";
export const PROFILE_API_END_POINT="http://localhost:8001/api/v1/profile";
export const JOB_API_END_POINT="http://localhost:8001/api/v1/job";
export const APPLICATION_API_END_POINT="http://localhost:8001/api/v1/application";
export const COMPANY_API_END_POINT="http://localhost:8001/api/v1/company";

// Tech Roles Data with Job Search Links
export const TECH_ROLES = [
    {
        id: 1,
        title: "Full Stack Developer",
        category: "Development",
        description: "Build end-to-end web applications using modern frameworks",
        skills: ["React", "Node.js", "MongoDB", "Express"],
        level: "Mid-Senior",
        avgSalary: "₹8-15 LPA",
        icon: "💻",
        searchLinks: {
            naukri: "https://www.naukri.com/full-stack-developer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=full%20stack%20developer&location=India",
            indeed: "https://in.indeed.com/jobs?q=full+stack+developer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-full-stack-developer-jobs-SRCH_IL.0,5_IN115_KO6,27.htm"
        }
    },
    {
        id: 2,
        title: "Frontend Developer",
        category: "Development",
        description: "Create responsive and interactive user interfaces",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        level: "Entry-Mid",
        avgSalary: "₹6-12 LPA",
        icon: "🎨",
        searchLinks: {
            naukri: "https://www.naukri.com/frontend-developer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer&location=India",
            indeed: "https://in.indeed.com/jobs?q=frontend+developer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-frontend-developer-jobs-SRCH_IL.0,5_IN115_KO6,24.htm"
        }
    },
    {
        id: 3,
        title: "Backend Developer",
        category: "Development",
        description: "Design and maintain server-side applications and APIs",
        skills: ["Node.js", "Python", "Java", "Database"],
        level: "Mid-Senior",
        avgSalary: "₹7-14 LPA",
        icon: "⚙️",
        searchLinks: {
            naukri: "https://www.naukri.com/backend-developer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=backend%20developer&location=India",
            indeed: "https://in.indeed.com/jobs?q=backend+developer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-backend-developer-jobs-SRCH_IL.0,5_IN115_KO6,23.htm"
        }
    },
    {
        id: 4,
        title: "Data Scientist",
        category: "Data",
        description: "Analyze complex data to derive business insights",
        skills: ["Python", "Machine Learning", "SQL", "Statistics"],
        level: "Mid-Senior",
        avgSalary: "₹10-20 LPA",
        icon: "📊",
        searchLinks: {
            naukri: "https://www.naukri.com/data-scientist-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=data%20scientist&location=India",
            indeed: "https://in.indeed.com/jobs?q=data+scientist&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-data-scientist-jobs-SRCH_IL.0,5_IN115_KO6,20.htm"
        }
    },
    {
        id: 5,
        title: "DevOps Engineer",
        category: "Infrastructure",
        description: "Automate deployment and manage cloud infrastructure",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        level: "Mid-Senior",
        avgSalary: "₹9-18 LPA",
        icon: "�",
        searchLinks: {
            naukri: "https://www.naukri.com/devops-engineer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=devops%20engineer&location=India",
            indeed: "https://in.indeed.com/jobs?q=devops+engineer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-devops-engineer-jobs-SRCH_IL.0,5_IN115_KO6,21.htm"
        }
    },
    {
        id: 6,
        title: "UI/UX Designer",
        category: "Design",
        description: "Design intuitive and beautiful user experiences",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        level: "Entry-Mid",
        avgSalary: "₹6-14 LPA",
        icon: "🎨",
        searchLinks: {
            naukri: "https://www.naukri.com/ui-ux-designer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=ui%20ux%20designer&location=India",
            indeed: "https://in.indeed.com/jobs?q=ui+ux+designer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-ui-ux-designer-jobs-SRCH_IL.0,5_IN115_KO6,21.htm"
        }
    },
    {
        id: 7,
        title: "Product Manager",
        category: "Management",
        description: "Drive product strategy and coordinate development teams",
        skills: ["Strategy", "Analytics", "Communication", "Agile"],
        level: "Mid-Senior",
        avgSalary: "₹5-12 LPA",
        icon: "🎯",
        searchLinks: {
            naukri: "https://www.naukri.com/product-manager-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=product%20manager&location=India",
            indeed: "https://in.indeed.com/jobs?q=product+manager&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-product-manager-jobs-SRCH_IL.0,5_IN115_KO6,21.htm"
        }
    },
    {
        id: 8,
        title: "Machine Learning Engineer",
        category: "AI/ML",
        description: "Deploy and scale machine learning models in production",
        skills: ["Python", "TensorFlow", "MLOps", "Cloud"],
        level: "Senior",
        avgSalary: "₹12-25 LPA",
        icon: "🤖",
        searchLinks: {
            naukri: "https://www.naukri.com/machine-learning-engineer-jobs",
            linkedin: "https://www.linkedin.com/jobs/search/?keywords=machine%20learning%20engineer&location=India",
            indeed: "https://in.indeed.com/jobs?q=machine+learning+engineer&l=India",
            glassdoor: "https://www.glassdoor.co.in/Job/india-machine-learning-engineer-jobs-SRCH_IL.0,5_IN115_KO6,30.htm"
        }
    }
];

// Companies Data with Career Page Links
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
        benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget"],
        rating: 4.8,
        founded: 1998,
        careerLinks: {
            main: "https://careers.google.com/",
            india: "https://careers.google.com/locations/india/",
            students: "https://careers.google.com/students/",
            search: "https://careers.google.com/jobs/results/?location=India"
        }
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
        benefits: ["Health Insurance", "Stock Purchase Plan", "Remote Work", "Professional Development"],
        rating: 4.7,
        founded: 1975,
        careerLinks: {
            main: "https://careers.microsoft.com/",
            india: "https://careers.microsoft.com/v2/global/en/locations/india.html",
            students: "https://careers.microsoft.com/v2/global/en/students-and-graduates.html",
            search: "https://careers.microsoft.com/v2/global/en/search?lc=India"
        }
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
        benefits: ["Health Coverage", "Stock Awards", "Career Growth", "Innovation Time"],
        rating: 4.5,
        founded: 1994,
        careerLinks: {
            main: "https://www.amazon.jobs/",
            india: "https://www.amazon.jobs/en/locations/india",
            students: "https://www.amazon.jobs/en/teams/university-recruiting",
            search: "https://www.amazon.jobs/en/search?base_query=&loc_query=India"
        }
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
        benefits: ["Medical Insurance", "Training Programs", "Flexible Work", "Performance Bonus"],
        rating: 4.3,
        founded: 1981,
        careerLinks: {
            main: "https://www.infosys.com/careers/",
            india: "https://www.infosys.com/careers/job-opportunities/",
            students: "https://www.infosys.com/careers/students/",
            search: "https://careers.infosys.com/apply"
        }
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
        benefits: ["Health Benefits", "Skill Development", "Global Opportunities", "Work-Life Balance"],
        rating: 4.2,
        founded: 1968,
        careerLinks: {
            main: "https://www.tcs.com/careers",
            india: "https://www.tcs.com/careers/tcs-india",
            students: "https://www.tcs.com/careers/students-and-graduates",
            search: "https://ibegin.tcs.com/iBegin/"
        }
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
        benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours"],
        rating: 4.4,
        founded: 2007,
        careerLinks: {
            main: "https://www.flipkartcareers.com/",
            india: "https://www.flipkartcareers.com/#!/joblist",
            students: "https://www.flipkartcareers.com/#!/early-careers",
            search: "https://www.flipkartcareers.com/#!/joblist"
        }
    },
    {
        id: 7,
        name: "Wipro",
        logo: "https://logo.clearbit.com/wipro.com",
        industry: "IT Services",
        location: "Hyderabad",
        employeeCount: "12,000+",
        openPositions: 30,
        description: "Global information technology, consulting and business process services",
        techStack: ["Java", "Python", "Cloud", "AI/ML"],
        benefits: ["Medical Coverage", "Professional Growth", "Innovation Labs", "Global Exposure"],
        rating: 4.1,
        founded: 1945,
        careerLinks: {
            main: "https://careers.wipro.com/",
            india: "https://careers.wipro.com/careers-in-india",
            students: "https://careers.wipro.com/early-careers",
            search: "https://careers.wipro.com/job-search"
        }
    },
    {
        id: 8,
        name: "Accenture",
        logo: "https://logo.clearbit.com/accenture.com",
        industry: "Consulting",
        location: "Pune",
        employeeCount: "15,000+",
        openPositions: 28,
        description: "Global professional services company with leading capabilities in digital",
        techStack: ["Java", "Angular", "Cloud", "Blockchain"],
        benefits: ["Health Insurance", "Career Coaching", "Innovation Time", "Global Projects"],
        rating: 4.3,
        founded: 1989,
        careerLinks: {
            main: "https://www.accenture.com/in-en/careers",
            india: "https://www.accenture.com/in-en/careers/local/india",
            students: "https://www.accenture.com/in-en/careers/jobsearch?jk=entry%20level",
            search: "https://www.accenture.com/in-en/careers/jobsearch"
        }
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
        benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours"],
        rating: 4.4,
        founded: 2007
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
        benefits: ["Medical Coverage", "Professional Growth", "Innovation Labs", "Global Exposure"],
        rating: 4.1,
        founded: 1945
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
        benefits: ["Health Benefits", "Career Coaching", "Flexible Work", "Skill Certifications"],
        rating: 4.3,
        founded: 1989
    }
];

// Job Categories
export const JOB_CATEGORIES = [
    {
        name: "Full Stack Development",
        count: "150+ jobs",
        trending: true,
        growth: "+25%"
    },
    {
        name: "Frontend Development", 
        count: "120+ jobs",
        trending: true,
        growth: "+20%"
    },
    {
        name: "Backend Development",
        count: "110+ jobs",
        trending: false,
        growth: "+15%"
    },
    {
        name: "Data Science",
        count: "85+ jobs",
        trending: true,
        growth: "+35%"
    },
    {
        name: "DevOps Engineering",
        count: "75+ jobs",
        trending: true,
        growth: "+30%"
    },
    {
        name: "Mobile Development",
        count: "65+ jobs",
        trending: false,
        growth: "+12%"
    },
    {
        name: "UI/UX Design",
        count: "55+ jobs",
        trending: false,
        growth: "+18%"
    },
    {
        name: "Machine Learning",
        count: "45+ jobs",
        trending: true,
        growth: "+40%"
    }
];

// Sample Jobs Data
export const SAMPLE_JOBS = [
    {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "Google",
        location: "Bangalore",
        salary: "₹15-25 LPA",
        experience: "3-5 years",
        type: "Full Time",
        skills: ["React", "Node.js", "MongoDB", "AWS"],
        description: "Build scalable web applications using modern tech stack",
        posted: "2 days ago",
        applicants: 234
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Microsoft",
        location: "Hyderabad",
        salary: "₹10-18 LPA",
        experience: "2-4 years",
        type: "Full Time",
        skills: ["React", "TypeScript", "CSS", "Jest"],
        description: "Create beautiful and responsive user interfaces",
        posted: "1 day ago",
        applicants: 189
    },
    {
        id: 3,
        title: "Backend Developer",
        company: "Amazon",
        location: "Chennai",
        salary: "₹12-20 LPA",
        experience: "2-5 years",
        type: "Full Time",
        skills: ["Java", "Spring Boot", "AWS", "Docker"],
        description: "Design and develop robust backend systems",
        posted: "3 days ago",
        applicants: 156
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "Flipkart",
        location: "Bangalore",
        salary: "₹18-30 LPA",
        experience: "3-6 years",
        type: "Full Time",
        skills: ["Python", "Machine Learning", "SQL", "Tableau"],
        description: "Analyze data to drive business insights and decisions",
        posted: "1 week ago",
        applicants: 98
    }
];
