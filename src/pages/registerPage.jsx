import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {

const[firstName,setFirstName] = useState("");
const[lastName,setLasttName] = useState("");
const[email,setEmail] = useState("");
const[password, setPassword] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const [isLoading , setIsLoading] = useState(false)
const navigate = useNavigate()

async function Register(){

   if(firstName.trim() == ""){
        toast.error("First Name is required")
        return
   }
   if(lastName.trim() == ""){
        toast.error("Last Name is required")
        return
   }
   if(email.trim() == ""){
        toast.error("Email is required")
        return
   }
   if(password.trim() == ""){
        toast.error("Password is required")
        return
   }
   if(confirmPassword !== password){
        toast.error("Passwords do not match")
        return
   }
   setIsLoading(true)

    try{
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/",{
            email:email.trim(), 
            password:password.trim() ,
            firstName : firstName.trim(),
            lastName : lastName.trim()
        })
        console.log()

     navigate("/login")

        toast.success("You have created an acoount successfully!")
        setIsLoading(false)

    }catch(err){
        console.log("Couldn't create your account")
        console.log(err)
        toast.error("Couldn't create your account. Try again!")
        setIsLoading(false)
    }

    
}



return (
<div className="w-full h-screen bg-[url('/login-bg.jpg')] bg-center bg-cover bg-no-repeat flex">

    <div className="h-full w-1/2 flex flex-col justify-center items-center">
        <img src="/logo.png" className="w-[400px] h-[400px] object-cover" alt="Logo" />
        <h1 className="text-5xl text-center text-primary text-shadow-lg font-bold">
            Upgrade Your World with Us
        </h1>
        <h2 className="text-3xl text-center text-accent italic text-shadow-md">
            Empowering you with the latest technology and trusted support.
        </h2>
    </div>


    <div className="h-full w-1/2 flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-xl p-8 flex flex-col items-center">
            <h1 className="text-[40px] font-bold text-accent mb-10 text-center">
               Register
            </h1>

            <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" name="firstName" placeholder="Enter your First Name" className="w-[80%] px-4 py-3 rounded-lg 
                       bg-secondary/30 text-primary placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-accent 
                       focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)] 
                       transition-all duration-200 mb-7" />
            <input onChange={(e)=>{setLasttName(e.target.value)}} type="text" name="lastName" placeholder="Enter your Last Name" className="w-[80%] px-4 py-3 rounded-lg 
                       bg-secondary/30 text-primary placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-accent 
                       focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)] 
                       transition-all duration-200 mb-7" />

            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder="Enter your email" className="w-[80%] px-4 py-3 rounded-lg 
                       bg-secondary/30 text-primary placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-accent 
                       focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)] 
                       transition-all duration-200 mb-7" />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Enter your password" className="w-[80%] px-4 py-3 rounded-lg 
                       bg-secondary/30 text-primary placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-accent 
                       focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)] 
                       transition-all duration-200 mb-7" />
            <input onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" name="confirmpassword" placeholder="Confirm your password" className="w-[80%] px-4 py-3 rounded-lg 
                       bg-secondary/30 text-primary placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-accent 
                       focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)] 
                       transition-all duration-200 mb-6" />
           
            <button className="w-[50%] h-12 py-3 rounded-lg bg-accent text-primary font-semibold 
                       shadow-md hover:bg-[#0360d0] hover:shadow-[0_0_15px_rgba(4,78,163,0.8)] 
                       active:scale-95 transition-all duration-200 cursor-pointer" onClick={Register}> Register Now</button>
            <p className="text-primary text-sm text-center mt-4 not-italic">
               Already an account?
                <Link to="/login"
                    className="text-accent font-semibold hover:underline hover:text-[#0360d0] cursor-pointer transition-all duration-200 italic">
               Login here
                </Link>
            </p>
        </div>
    </div>
    {isLoading && <Loader/>} 
</div>
);
}