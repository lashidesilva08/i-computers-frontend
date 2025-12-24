import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { CiSquareMore } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LuListCollapse } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { SlHome } from "react-icons/sl";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){

const[sidebarOpen , setSidebarOpen] = useState(false)

return(
<header className="w-full h-[100px] bg-accent flex relative">
    <LuListCollapse className="text-white text-2xl my-auto ml-4 lg:hidden" onClick={()=> setSidebarOpen(true)}/>
        <img src="/public/logo.png" className="h-full" alt="Logo"></img>
        <div className="w-full h-full hidden text-primary lg:flex justify-center items-center gap-[30px] text-2xl">
            <Link to="/">
            <h1>Home</h1>
            </Link>
            <Link to="/about">
            <h1>About</h1>
            </Link>
            <Link to="/contact">
            <h1>Contact</h1>
            </Link>
            <Link to="/products">
            <h1>Products</h1>
            </Link>
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:flex">
            <UserData />
        </div>
        <Link to="/cart" className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-primary ">
        <BsCart3 />
        </Link>
        {/* Overlay */}
        {sidebarOpen && (
        <div className="fixed lg:hidden inset-0 bg-black/50 z-20" onClick={()=> setSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <div className={`fixed lg:hidden top-0 left-0 w-[250px] h-screen backdrop-blur-xl bg-white/20 border-r
            border-white/30 shadow-xl z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0"
            : "-translate-x-full" }`}>
            <div className="w-full h-[100px] bg-accent/60 backdrop-blur-lg flex justify-center items-center relative">
                <img src="/public/logo.png" className="h-full" alt="Logo" />
                <LuListCollapse
                    className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180 absolute right-4 cursor-pointer hover:scale-110 transition"
                    onClick={()=> setSidebarOpen(false)}
                    />
            </div>

            <div className="lg:hidden px-6 mt-6">
                <UserData />
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col px-6 mt-6 text-lg gap-4 text-primary font-medium">
                <Link to="/" onClick={()=> setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 hover:backdrop-blur-sm
                transition-all"
                >
                <SlHome />Home
                </Link>

                <Link to="/about" onClick={()=> setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 hover:backdrop-blur-sm
                transition-all"
                >
                <CiSquareMore /> About
                </Link>

                <Link to="/contact" onClick={()=> setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 hover:backdrop-blur-sm
                transition-all"
                >
                <RiContactsLine /> Contact
                </Link>

                <Link to="/products" onClick={()=> setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 hover:backdrop-blur-sm
                transition-all"
                >
                <LiaShoppingBagSolid /> Products
                </Link>
            </div>
        </div>



</header>
)
}