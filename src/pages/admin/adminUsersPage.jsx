import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { RiVerifiedBadgeLine } from "react-icons/ri";


export default function AdminUserPage() {

const [users, setUsers] = useState([]);
const [loaded , setLoaded] = useState(false)

useEffect(() => {
const token = localStorage.getItem("token")
if(!loaded){
axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all",{
headers:{Authorization:`Bearer ${token}`}
}).then((response) => {
console.log(response.data);
setUsers(response.data);
setLoaded(true)
});
}

}, [loaded]);

return (
<div className="w-full h-full flex justify-center items-start p-10 bg-primary text-secondary overflow-auto relative">

    {loaded ?<div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div
            className="flex justify-between items-center p-6 border-b border-gray-200 bg-linear-to-r from-primary to-gray-50">
            <h2 className="text-2xl font-semibold text-accent tracking-wide">User Management</h2>
        </div>

        <div
            className="overflow-x-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <table className="min-w-full table-auto text-sm text-left border-collapse">
                <thead className="bg-accent text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3 font-medium">Image</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">First Name</th>
                        <th className="px-4 py-3 font-medium">Last Name</th>
                        <th className="px-4 py-3 font-medium">User Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((items, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-4 py-3">
                            <img src={items.image} alt={items.name}
                                className="w-10 h-10 object-cover rounded-md shadow-sm" />
                        </td>
                        <td className="px-4 py-3 flex flex-row items-center gap-2">{items.email}{items.isEmailVerified ?
                            <RiVerifiedBadgeLine className="text-blue-400" />:""}</td>
                        <td className="px-4 py-3 ">{items.firstName}</td>
                        <td className="px-4 py-3">{items.lastName}</td>
                        <td className="px-4 py-3 ">{items.role}</td>
                        <td className="px-4 py-3">{items.isBlocked?"Blocked":"Active"}</td>
                        <td className="px-4 py-3">
                            <button
                                className="px-4 py-3 bg-accent text-white text-xs rounded-md hover:bg-blue-900 active:scale-95 transition-all duration-200 shadow-sm"
                                onClick={async()=>{
                                await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${items.email}`,{
                                    isBlocked : !items.isBlocked
                                },
                                    {
                                headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                                })
                                setLoaded(false)
                                }}>
                                {items.isBlocked?"Unblock User":"Block User"}
                            </button>
                        </td>


                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>:
    <Loader />}

    {/*
    <Link to="/admin/add-products"
        className="fixed right-6 bottom-6 w-[60px] h-[60px] flex justify-center items-center text-6xl text-accent bg-white border-2 border-accent rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300">
    <FiPlusSquare />
    </Link> */}
</div>
);
}