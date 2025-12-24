import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";


export default function AdminOrdersPage() {

const [orders, setOrders] = useState([]);
const [loaded , setLoaded] = useState(false)

useEffect(() => {
const token = localStorage.getItem("token")
if(!loaded){
axios.get(import.meta.env.VITE_BACKEND_URL + "/orders",{
headers:{Authorization:`Bearer ${token}`}
}).then((response) => {
console.log(response.data);
setOrders(response.data);
setLoaded(true)
});
}

}, [loaded]);

return (
<div className="w-full h-full flex justify-center items-start p-10 bg-primary text-secondary overflow-auto relative">

    {loaded ?<div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div
            className="flex justify-between items-center p-6 border-b border-gray-200 bg-linear-to-r from-primary to-gray-50">
            <h2 className="text-2xl font-semibold text-accent tracking-wide">Order Management</h2>
        </div>

        <div
            className="overflow-x-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <table className="min-w-full table-auto text-sm text-left border-collapse">
                <thead className="bg-accent text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3 font-medium">Order ID</th>
                        <th className="px-4 py-3 font-medium">Customer Email</th>
                        <th className="px-4 py-3 font-medium">aCustomer Name</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Total Amount</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-4 py-3">{order.orderId}</td>
                        <td className="px-4 py-3">{order.email}</td>
                        <td className="px-4 py-3">{order.name}</td>
                        <td className="px-4 py-3"> {new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 r">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                               order.status==="Pending" ? "bg-yellow-400" : order.status==="Completed" ? "bg-green-400" :order.status==="Cancelled" ? "bg-red-400" : "bg-secondary/50"
                                }`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-700">Rs.{order.total.toFixed(2)}</td>
                        <td className="px-4 py-3 flex items-center gap-2">
                            <ViewOrderInfo order={order}/>
                                                       
                            {/* <ProductDeleteButton productID={items.productID} reload={()=> { setLoaded(false) }}/>
                                */}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>:
    <Loader />}

</div>
);
}