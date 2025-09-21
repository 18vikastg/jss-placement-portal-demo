import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import OpportunitiesPage from './components/OpportunitiesPage'
import FacultyStudents from './components/faculty/FacultyStudents'
import FacultyPlacements from './components/faculty/FacultyPlacements'
import FacultyDashboard from './components/faculty/FacultyDashboard'
import EnhancedFacultyDashboard from './components/faculty/EnhancedFacultyDashboard'
import RecruiterDashboard from './components/recruiter/RecruiterDashboard'
import EnhancedRecruiterDashboard from './components/recruiter/EnhancedRecruiterDashboard'
import StudentDashboard from './components/student/StudentDashboardPreplink'
import StudentDashboardEnhanced from './components/student/StudentDashboardEnhanced'
import StudentApplications from './components/student/StudentApplications'
import MockInterviewPage from './components/student/MockInterviewPage'
import PreparationHub from './components/PreparationHub'
import PreparationHubEnhanced from './components/PreparationHubEnhanced'
import PreparationDashboard from './components/PreparationDashboard'
import PlacementDashboard from './components/PlacementDashboard'
import ResumeAnalyserInfo from './components/ResumeAnalyserInfo'
import LinkFolioMainNew from './components/linkfolio/LinkFolioMainNew'
import NewLinkFolio from './components/linkfolio/NewLinkFolio'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/opportunities",
    element: <OpportunitiesPage />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Preparation Hub routes
  {
    path: "/preparation",
    element: <PreparationHubEnhanced />
  },
  {
    path: "/preparation/classic",
    element: <PreparationHub />
  },
  {
    path: "/preparation/dashboard",
    element: <ProtectedRoute><PreparationDashboard /></ProtectedRoute>
  },
  {
    path: "/placement/dashboard",
    element: <PlacementDashboard />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  // faculty routes
  {
    path:"/faculty/dashboard",
    element: <ProtectedRoute allowedRoles={['faculty']}><EnhancedFacultyDashboard/></ProtectedRoute>
  },
  {
    path:"/faculty/dashboard/classic",
    element: <ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard/></ProtectedRoute>
  },
  {
    path:"/faculty/students",
    element: <ProtectedRoute allowedRoles={['faculty']}><FacultyStudents/></ProtectedRoute>
  },
  {
    path:"/faculty/placements",
    element:<ProtectedRoute allowedRoles={['faculty']}><FacultyPlacements/></ProtectedRoute> 
  },
  // recruiter routes
  {
    path:"/recruiter/dashboard",
    element: <ProtectedRoute allowedRoles={['recruiter']}><EnhancedRecruiterDashboard/></ProtectedRoute>
  },
  {
    path:"/recruiter/dashboard/classic",
    element: <ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard/></ProtectedRoute>
  },
  // student routes
  {
    path:"/student/dashboard",
    element: <ProtectedRoute allowedRoles={['student']}><StudentDashboardEnhanced/></ProtectedRoute>
  },
  {
    path:"/student/dashboard/classic",
    element: <ProtectedRoute allowedRoles={['student']}><StudentDashboard/></ProtectedRoute>
  },
  {
    path:"/student/profile",
    element:<ProtectedRoute allowedRoles={['student']}><Profile/></ProtectedRoute> 
  },
  {
    path:"/student/applications",
    element:<ProtectedRoute allowedRoles={['student']}><StudentApplications/></ProtectedRoute> 
  },
  {
    path:"/student/mock-interview",
    element:<ProtectedRoute allowedRoles={['student']}><MockInterviewPage/></ProtectedRoute> 
  },
  {
    path:"/student/linkfolio",
    element:<ProtectedRoute allowedRoles={['student']}><LinkFolioMainNew/></ProtectedRoute> 
  },
  {
    path:"/student/new-linkfolio",
    element:<ProtectedRoute allowedRoles={['student']}><NewLinkFolio/></ProtectedRoute> 
  },
  {
    path:"/resume-analyser-info",
    element:<ProtectedRoute allowedRoles={['student']}><ResumeAnalyserInfo/></ProtectedRoute> 
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
