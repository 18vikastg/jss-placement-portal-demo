// MongoDB Setup Commands for Job Portal
// Run these commands in mongosh (MongoDB shell)

// 1. Switch to jobportal database
use jobportal

// 2. Create Users collection with sample data
db.users.insertMany([
  {
    fullname: "John Doe",
    email: "john.student@example.com",
    phoneNumber: 9876543210,
    password: "$2b$10$hashedpassword1", // This will be hashed by bcrypt in your app
    role: "student",
    profile: {
      bio: "Passionate software developer with experience in full-stack development",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      resume: "",
      resumeOriginalName: "",
      company: null,
      profilePhoto: ""
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fullname: "Jane Smith",
    email: "jane.recruiter@techcorp.com",
    phoneNumber: 9876543211,
    password: "$2b$10$hashedpassword2",
    role: "recruiter",
    profile: {
      bio: "Senior HR Manager at TechCorp with 8+ years of experience",
      skills: ["Recruitment", "HR Management", "Team Building"],
      resume: "",
      resumeOriginalName: "",
      company: null,
      profilePhoto: ""
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fullname: "Alice Johnson",
    email: "alice.student@example.com",
    phoneNumber: 9876543212,
    password: "$2b$10$hashedpassword3",
    role: "student",
    profile: {
      bio: "Frontend developer specializing in React and Vue.js",
      skills: ["React", "Vue.js", "CSS", "HTML", "TypeScript"],
      resume: "",
      resumeOriginalName: "",
      company: null,
      profilePhoto: ""
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// 3. Get user IDs for reference (run this to get the IDs)
var recruiterId = db.users.findOne({email: "jane.recruiter@techcorp.com"})._id
var studentId1 = db.users.findOne({email: "john.student@example.com"})._id
var studentId2 = db.users.findOne({email: "alice.student@example.com"})._id

// 4. Create Companies collection with sample data
db.companies.insertMany([
  {
    name: "TechCorp Solutions",
    description: "Leading technology company specializing in web development and AI solutions",
    website: "https://techcorp.com",
    location: "San Francisco, CA",
    logo: "",
    userId: recruiterId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "InnovateTech",
    description: "Startup focused on mobile app development and cloud services",
    website: "https://innovatetech.io",
    location: "New York, NY",
    logo: "",
    userId: recruiterId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "DataFlow Analytics",
    description: "Data science and analytics company helping businesses make data-driven decisions",
    website: "https://dataflow.com",
    location: "Austin, TX",
    logo: "",
    userId: recruiterId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// 5. Get company IDs for reference
var companyId1 = db.companies.findOne({name: "TechCorp Solutions"})._id
var companyId2 = db.companies.findOne({name: "InnovateTech"})._id
var companyId3 = db.companies.findOne({name: "DataFlow Analytics"})._id

// 6. Create Jobs collection with sample data
db.jobs.insertMany([
  {
    title: "Frontend Developer",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using modern JavaScript frameworks.",
    requirements: ["React", "JavaScript", "CSS", "HTML", "Git"],
    salary: 75000,
    experienceLevel: 2,
    location: "San Francisco, CA",
    jobType: "Full-time",
    position: 3,
    company: companyId1,
    created_by: recruiterId,
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Full Stack Developer",
    description: "Join our dynamic team as a Full Stack Developer. Work on both frontend and backend technologies to build scalable web applications.",
    requirements: ["Node.js", "React", "MongoDB", "Express", "JavaScript"],
    salary: 85000,
    experienceLevel: 3,
    location: "New York, NY",
    jobType: "Full-time",
    position: 2,
    company: companyId2,
    created_by: recruiterId,
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Data Analyst",
    description: "Analyze complex data sets to help drive business decisions. Experience with SQL and Python required.",
    requirements: ["Python", "SQL", "Data Analysis", "Excel", "Tableau"],
    salary: 70000,
    experienceLevel: 1,
    location: "Austin, TX",
    jobType: "Full-time",
    position: 1,
    company: companyId3,
    created_by: recruiterId,
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Backend Developer",
    description: "Build and maintain server-side logic, databases, and APIs. Experience with Node.js and databases required.",
    requirements: ["Node.js", "Express", "MongoDB", "JavaScript", "REST API"],
    salary: 80000,
    experienceLevel: 2,
    location: "Remote",
    jobType: "Full-time",
    position: 2,
    company: companyId1,
    created_by: recruiterId,
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "React Developer",
    description: "Develop responsive web applications using React. Work closely with UX/UI designers.",
    requirements: ["React", "JavaScript", "Redux", "CSS", "HTML"],
    salary: 72000,
    experienceLevel: 1,
    location: "San Francisco, CA",
    jobType: "Contract",
    position: 1,
    company: companyId2,
    created_by: recruiterId,
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// 7. Get job IDs for reference
var jobId1 = db.jobs.findOne({title: "Frontend Developer"})._id
var jobId2 = db.jobs.findOne({title: "Full Stack Developer"})._id
var jobId3 = db.jobs.findOne({title: "Data Analyst"})._id

// 8. Create Applications collection with sample data
db.applications.insertMany([
  {
    job: jobId1,
    applicant: studentId1,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    job: jobId2,
    applicant: studentId1,
    status: "accepted",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    job: jobId1,
    applicant: studentId2,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    job: jobId3,
    applicant: studentId2,
    status: "rejected",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// 9. Verify the data was created successfully
print("=== Database Setup Complete ===")
print("Users count:", db.users.countDocuments())
print("Companies count:", db.companies.countDocuments())
print("Jobs count:", db.jobs.countDocuments())
print("Applications count:", db.applications.countDocuments())

// 10. Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true })
db.companies.createIndex({ name: 1 }, { unique: true })
db.jobs.createIndex({ title: 1, company: 1 })
db.applications.createIndex({ job: 1, applicant: 1 }, { unique: true })

print("=== Indexes created successfully ===")

// 11. Show sample data
print("\n=== Sample Users ===")
db.users.find({}, {fullname: 1, email: 1, role: 1}).pretty()

print("\n=== Sample Companies ===")
db.companies.find({}, {name: 1, location: 1}).pretty()

print("\n=== Sample Jobs ===")
db.jobs.find({}, {title: 1, salary: 1, location: 1}).pretty()

print("\n=== Sample Applications ===")
db.applications.find({}, {status: 1}).pretty()
