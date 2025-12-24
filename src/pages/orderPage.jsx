import axios from "axios";
import { useEffect, useState } from "react";

import OrderTimeline from "../components/ordertimeline";
import Loader from "../components/loader";
import ViewCustomerOrderInfo from "../components/viewCustomerOrderInfo";

export default function MyOrdersPage() {

const [orders, setOrders] = useState([]);
const [loaded, setLoaded] = useState(false);
// const [selectedOrder, setSelectedOrder] = useState(null);

useEffect(() => {
const token = localStorage.getItem("token");

axios.get(
import.meta.env.VITE_BACKEND_URL + "/orders",
{
headers: { Authorization: `Bearer ${token}` },
}
)
.then((res) => {
setOrders(res.data);
setLoaded(true);
})
.catch(() => setLoaded(true));

}, []);

if (!loaded) return
<Loader />;

return (
<div className="w-full min-h-screen flex justify-center items-start p-10 bg-primary text-secondary">

    <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-linear-to-r from-primary to-gray-50">
            <h2 className="text-2xl font-semibold text-accent tracking-wide">
                My Orders
            </h2>
            <p className="text-gray-500 text-sm mt-1">
                Track your order history and status
            </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
        <div className="text-center py-20">
            <img src="/empty-orders.png" className="w-40 mx-auto opacity-70" alt="No orders" />
            <h3 className="text-xl font-semibold mt-4">
                You haven’t placed any orders yet
            </h3>
            <p className="text-gray-500 mt-2">
                Once you place an order, it will appear here.
            </p>
        </div>
        ) : (
        <div className="overflow-x-auto max-h-[70vh]">
            <table className="min-w-full table-auto text-sm text-left border-collapse">

                <thead className="bg-accent text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition">
                        <td className="px-4 py-3 font-medium">
                            {order.orderId}
                        </td>

                        <td className="px-4 py-3">
                            {new Date(order.date).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ order.status==="Pending"
                                ? "bg-yellow-400" : order.status==="Completed" ? "bg-green-400" : "bg-red-400" }`}>
                                {order.status}
                            </span>
                        </td>

                        <td className="px-4 py-3 font-semibold">
                            Rs. {order.total.toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                            <ViewCustomerOrderInfo order={order} />
                        </td>
                        {/* <td className="px-4 py-3 text-center">
                            <button onClick={()=> setSelectedOrder(order)}
                                className="px-3 py-1 bg-accent text-white text-xs rounded-md
                                hover:bg-blue-900 active:scale-95 transition"
                                >
                                View
                            </button>
                        </td> */}
                    </tr>
                    ))}
                </tbody>

            </table>
            {/* {selectedOrder && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">

                    <button onClick={()=> setSelectedOrder(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                        ✕
                    </button>

                    <h2 className="text-xl font-bold text-secondary mb-4">
                        Order #{selectedOrder.orderId}
                    </h2>

                    <OrderTimeline status={selectedOrder.status} />

                </div>
            </div>
            )} */}
        </div>
        )}

    </div>
</div>
);
}