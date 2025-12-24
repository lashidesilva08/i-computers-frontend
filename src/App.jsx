import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'
import CartPage from './pages/cart'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPasswordPage from './pages/forgotPasswordPage'
import MyOrdersPage from './pages/orderPage'
import MainLayout from './components/mainLayout'
import AdminUserPage from './pages/admin/adminUsersPage'


function App() {
 
  return (
  <GoogleOAuthProvider clientId='553829282478-78o8spsqnnhd4g6r9img8t4cfoaem74o.apps.googleusercontent.com'>
    <BrowserRouter>
    <Toaster position='top-right'></Toaster>
    <div className='w-full h-screen bg-primary text-secondary'>
      <Routes>
        <Route path="/*" element ={<HomePage/>}></Route>
        <Route path="/login" element ={<LoginPage/>}></Route>
        <Route path="/register" element ={<RegisterPage/>}></Route>
        <Route path="/admin/*" element ={<AdminPage/>}></Route>
        <Route path="/forgot-password" element ={<ForgotPasswordPage/>}></Route>
        <Route path="/orders" element ={<MainLayout><MyOrdersPage/></MainLayout>}></Route>
      
      </Routes>
    </div>
     
     </BrowserRouter>
  </GoogleOAuthProvider>  
  )
}

export default App
