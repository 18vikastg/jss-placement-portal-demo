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

// Enhanced Profile Update
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

        // Handle file upload if present (resume)
        let resumeUrl = "";
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            resumeUrl = cloudResponse.secure_url;
        }

        // Parse JSON strings back to objects/arrays
        const parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : skills;
        const parsedExperiences = typeof experiences === 'string' ? JSON.parse(experiences) : experiences;
        const parsedProjects = typeof projects === 'string' ? JSON.parse(projects) : projects;
        const parsedCertifications = typeof certifications === 'string' ? JSON.parse(certifications) : certifications;
        const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Update user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Update profile data
        if (bio) user.profile.bio = bio;
        if (address) user.profile.address = address;
        if (dateOfBirth) user.profile.dateOfBirth = dateOfBirth;
        if (branch) user.profile.branch = branch;
        if (semester) user.profile.semester = semester;
        if (cgpa) user.profile.cgpa = cgpa;
        if (university) user.profile.university = university;
        if (year) user.profile.year = year;
        if (parsedSkills) user.profile.skills = parsedSkills;
        if (parsedExperiences) user.profile.experiences = parsedExperiences;
        if (parsedProjects) user.profile.projects = parsedProjects;
        if (parsedCertifications) user.profile.certifications = parsedCertifications;
        if (parsedSocialLinks) user.profile.socialLinks = parsedSocialLinks;
        if (resumeUrl) user.profile.resume = resumeUrl;

        await user.save();

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
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Generate Resume PDF
export const generateResumePDF = async (req, res) => {
    try {
        const userId = req.id;
        const { profileData } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Create PDF document
        const doc = new PDFDocument({ margin: 50 });
        let filename = `${profileData.fullname || user.fullname}_Resume.pdf`;
        filename = encodeURIComponent(filename);

        // Set response headers
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe PDF to response
        doc.pipe(res);

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
            doc.fillColor(primaryColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('TECHNICAL SKILLS', 50, yPosition);
            
            yPosition += 25;
            const skillsText = profileData.skills.join(' • ');
            doc.fillColor('black')
               .fontSize(10)
               .font('Helvetica')
               .text(skillsText, 50, yPosition, { width: 500 });
            
            yPosition += doc.heightOfString(skillsText, { width: 500 }) + 20;
        }

        // Experience Section
        if (profileData.experiences && profileData.experiences.length > 0) {
            doc.fillColor(primaryColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('EXPERIENCE', 50, yPosition);
            
            yPosition += 25;
            
            profileData.experiences.forEach((exp) => {
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
                
                if (exp.description) {
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

        // Projects Section
        if (profileData.projects && profileData.projects.length > 0) {
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
            
            profileData.projects.forEach((project) => {
                // Check if we need a new page
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                
                doc.fillColor('black')
                   .fontSize(12)
                   .font('Helvetica-Bold')
                   .text(project.title, 50, yPosition);
                
                if (project.technologies) {
                    doc.fontSize(9)
                       .font('Helvetica')
                       .fillColor('gray')
                       .text(`Tech: ${project.technologies}`, 50, yPosition + 15);
                }
                
                if (project.description) {
                    doc.fillColor('black')
                       .fontSize(10)
                       .font('Helvetica')
                       .text(project.description, 50, yPosition + 30, { width: 500 });
                    
                    yPosition += 50 + doc.heightOfString(project.description, { width: 500 });
                } else {
                    yPosition += 50;
                }
                
                if (project.link) {
                    doc.fillColor(accentColor)
                       .fontSize(9)
                       .text(`🔗 ${project.link}`, 50, yPosition - 15);
                }
            });
        }

        // Certifications Section
        if (profileData.certifications && profileData.certifications.length > 0) {
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
            
            profileData.certifications.forEach((cert) => {
                doc.fillColor('black')
                   .fontSize(11)
                   .font('Helvetica-Bold')
                   .text(cert.name, 50, yPosition);
                
                doc.fontSize(10)
                   .font('Helvetica')
                   .text(`${cert.issuer}${cert.date ? ` | ${cert.date}` : ''}`, 50, yPosition + 15);
                
                yPosition += 35;
            });
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