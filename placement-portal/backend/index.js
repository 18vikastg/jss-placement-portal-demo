import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import facultyRoute from "./routes/faculty.route.js";
import recruiterRoute from "./routes/recruiter.route.js";
import facultyAuthRoute from "./routes/facultyAuth.route.js";
import recruiterAuthRoute from "./routes/recruiterAuth.route.js";
import preparationRoute from "./routes/preparation.route.js";
import mockInterviewRoute from "./routes/mockInterview.route.js";
import placementStatsRoute from "./routes/placementStats.route.js";
import resumeAnalysisRoute from "./routes/resumeAnalysis.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:[
        'http://localhost:5173', 
        'http://localhost:5174', 
        'http://localhost:5175', 
        'http://localhost:5176', 
        'http://localhost:5177',
        'https://jss-placement-portal-qzvy4afdx-vikas-t-gs-projects.vercel.app',
        'https://jss-placement-portal.vercel.app',
        'https://jss-placement-portal-vikas-t-gs-projects.vercel.app'
    ],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8001;

console.log(`Starting server on port ${PORT}`);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "JSS Placement Portal API is running!",
        status: "healthy",
        timestamp: new Date().toISOString(),
        endpoints: {
            users: "/api/v1/user",
            jobs: "/api/v1/job",
            companies: "/api/v1/company",
            applications: "/api/v1/application",
            resumeAnalysis: "/api/v1/resume"
        }
    });
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/faculty", facultyRoute);
app.use("/api/v1/recruiter", recruiterRoute);
app.use("/api/v1/auth/faculty", facultyAuthRoute);
app.use("/api/v1/auth/recruiter", recruiterAuthRoute);
app.use("/api/v1/preparation", preparationRoute);
app.use("/api/v1/student/mock-interview", mockInterviewRoute);
app.use("/api/v1/placement", placementStatsRoute);
app.use("/api/v1/resume", resumeAnalysisRoute);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Test placement endpoint
app.get('/test-placement', (req, res) => {
    res.json({ message: 'Placement endpoint test successful' });
});



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})