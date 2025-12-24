import { Link, Route, Routes } from "react-router-dom";
import { TfiList } from "react-icons/tfi";
import { AiOutlineProduct } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { VscOpenPreview } from "react-icons/vsc";
import AdminProductPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUserPage from "./admin/adminUsersPage";
export default function AdminPage(){

const[user , setUser] = useState(null)

useEffect(()=>{
const token = localStorage.getItem("token")
if(token == null){
window.location.href = "/"
return
}
axios.get(import.meta.env.VITE_BACKEND_URL + "/users/",{
headers:{Authorization:`Bearer ${token}`},
}).then((response) => {
if(response.data.role == "admin"){
setUser(response.data)
}else[
window.location.href = "/"
]

}).catch(()=>{
window.location.href = "/login"
})

},[])

return(
<div className="w-full h-full  flex bg-accent ">
  {user ?
  <>
    <div className="w-[300px] h-full bg-accent">
      <div className="w-full h-[100px] flex items-center text-primary pl-4 ">
        <img src="/public/logo.png" className="h-full"></img>
        <h1 className="text-2xl">Admin </h1>
      </div>
      <div className="w-full h-[400px] text-2xl text-white flex flex-col pl-4 pt-4">
        <Link to="/admin" className="w-full h-[50px] flex items-center gap-2.5 ">
        <TfiList />Orders</Link>
        <Link to="/admin/products" className="w-full h-[50px] flex items-center gap-2.5 ">
        <AiOutlineProduct />Products</Link>
        <Link to="/admin/users" className="w-full] h-[50px] flex items-center gap-2.5 ">
        <FiUser />Users</Link>
        <Link to="/admin/reviews" className="w-full h-[50px] flex items-center gap-2.5">
        <VscOpenPreview />Reviews</Link>
      </div>
    </div>

    <div className="w-[calc(100%-300px)] h-full max-h-full  rounded-3xl overflow-y-scroll  bg-primary ">
      <Routes path="/">
        <Route path="/" element={<AdminOrdersPage />}></Route>
        <Route path="/products" element={<AdminProductPage />}></Route>
        <Route path="/add-products" element={<AdminAddProductPage />}></Route>
        <Route path="/update-products" element={<AdminUpdateProductPage />}></Route>
        <Route path="/users" element={<AdminUserPage/>}></Route>
        <Route path="/reviews" element={<h1>Reviews</h1>}></Route>
      </Routes>

    </div>
  </>: <Loader/>
}
</div>
)
}