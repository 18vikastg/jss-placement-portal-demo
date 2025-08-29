import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle file upload if present
        let profilePhoto = "";
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhoto
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log("User registration error:", error);
        console.log("Error details:", error.message);
        if (error.name === 'ValidationError') {
            console.log("Validation errors:", error.errors);
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { 
            fullname, 
            email, 
            phoneNumber, 
            bio, 
            skills, 
            // Student specific fields
            studentId,
            branch,
            semester,
            cgpa,
            tenthMarks,
            twelfthMarks,
            address,
            dateOfBirth,
            projects,
            internships,
            // Placement preferences
            preferredDomains,
            locationPreferences,
            expectedSalary,
            // Academic achievements
            achievements,
            backlogs
        } = req.body;
        
        const file = req.file;
        let cloudResponse;
        
        // Handle file upload only if file exists
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if(skills){
            skillsArray = typeof skills === 'string' ? skills.split(",") : skills;
        }
        
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        
        // updating basic data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
        
        // Student specific fields
        if(studentId) user.profile.studentId = studentId
        if(branch) user.profile.branch = branch
        if(semester) user.profile.semester = semester
        if(cgpa) user.profile.cgpa = cgpa
        if(tenthMarks) user.profile.tenthMarks = tenthMarks
        if(twelfthMarks) user.profile.twelfthMarks = twelfthMarks
        if(address) user.profile.address = address
        if(dateOfBirth) user.profile.dateOfBirth = dateOfBirth
        if(projects) user.profile.projects = projects
        if(internships) user.profile.internships = internships
        
        // Placement preferences
        if(preferredDomains) user.profile.preferredDomains = Array.isArray(preferredDomains) ? preferredDomains : preferredDomains.split(',')
        if(locationPreferences) user.profile.locationPreferences = Array.isArray(locationPreferences) ? locationPreferences : locationPreferences.split(',')
        if(expectedSalary) user.profile.expectedSalary = expectedSalary
        
        // Academic achievements
        if(achievements) user.profile.achievements = achievements
        if(backlogs !== undefined) user.profile.backlogs = backlogs
      
        // resume upload
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Enhanced Profile Update with comprehensive debugging
export const updateEnhancedProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {
            fullname,
            email,
            phoneNumber,
            bio,
            address,
            dateOfBirth,
            branch,
            semester,
            cgpa,
            university,
            year,
            skills,
            experiences,
            projects,
            certifications,
            socialLinks
        } = req.body;

        console.log('=== PROFILE UPDATE DEBUG START ===');
        console.log('Raw received data:', {
            fullname,
            email,
            phoneNumber,
            bio,
            address,
            dateOfBirth,
            branch,
            semester,
            cgpa,
            university,
            year,
            skills: typeof skills,
            skillsValue: skills,
            experiences: typeof experiences,
            experiencesValue: experiences,
            projects: typeof projects,
            projectsValue: projects,
            certifications: typeof certifications,
            certificationsValue: certifications,
            socialLinks: typeof socialLinks,
            socialLinksValue: socialLinks
        });

        // Handle file upload if present (resume)
        let resumeUrl = "";
        let resumeOriginalName = "";
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            resumeUrl = cloudResponse.secure_url;
            resumeOriginalName = file.originalname;
            console.log('File uploaded:', resumeUrl);
        }

        // Enhanced JSON parsing with detailed logging
        const parseJsonSafely = (data, fieldName) => {
            console.log(`Parsing ${fieldName}:`, { type: typeof data, value: data });
            
            // If it's already an array, return it
            if (Array.isArray(data)) {
                console.log(`${fieldName} is already an array:`, data);
                return data;
            }
            
            // If it's a string, try to parse it
            if (typeof data === 'string') {
                // Handle empty string
                if (data.trim() === '' || data === 'undefined' || data === 'null') {
                    console.log(`${fieldName} is empty string, returning empty array`);
                    return [];
                }
                
                // Handle the literal 'JSON string' case
                if (data === 'JSON string') {
                    console.log(`${fieldName} is literal 'JSON string', returning empty array`);
                    return [];
                }
                
                try {
                    const parsed = JSON.parse(data);
                    console.log(`${fieldName} successfully parsed:`, parsed);
                    return Array.isArray(parsed) ? parsed : [];
                } catch (error) {
                    console.log(`${fieldName} JSON parse failed:`, error.message);
                    return [];
                }
            }
            
            // If it's an object, handle accordingly
            if (typeof data === 'object' && data !== null) {
                console.log(`${fieldName} is object:`, data);
                return data;
            }
            
            console.log(`${fieldName} fallback to empty array/object`);
            return fieldName === 'socialLinks' ? {} : [];
        };

        const parsedSkills = parseJsonSafely(skills, 'skills');
        const parsedExperiences = parseJsonSafely(experiences, 'experiences');
        const parsedProjects = parseJsonSafely(projects, 'projects');
        const parsedCertifications = parseJsonSafely(certifications, 'certifications');
        const parsedSocialLinks = parseJsonSafely(socialLinks, 'socialLinks');

        console.log('Final parsed data:', {
            skills: parsedSkills,
            experiences: parsedExperiences,
            projects: parsedProjects,
            certifications: parsedCertifications,
            socialLinks: parsedSocialLinks
        });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        console.log('User before update:', {
            skills: user.profile?.skills?.length || 0,
            experiences: user.profile?.experiences?.length || 0,
            projects: user.profile?.projects?.length || 0,
            certifications: user.profile?.certifications?.length || 0
        });

        // Update user data
        if (fullname !== undefined) user.fullname = fullname;
        if (email !== undefined) user.email = email;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

        // Ensure profile object exists
        if (!user.profile) {
            user.profile = {};
        }

        // Update profile data with proper handling
        if (bio !== undefined) user.profile.bio = bio;
        if (address !== undefined) user.profile.address = address;
        if (dateOfBirth !== undefined) user.profile.dateOfBirth = dateOfBirth;
        if (branch !== undefined) user.profile.branch = branch;
        if (semester !== undefined) user.profile.semester = semester;
        if (cgpa !== undefined) user.profile.cgpa = cgpa;
        if (university !== undefined) user.profile.university = university;
        if (year !== undefined) user.profile.year = year;
        
        // Always update arrays, even if empty (this ensures they exist)
        user.profile.skills = parsedSkills;
        user.profile.experiences = parsedExperiences;
        user.profile.projects = parsedProjects;
        user.profile.certifications = parsedCertifications;
        user.profile.socialLinks = parsedSocialLinks;
        
        if (resumeUrl) {
            user.profile.resume = resumeUrl;
            user.profile.resumeOriginalName = resumeOriginalName;
        }

        // Validate data before saving
        console.log('Data being saved:', {
            skills: user.profile.skills,
            skillsLength: user.profile.skills.length,
            experiences: user.profile.experiences,
            experiencesLength: user.profile.experiences.length,
            projects: user.profile.projects,
            projectsLength: user.profile.projects.length,
            certifications: user.profile.certifications,
            certificationsLength: user.profile.certifications.length
        });

        await user.save();

        console.log('User after save:', {
            skills: user.profile?.skills?.length || 0,
            experiences: user.profile?.experiences?.length || 0,
            projects: user.profile?.projects?.length || 0,
            certifications: user.profile?.certifications?.length || 0
        });

        console.log('=== PROFILE UPDATE DEBUG END ===');

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.log('Enhanced profile update error:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

// Enhanced Resume PDF Generation with comprehensive data inclusion
export const generateResumePDF = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        console.log('=== RESUME GENERATION DEBUG START ===');
        console.log('User ID:', userId);
        console.log('User profile data from DB:', {
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            bio: user.profile?.bio,
            branch: user.profile?.branch,
            semester: user.profile?.semester,
            cgpa: user.profile?.cgpa,
            university: user.profile?.university,
            year: user.profile?.year,
            address: user.profile?.address,
            skills: user.profile?.skills,
            skillsLength: user.profile?.skills?.length,
            experiences: user.profile?.experiences,
            experiencesLength: user.profile?.experiences?.length,
            projects: user.profile?.projects,
            projectsLength: user.profile?.projects?.length,
            certifications: user.profile?.certifications,
            certificationsLength: user.profile?.certifications?.length,
            socialLinks: user.profile?.socialLinks
        });

        // Use actual user data from database
        const profileData = {
            fullname: user.fullname || 'Student Name',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            bio: user.profile?.bio || '',
            address: user.profile?.address || '',
            dateOfBirth: user.profile?.dateOfBirth || '',
            branch: user.profile?.branch || '',
            semester: user.profile?.semester || '',
            cgpa: user.profile?.cgpa || '',
            university: user.profile?.university || 'JSS Academy of Technical Education',
            year: user.profile?.year || '',
            skills: user.profile?.skills || [],
            experiences: user.profile?.experiences || [],
            projects: user.profile?.projects || [],
            certifications: user.profile?.certifications || [],
            socialLinks: user.profile?.socialLinks || {
                github: '',
                linkedin: '',
                portfolio: ''
            }
        };

        console.log('Final profile data for resume:', {
            fullname: profileData.fullname,
            skillsCount: profileData.skills.length,
            experiencesCount: profileData.experiences.length,
            projectsCount: profileData.projects.length,
            certificationsCount: profileData.certifications.length,
            hasBio: !!profileData.bio,
            hasBranch: !!profileData.branch,
            hasCGPA: !!profileData.cgpa,
            hasAddress: !!profileData.address
        });

        // Create PDF document
        const doc = new PDFDocument({ margin: 50 });
        let filename = `${profileData.fullname.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
        filename = encodeURIComponent(filename);

        // Set response headers
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe PDF to response
        doc.pipe(res);

        // PDF Content Generation
        const primaryColor = '#8B1538'; // JSS Maroon
        const accentColor = '#D97706';   // JSS Gold
        const textColor = '#2D3748';     // Dark gray for text

        // Header with JSS Branding
        doc.rect(0, 0, doc.page.width, 80).fill(primaryColor);
        
        // Name and Title
        doc.fillColor('white')
           .fontSize(26)
           .font('Helvetica-Bold')
           .text(profileData.fullname, 50, 20);
        
        doc.fontSize(12)
           .font('Helvetica')
           .text(`${profileData.branch || 'Student'} | JSS Academy of Technical Education`, 50, 50);

        // Contact Information Section
        let yPosition = 100;
        doc.fillColor(textColor)
           .fontSize(10)
           .font('Helvetica');

        const contactInfo = [];
        if (profileData.email) contactInfo.push(`📧 ${profileData.email}`);
        if (profileData.phoneNumber) contactInfo.push(`📱 ${profileData.phoneNumber}`);
        if (profileData.address) contactInfo.push(`📍 ${profileData.address}`);
        if (profileData.socialLinks?.linkedin) contactInfo.push(`🔗 ${profileData.socialLinks.linkedin}`);
        if (profileData.socialLinks?.github) contactInfo.push(`💻 ${profileData.socialLinks.github}`);
        if (profileData.socialLinks?.portfolio) contactInfo.push(`🌐 ${profileData.socialLinks.portfolio}`);

        console.log('Contact info items:', contactInfo);

        contactInfo.forEach((info, index) => {
            const x = 50 + (index % 2) * 270;
            const y = yPosition + Math.floor(index / 2) * 15;
            doc.text(info, x, y);
        });

        yPosition += Math.ceil(contactInfo.length / 2) * 15 + 25;

        // Professional Summary Section
        if (profileData.bio && profileData.bio.trim()) {
            console.log('Adding bio section');
            if (yPosition > 700) {
                doc.addPage();
                yPosition = 50;
            }
            
            doc.fillColor(primaryColor)
               .fontSize(16)
               .font('Helvetica-Bold')
               .text('PROFESSIONAL SUMMARY', 50, yPosition);
            
            yPosition += 25;
            doc.fillColor(textColor)
               .fontSize(11)
               .font('Helvetica')
               .text(profileData.bio.trim(), 50, yPosition, { width: 500, align: 'justify' });
            
            yPosition += doc.heightOfString(profileData.bio.trim(), { width: 500 }) + 25;
        }

        // Education Section
        console.log('Adding education section');
        if (yPosition > 650) {
            doc.addPage();
            yPosition = 50;
        }
        
        doc.fillColor(primaryColor)
           .fontSize(16)
           .font('Helvetica-Bold')
           .text('EDUCATION', 50, yPosition);
        
        yPosition += 25;
        doc.fillColor(textColor)
           .fontSize(13)
           .font('Helvetica-Bold')
           .text(profileData.university, 50, yPosition);
        
        yPosition += 18;
        const academicInfo = [];
        if (profileData.branch) academicInfo.push(profileData.branch);
        if (profileData.year) academicInfo.push(`Class of ${profileData.year}`);
        if (profileData.semester) academicInfo.push(`Semester ${profileData.semester}`);
        if (profileData.cgpa) academicInfo.push(`CGPA: ${profileData.cgpa}/10`);
        
        const academicText = academicInfo.join(' | ');
        doc.fontSize(11)
           .font('Helvetica')
           .text(academicText, 50, yPosition);
        
        yPosition += 30;

        // Technical Skills Section
        if (profileData.skills && profileData.skills.length > 0) {
            const validSkills = profileData.skills.filter(skill => skill && skill.trim());
            console.log('Adding skills section with', validSkills.length, 'skills:', validSkills);
            
            if (validSkills.length > 0) {
                if (yPosition > 650) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(16)
                   .font('Helvetica-Bold')
                   .text('TECHNICAL SKILLS', 50, yPosition);
                
                yPosition += 25;
                
                const skillsText = validSkills.join(' • ');
                doc.fillColor(textColor)
                   .fontSize(11)
                   .font('Helvetica')
                   .text(skillsText, 50, yPosition, { width: 500 });
                
                yPosition += doc.heightOfString(skillsText, { width: 500 }) + 25;
            }
        } else {
            console.log('No valid skills found for resume');
        }

        // Experience Section
        if (profileData.experiences && profileData.experiences.length > 0) {
            const validExperiences = profileData.experiences.filter(exp => 
                exp && exp.title && exp.company && exp.title.trim() && exp.company.trim()
            );
            console.log('Adding experience section with', validExperiences.length, 'experiences:', validExperiences);
            
            if (validExperiences.length > 0) {
                if (yPosition > 600) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(16)
                   .font('Helvetica-Bold')
                   .text('PROFESSIONAL EXPERIENCE', 50, yPosition);
                
                yPosition += 25;
                
                validExperiences.forEach((exp, index) => {
                    if (yPosition > 700) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor(textColor)
                       .fontSize(13)
                       .font('Helvetica-Bold')
                       .text(exp.title, 50, yPosition);
                    
                    doc.fontSize(12)
                       .font('Helvetica-Bold')
                       .fillColor(accentColor)
                       .text(exp.company, 50, yPosition + 18);
                    
                    if (exp.duration && exp.duration.trim()) {
                        doc.fontSize(10)
                           .font('Helvetica')
                           .fillColor('gray')
                           .text(exp.duration, 400, yPosition + 18);
                    }
                    
                    if (exp.description && exp.description.trim()) {
                        doc.fillColor(textColor)
                           .fontSize(11)
                           .font('Helvetica')
                           .text(exp.description, 50, yPosition + 38, { width: 500, align: 'justify' });
                        
                        yPosition += 58 + doc.heightOfString(exp.description, { width: 500 });
                    } else {
                        yPosition += 58;
                    }
                    
                    if (index < validExperiences.length - 1) {
                        yPosition += 10; // Space between experiences
                    }
                });
                
                yPosition += 25;
            }
        } else {
            console.log('No valid experiences found for resume');
        }

        // Projects Section
        if (profileData.projects && profileData.projects.length > 0) {
            const validProjects = profileData.projects.filter(project => 
                project && project.title && project.description && 
                project.title.trim() && project.description.trim()
            );
            console.log('Adding projects section with', validProjects.length, 'projects:', validProjects);
            
            if (validProjects.length > 0) {
                if (yPosition > 600) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(16)
                   .font('Helvetica-Bold')
                   .text('PROJECTS', 50, yPosition);
                
                yPosition += 25;
                
                validProjects.forEach((project, index) => {
                    if (yPosition > 700) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor(textColor)
                       .fontSize(13)
                       .font('Helvetica-Bold')
                       .text(project.title, 50, yPosition);
                    
                    if (project.technologies && project.technologies.trim()) {
                        doc.fontSize(10)
                           .font('Helvetica')
                           .fillColor(accentColor)
                           .text(`Tech Stack: ${project.technologies}`, 50, yPosition + 18);
                        yPosition += 18;
                    }
                    
                    doc.fillColor(textColor)
                       .fontSize(11)
                       .font('Helvetica')
                       .text(project.description, 50, yPosition + 18, { width: 500, align: 'justify' });
                    
                    yPosition += 38 + doc.heightOfString(project.description, { width: 500 });
                    
                    if (project.link && project.link.trim()) {
                        doc.fillColor(accentColor)
                           .fontSize(10)
                           .text(`🔗 ${project.link}`, 50, yPosition);
                        yPosition += 15;
                    }
                    
                    if (index < validProjects.length - 1) {
                        yPosition += 15; // Space between projects
                    }
                });
                
                yPosition += 25;
            }
        } else {
            console.log('No valid projects found for resume');
        }

        // Certifications Section
        if (profileData.certifications && profileData.certifications.length > 0) {
            const validCertifications = profileData.certifications.filter(cert => 
                cert && cert.name && cert.name.trim()
            );
            console.log('Adding certifications section with', validCertifications.length, 'certifications:', validCertifications);
            
            if (validCertifications.length > 0) {
                if (yPosition > 650) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(16)
                   .font('Helvetica-Bold')
                   .text('CERTIFICATIONS', 50, yPosition);
                
                yPosition += 25;
                
                validCertifications.forEach((cert) => {
                    if (yPosition > 720) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor(textColor)
                       .fontSize(12)
                       .font('Helvetica-Bold')
                       .text(cert.name, 50, yPosition);
                    
                    const certDetails = [];
                    if (cert.issuer && cert.issuer.trim()) certDetails.push(cert.issuer);
                    if (cert.date && cert.date.trim()) certDetails.push(cert.date);
                    
                    if (certDetails.length > 0) {
                        doc.fontSize(10)
                           .font('Helvetica')
                           .fillColor('gray')
                           .text(certDetails.join(' | '), 50, yPosition + 15);
                    }
                    
                    yPosition += 35;
                });
            }
        } else {
            console.log('No valid certifications found for resume');
        }

        // Footer
        doc.fillColor(primaryColor)
           .fontSize(8)
           .text('Generated by JSS Placement Portal | JSS Academy of Technical Education', 50, doc.page.height - 30);

        console.log('=== RESUME GENERATION DEBUG END ===');

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.log('Resume generation error:', error);
        return res.status(500).json({
            message: "Failed to generate resume",
            success: false,
            error: error.message
        });
    }
};

        // PDF Content Generation
        const primaryColor = '#1e3a8a'; // JSS Navy Blue
        const accentColor = '#f59e0b';   // JSS Gold

        // Header with JSS Branding
        doc.rect(0, 0, doc.page.width, 80).fill(primaryColor);
        
        // Name and Title
        doc.fillColor('white')
           .fontSize(24)
           .font('Helvetica-Bold')
           .text(profileData.fullname || user.fullname, 50, 25);
        
        doc.fontSize(12)
           .font('Helvetica')
           .text(`${profileData.branch || user.profile?.branch || 'Student'} | JSS Academy of Technical Education`, 50, 55);

        // Contact Information
        let yPosition = 100;
        doc.fillColor('black')
           .fontSize(10)
           .font('Helvetica');

        const contactInfo = [
            `📧 ${profileData.email || user.email}`,
            `📱 ${profileData.phoneNumber || user.phoneNumber}`,
            ...(profileData.socialLinks?.linkedin ? [`🔗 ${profileData.socialLinks.linkedin}`] : []),
            ...(profileData.socialLinks?.github ? [`💻 ${profileData.socialLinks.github}`] : [])
        ];

        contactInfo.forEach((info, index) => {
            doc.text(info, 50 + (index % 2) * 250, yPosition + Math.floor(index / 2) * 15);
        });

        yPosition += Math.ceil(contactInfo.length / 2) * 15 + 20;

        // Bio Section
        if (profileData.bio) {
            doc.fillColor(primaryColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('PROFESSIONAL SUMMARY', 50, yPosition);
            
            yPosition += 25;
            doc.fillColor('black')
               .fontSize(10)
               .font('Helvetica')
               .text(profileData.bio, 50, yPosition, { width: 500, align: 'justify' });
            
            yPosition += doc.heightOfString(profileData.bio, { width: 500 }) + 20;
        }

        // Education Section
        doc.fillColor(primaryColor)
           .fontSize(14)
           .font('Helvetica-Bold')
           .text('EDUCATION', 50, yPosition);
        
        yPosition += 25;
        doc.fillColor('black')
           .fontSize(12)
           .font('Helvetica-Bold')
           .text(profileData.university || 'JSS Academy of Technical Education', 50, yPosition);
        
        yPosition += 15;
        const academicInfo = [
            `${profileData.branch || user.profile?.branch || 'Engineering'}`,
            ...(profileData.year ? [`Class of ${profileData.year}`] : []),
            ...(profileData.cgpa ? [`CGPA: ${profileData.cgpa}/10`] : [])
        ].join(' | ');
        
        doc.fontSize(10)
           .font('Helvetica')
           .text(academicInfo, 50, yPosition);
        
        yPosition += 30;

        // Skills Section
        if (profileData.skills && profileData.skills.length > 0) {
            // Check if we need a new page
            if (yPosition > 650) {
                doc.addPage();
                yPosition = 50;
            }
            
            doc.fillColor(primaryColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('TECHNICAL SKILLS', 50, yPosition);
            
            yPosition += 25;
            
            // Format skills in a more structured way
            const skillsText = profileData.skills.filter(skill => skill && skill.trim()).join(' • ');
            if (skillsText) {
                doc.fillColor('black')
                   .fontSize(10)
                   .font('Helvetica')
                   .text(skillsText, 50, yPosition, { width: 500 });
                
                yPosition += doc.heightOfString(skillsText, { width: 500 }) + 20;
            }
        } else {
            console.log('No skills found in profile data');
        }

        // Experience Section
        if (profileData.experiences && profileData.experiences.length > 0) {
            const validExperiences = profileData.experiences.filter(exp => exp && exp.title && exp.company);
            
            if (validExperiences.length > 0) {
                // Check if we need a new page
                if (yPosition > 600) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(14)
                   .font('Helvetica-Bold')
                   .text('EXPERIENCE', 50, yPosition);
                
                yPosition += 25;
                
                validExperiences.forEach((exp, index) => {
                    // Check if we need a new page
                    if (yPosition > 700) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor('black')
                       .fontSize(12)
                       .font('Helvetica-Bold')
                       .text(exp.title, 50, yPosition);
                    
                    doc.fontSize(10)
                       .font('Helvetica-Bold')
                       .text(exp.company, 50, yPosition + 15);
                    
                    if (exp.duration) {
                        doc.fontSize(9)
                           .font('Helvetica')
                           .fillColor('gray')
                           .text(exp.duration, 400, yPosition + 15);
                    }
                    
                    if (exp.description && exp.description.trim()) {
                        doc.fillColor('black')
                           .fontSize(10)
                           .font('Helvetica')
                           .text(exp.description, 50, yPosition + 30, { width: 500 });
                        
                        yPosition += 50 + doc.heightOfString(exp.description, { width: 500 });
                    } else {
                        yPosition += 50;
                    }
                });
            }
        } else {
            console.log('No experiences found in profile data');
        }

        // Projects Section
        if (profileData.projects && profileData.projects.length > 0) {
            const validProjects = profileData.projects.filter(project => project && project.title && project.description);
            
            if (validProjects.length > 0) {
                // Check if we need a new page
                if (yPosition > 600) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(14)
                   .font('Helvetica-Bold')
                   .text('PROJECTS', 50, yPosition);
                
                yPosition += 25;
                
                validProjects.forEach((project) => {
                    // Check if we need a new page
                    if (yPosition > 700) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor('black')
                       .fontSize(12)
                       .font('Helvetica-Bold')
                       .text(project.title, 50, yPosition);
                    
                    if (project.technologies && project.technologies.trim()) {
                        doc.fontSize(9)
                           .font('Helvetica')
                           .fillColor('gray')
                           .text(`Tech: ${project.technologies}`, 50, yPosition + 15);
                    }
                    
                    if (project.description && project.description.trim()) {
                        doc.fillColor('black')
                           .fontSize(10)
                           .font('Helvetica')
                           .text(project.description, 50, yPosition + 30, { width: 500 });
                        
                        yPosition += 50 + doc.heightOfString(project.description, { width: 500 });
                    } else {
                        yPosition += 50;
                    }
                    
                    if (project.link && project.link.trim()) {
                        doc.fillColor(accentColor)
                           .fontSize(9)
                           .text(`🔗 ${project.link}`, 50, yPosition - 15);
                    }
                });
            }
        } else {
            console.log('No projects found in profile data');
        }

        // Certifications Section
        if (profileData.certifications && profileData.certifications.length > 0) {
            const validCertifications = profileData.certifications.filter(cert => cert && cert.name && cert.name.trim());
            
            if (validCertifications.length > 0) {
                // Check if we need a new page
                if (yPosition > 650) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor(primaryColor)
                   .fontSize(14)
                   .font('Helvetica-Bold')
                   .text('CERTIFICATIONS', 50, yPosition);
                
                yPosition += 25;
                
                validCertifications.forEach((cert) => {
                    // Check if we need a new page
                    if (yPosition > 720) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    doc.fillColor('black')
                       .fontSize(11)
                       .font('Helvetica-Bold')
                       .text(cert.name, 50, yPosition);
                    
                    const certDetails = [];
                    if (cert.issuer && cert.issuer.trim()) certDetails.push(cert.issuer);
                    if (cert.date && cert.date.trim()) certDetails.push(cert.date);
                    
                    if (certDetails.length > 0) {
                        doc.fontSize(10)
                           .font('Helvetica')
                           .text(certDetails.join(' | '), 50, yPosition + 15);
                    }
                    
                    yPosition += 35;
                });
            }
        } else {
            console.log('No certifications found in profile data');
        }

        // Footer
        doc.fillColor(primaryColor)
           .fontSize(8)
           .text('Generated by PrepLink Portal | JSS Academy of Technical Education', 50, doc.page.height - 50);

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to generate resume",
            success: false
        });
    }
};