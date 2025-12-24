import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
const [user, setUser] = useState(null);
const [open, setOpen] = useState(false);
const menuRef = useRef(null);

useEffect(() => {
const token = localStorage.getItem("token");

if (token !== null) {
axios
.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
headers: { Authorization: `Bearer ${token}` },
})
.then((response) => {
setUser(response.data);
})
.catch(() => {
setUser(null);
});
}
}, []);

useEffect(() => {
function handleClickOutside(e) {
if (menuRef.current && !menuRef.current.contains(e.target)) {
setOpen(false);
}
}

document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

if (!user) {
return (
<div className="flex items-center gap-3">
  <Link to="/login" className="px-4 py-2 rounded-lg bg-primary text-accent font-medium hover:bg-primary/75 transition">
  Login
  </Link>

  <Link to="/register"
    className="px-4 py-2 rounded-lg bg-primary text-accent font-medium hover:bg-primary/75 transition">
  Register
  </Link>
</div>
);
}

return (
  <div ref={menuRef} className="relative flex items-center gap-3">
    
    <span className="text-white font-medium text-sm select-none">
      {user.firstName}
    </span>

    <img src={user.image} referrerPolicy="no-referrer" alt="User Profile"onClick={() => setOpen(!open)} className="w-[45px] h-[45px] rounded-full
     cursor-pointer object-cover border-2 border-white/60 shadow-lg transition" />

  {/* Dropdown Menu */}
  {open && (
  <div className="absolute top-[55px] right-0 w-[220px] p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/30
            text-white shadow-xl z-9999 animate-fadeIn">
    <div className="text-center mb-3">
      <img src={user.image} alt="User" className="w-[60px] h-[60px] rounded-full object-cover mb-2 border-2 border-accent/40 shadow-md" />
      <h3 className="text-black font-semibold text-base">{user.firstName}  {user.lastName}</h3>
      <p className="text-black/80 text-sm">{user.email}</p>
    </div>

    {/* Divider */}
    <div className="h-px bg-accent/30 my-3"></div>

    {/* Menu Buttons */}
    <div className="flex flex-col text-[0.9rem] gap-2">

<Link to="/orders" className="px-2 py-2 text-left rounded-lg text-secondary font-semibold" >My Orders</Link>
      <button className="px-2 py-2 text-left rounded-lg text-accent font-semibold" onClick={()=> {
        localStorage.removeItem("token");
        window.location.reload();
        }}
        >
        Logout
      </button>
    </div>
  </div>
  )}
</div>
);
}