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
        'https://jss-placement-portal.vercel.app'
    ],
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8002;

console.log(`Starting server on port ${PORT}`);


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



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})