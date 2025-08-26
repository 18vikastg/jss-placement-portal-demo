import { COMPANIES, TECH_ROLES } from './constant';

// Function to redirect to company career page
export const redirectToCompanyCareer = (companyName) => {
    const company = COMPANIES.find(c => c.name.toLowerCase() === companyName.toLowerCase());
    
    if (company && company.careerLinks) {
        // Redirect to company's main career page
        window.open(company.careerLinks.main, '_blank');
        return true;
    }
    
    // Fallback: search on LinkedIn Jobs
    const fallbackUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(companyName)}&location=India`;
    window.open(fallbackUrl, '_blank');
    return false;
};

// Function to redirect to role-based job search
export const redirectToRoleSearch = (roleTitle, platform = 'linkedin') => {
    const role = TECH_ROLES.find(r => r.title.toLowerCase() === roleTitle.toLowerCase());
    
    if (role && role.searchLinks) {
        // Use specified platform or default to LinkedIn
        const url = role.searchLinks[platform] || role.searchLinks.linkedin;
        window.open(url, '_blank');
        return true;
    }
    
    // Fallback: search on LinkedIn Jobs
    const fallbackUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(roleTitle)}&location=India`;
    window.open(fallbackUrl, '_blank');
    return false;
};

// Function to get company career options
export const getCompanyCareerOptions = (companyName) => {
    const company = COMPANIES.find(c => c.name.toLowerCase() === companyName.toLowerCase());
    
    if (company && company.careerLinks) {
        return [
            { label: 'Main Career Page', url: company.careerLinks.main },
            { label: 'India Specific Jobs', url: company.careerLinks.india },
            { label: 'Student Programs', url: company.careerLinks.students },
            { label: 'Job Search', url: company.careerLinks.search }
        ];
    }
    
    return [];
};

// Function to get role search options
export const getRoleSearchOptions = (roleTitle) => {
    const role = TECH_ROLES.find(r => r.title.toLowerCase() === roleTitle.toLowerCase());
    
    if (role && role.searchLinks) {
        return [
            { label: 'Naukri.com', url: role.searchLinks.naukri, platform: 'naukri' },
            { label: 'LinkedIn', url: role.searchLinks.linkedin, platform: 'linkedin' },
            { label: 'Indeed', url: role.searchLinks.indeed, platform: 'indeed' },
            { label: 'Glassdoor', url: role.searchLinks.glassdoor, platform: 'glassdoor' }
        ];
    }
    
    return [];
};

// Function to show job search options modal
export const showJobSearchOptions = (searchQuery) => {
    // Check if it's a company name
    const isCompany = COMPANIES.some(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(c.name.toLowerCase())
    );
    
    // Check if it's a role
    const isRole = TECH_ROLES.some(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(r.title.toLowerCase())
    );
    
    if (isCompany) {
        const company = COMPANIES.find(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            searchQuery.toLowerCase().includes(c.name.toLowerCase())
        );
        return { type: 'company', data: company, options: getCompanyCareerOptions(company.name) };
    }
    
    if (isRole) {
        const role = TECH_ROLES.find(r => 
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            searchQuery.toLowerCase().includes(r.title.toLowerCase())
        );
        return { type: 'role', data: role, options: getRoleSearchOptions(role.title) };
    }
    
    return { type: 'general', data: null, options: [] };
};
