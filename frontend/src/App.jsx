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
import RecruiterDashboard from './components/recruiter/RecruiterDashboard'
import StudentDashboard from './components/student/StudentDashboardPreplink'
import StudentProfile from './components/student/StudentProfile'
import StudentApplications from './components/student/StudentApplications'
import ProfileTestComponent from './components/ProfileTestComponent'


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
    element: <ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard/></ProtectedRoute>
  },
  // student routes
  {
    path:"/student/dashboard",
    element: <ProtectedRoute allowedRoles={['student']}><StudentDashboard/></ProtectedRoute>
  },
  {
    path:"/student/profile",
    element:<ProtectedRoute allowedRoles={['student']}><StudentProfile/></ProtectedRoute> 
  },
  {
    path:"/student/applications",
    element:<ProtectedRoute allowedRoles={['student']}><StudentApplications/></ProtectedRoute> 
  },
  // test route for profile system
  {
    path:"/test/profile",
    element: <ProfileTestComponent/>
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
