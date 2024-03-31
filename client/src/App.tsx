import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { Login } from './layout/Login';
import { Register } from './pages/LoginRegister';
import { OtpVerify } from './pages/OtpVerify';
import { Landing } from './layout/Landing';
import { Toaster } from "@/components/ui/toaster"
import { RoleSelection } from './pages/RoleSelection';
import { CompanyHome } from './layout/CompanyHome';
import { CompanyRegistration } from './pages/company/Registration';
import { CompanyDashboard } from './pages/company/Dashboard';
import { CompanyAccount } from './pages/company/Account';
import { Provider } from 'react-redux'
import { store } from './state/store';
import { StudentHome } from './layout/StudentHome';
import { StudentRegistration } from './pages/student/Registration';
import { StudentAccount } from './pages/student/Account';
import { StudentDashboard } from './pages/student/Dashboard';
import { AppliedJobs } from './pages/student/Applied';
import RestrictedRouteTo from './services/permission';
import { Role } from './lib/role';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      {
        path: '',
        element: <Register />
      },
      {
        path: 'verify-otp',
        element: <OtpVerify />
      },
      {
        path: 'select-role',
        element: <RoleSelection />
      },
      {
        path: 'company/create-profile',
        element:
          <RestrictedRouteTo role={[Role.COMPANY]}>
            <CompanyRegistration />
          </RestrictedRouteTo>
      },
      {
        path: 'student/create-profile',
        element:
          <RestrictedRouteTo role={[Role.STUDENT]}>
            <StudentRegistration />
          </RestrictedRouteTo>
      }
    ]
  },
  {
    path: '/company',
    element:
      <RestrictedRouteTo role={[Role.COMPANY]}>
        <CompanyHome />
      </RestrictedRouteTo>,
    children: [
      {
        path: '',
        element: <CompanyDashboard />
      },
      {
        path: 'my-account',
        element: <CompanyAccount />
      },

    ]
  },
  {
    path: '/student',
    element:
      <RestrictedRouteTo role={[Role.STUDENT]}>
        <StudentHome />
      </RestrictedRouteTo>,
    children: [
      {
        path: '',
        element: <StudentDashboard />
      },
      {
        path: 'my-account',
        element: <StudentAccount />
      },
      {
        path: 'applied-jobs',
        element: <AppliedJobs />
      }
    ]

  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);


function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>

    </>
  )
}

export default App
