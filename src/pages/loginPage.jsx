import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

const[email,setEmail] = useState("");
const[password, setPassword] = useState("");
const [isLoading , setIsLoading] = useState(false)
const navigate = useNavigate()
const googleLogin = useGoogleLogin({
onSuccess:(Response)=>{
console.log(Response)
setIsLoading(true)
axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login",{
token: Response.access_token,
}).then((res)=>{
localStorage.setItem("token",res.data.token)
if(res.data.role == "admin"){
navigate("/admin")
// window.location.href = "/admin"

}else{
navigate("/")
// window.location.href = "/"
}

toast.success("Login Successful!")
setIsLoading(false)

}).catch((err)=>{
console.log(err)
})
toast.error("Login failed")
setIsLoading(false)

},
onError:() => {toast.error("Google login failed")},
onNonOAuthError:() =>{toast.error("Google login failed")}
})

async function Login(){

console.log("Email : " , email)
console.log("Password : " ,password)
setIsLoading(true)

try{
const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login",{email:email, password:password })
console.log(res)

localStorage.setItem("token", res.data.token)
const token = localStorage.getItem("token")

if(res.data.role =="admin"){

navigate("/admin")
// window.location.href = "/admin"

}else{
navigate("/")
// window.location.href = "/"
}

toast.success("Login Successful!")
setIsLoading(false)

}catch(err){
console.log("Error during the login")
console.log(err)
toast.error("Login failed")
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
                Login
            </h1>

            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder="Enter your email"
            className="w-[80%] px-4 py-3 rounded-lg
            bg-secondary/30 text-primary placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-accent
            focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)]
            transition-all duration-200 mb-10" />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Enter your password" className="w-[80%] px-4 py-3 rounded-lg
            bg-secondary/30 text-primary placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-accent
            focus:border-transparent focus:shadow-[0_0_10px_rgba(4,78,163,0.6)]
            transition-all duration-200 " />
            <p className="w-[80%]  text-primary text-sm text-right mt-4 not-italic mb-18 ">
                Forgot your password?
                <Link to="/forgot-password"
                    className="text-accent font-semibold hover:underline hover:text-[#0360d0] cursor-pointer transition-all duration-200 italic ">
                Reset it here
                </Link>
            </p>
            <button className="w-[50%] h-12 py-3 rounded-lg bg-accent text-primary font-semibold 
                       shadow-md hover:bg-[#0360d0] hover:shadow-[0_0_15px_rgba(4,78,163,0.8)] 
                       active:scale-95 transition-all duration-200 cursor-pointer" onClick={Login}> Login</button>
            <button className="w-[50%] h-12 mt-4 px-4 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 shadow-sm
                             hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-3" onClick={googleLogin}>
                {/* Google multicolor logo */}
                <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />

                <span className="text-[15px]">
                    Sign in with Google
                </span>
            </button>


            <p className="text-primary text-sm text-center mt-4 not-italic">
                Don’t have an account?
                <Link to="/register"
                    className="text-accent font-semibold hover:underline hover:text-[#0360d0] cursor-pointer transition-all duration-200 italic">
                Sign up
                </Link>
            </p>
        </div>
    </div>
    {isLoading &&
    <Loader />}
</div>
);
}