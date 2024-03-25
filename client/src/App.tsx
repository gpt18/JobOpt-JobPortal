import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { Login } from './layout/Login';
import { Register } from './pages/Register';
import { OtpVerify } from './pages/OtpVerify';
import { Landing } from './layout/Landing';
import { Toaster } from "@/components/ui/toaster"
import { RoleSelection } from './pages/RoleSelection';
import { CompanyHome } from './layout/CompanyHome';
import { CompanyRegistration } from './pages/CompanyRegistration';

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
        element: <RoleSelection/>
      }
    ]
  },
  {
    path: '/company',
    element: <CompanyHome/>,
    children: [
      {
        path: 'create-profile',
        element: <CompanyRegistration/>
      }
    ]
  },
  {
    path: '/student',
    element: <div>Student</div>
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);


function App() {

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
