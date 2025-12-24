import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

const [otpSent, setOtpSent] = useState(false)
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [otp, setOtp] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

const navigate = useNavigate()
async function sendOTP() {
if (!email) {
toast.error("Please enter your email");
return;
}

setLoading(true);

try {
await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/"+email);

toast.success("OTP sent to your email");
setOtpSent(true);
setLoading(false);

} catch (err) {
toast.error(err.response?.data?.message || "Failed to send OTP");
setLoading(false);
}
}

async function resetPassword(){
if(newPassword !== confirmPassword){
toast.error("Passwords do not match")
return
}
setLoading(true)

try{
await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",{
email:email,
otp:otp,
newPassword:newPassword
});

toast.success("Password reset successfully");
setLoading(false);
navigate("/login")

}catch{
toast.error("Failed to reset password. Please try again!")
setLoading(false);
}
}

return (
<div className="w-full min-h-screen bg-primary flex justify-center items-center p-4">
    {otpSent?
    (<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-300">
        <h1 className="text-secondary text-3xl font-bold text-center mb-2">
            Reset Password
        </h1>
        <p className="text-gray-500 text-center mb-8">
            Enter your OTP and reset your password 
        </p>
        <input type="text" placeholder="Enter your OTP" value={otp} onChange={(e)=> setOtp(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-primary text-secondary placeholder-gray-400 border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 mb-6" />
        <input type="password" placeholder="Enter your new password" onChange={(e)=> setNewPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-primary text-secondary placeholder-gray-400 border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 mb-6" />
        <input type="password" placeholder="Confirm your new password" onChange={(e)=> setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-primary text-secondary placeholder-gray-400 border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 mb-6" />
        <button onClick={resetPassword} disabled={loading} className={`w-full py-3 rounded-lg text-white font-semibold
            bg-accent hover:bg-blue-900 active:scale-95 transition-all duration-200 ${loading
            ? "opacity-60 cursor-not-allowed" : "" }`}>
            {loading ? "Resetting your password...." : "Reset your password"}
        </button>
    </div>
    )
    :
    (<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-300">
        <h1 className="text-secondary text-3xl font-bold text-center mb-2">
            Forgot Password
        </h1>
        <p className="text-gray-500 text-center mb-8">
            Enter your email to receive a one-time password (OTP)
        </p>

        {/* Email Input */}
        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-primary text-secondary placeholder-gray-400 border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 mb-6" />

        <button onClick={sendOTP} disabled={loading} className={`w-full py-3 rounded-lg text-white font-semibold
            bg-accent hover:bg-blue-900 active:scale-95 transition-all duration-200 ${loading
            ? "opacity-60 cursor-not-allowed" : "" }`}>
            {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Footer text */}
        <p className="text-sm text-gray-500 text-center mt-6">
            You’ll receive a 6-digit OTP via email
        </p>
    </div>)
    }

</div>
);
}