import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewOrderInfo({ order }) {
const [isModalOpen, setIsModalOpen] = useState(false);
const [ notes , setNotes] = useState(order.notes);
const [status , setStatus] = useState(order.status);

return (
<>
    {/* Modal */}
    <Modal isOpen={isModalOpen} onRequestClose={()=> setIsModalOpen(false)}
        className="w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6 pb-6 mx-auto
        outline-none"
        overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
        >

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-semibold text-secondary">
                Order Details
            </h2>
            <button onClick={()=> setIsModalOpen(false)}
                className="text-secondary hover:text-accent transition"
                >
                ✕
            </button>
        </div>

        {/* Basic Info */}
        <div className="space-y-2 mb-6">
            <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
            <p><span className="font-semibold">Customer:</span> {order.name}</p>
            <p><span className="font-semibold">Email:</span> {order.email}</p>
            <p><span className="font-semibold">Phone:</span> {order.phone || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {order.address}</p>
            <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleString()}</p>
            {/* Status */}
            <p className="font-semibold">Status:</p>

            <div className="flex items-center gap-3">
                {/* Status Badge */}
                <span className={`px-2 py-1 rounded-md text-white text-xs ${ status==="Pending" ? "bg-yellow-500" :
                    status==="Completed" ? "bg-green-600" :status==="Cancelled" ? "bg-red-600" : "bg-secondary/50" }`}>
                    {status}
                </span>

                {/* Status Selector */}
                <select value={status} onChange={(e)=> setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-accent
                    focus:outline-none">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>


            <p><span className="font-semibold">Notes:</span></p>

            <textarea value={notes} onChange={(e)=> {if(e.target.value==""){
                setNotes(null)
            }else{
                setNotes(e.target.value)
            }
        }}
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none bg-primary/30 text-sm resize-none min-h-[120px]"
                placeholder="Add notes about this order...">
            </textarea>


        </div>

        {/* Items Section */}
        <h3 className="text-md font-semibold text-secondary mb-2">
            Items Ordered
        </h3>

        <div className="space-y-4">
            {order.items?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-primary rounded-lg p-3 shadow-sm">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />

                <div className="flex-1">
                    <p className="font-semibold text-secondary">{item.name}</p>
                    <p className="text-sm text-gray-600">
                        Price: LKR {item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                        Subtotal: LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
            ))}
        </div>

        {/* Total */}
        <div className="mt-6 border-t pt-4 text-right">
            <p className="text-lg font-bold text-secondary">
                Total: LKR {order.total.toFixed(2)}
            </p>
        </div>

        <div className="mt-4 flex justify-end">
            {(order.notes != notes || order.status != status) && (
            <button onClick={()=> {
                const token = localStorage.getItem("token");

                axios.put(import.meta.env.VITE_BACKEND_URL + `/orders/${order.orderId}`,
                { status: status, notes: notes },
                {headers: {
                Authorization: `Bearer ${token}`,
                },
                }).then(() => {
                toast.success("Order Updated Successfully");
                setTimeout(() => {
                window.location.reload();
                }, 500);
                setIsModalOpen(false);
                }).catch(() => {
                toast.error("Order could not update");
                });
                }}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80
                active:scale-95 transition-all duration-200 shadow-sm">
                Save Changes
            </button>
            )}
        </div>

    </Modal>

    {/* View Button */}
    <button onClick={()=> setIsModalOpen(true)}
        className="px-3 py-1 bg-accent/70 text-white text-xs rounded-md hover:bg-accent active:scale-95 transition-all
        duration-200 shadow-sm cursor-pointer">
        View
    </button>
</>
);
}