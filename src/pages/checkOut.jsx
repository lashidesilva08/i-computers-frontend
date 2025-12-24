import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function CeckOutPage() {
const location = useLocation();
const navigate = useNavigate();
const [cart, setCart] = useState(location.state);
const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");

if (location.state == null) {
navigate("/products");
}

function getTotal() {
let total = 0;
cart.forEach((item) => {
total += item.price * item.qty;
});
return total;
}

async function submitOrder() {
const token = localStorage.getItem("token");

if (token == null) {
navigate("/login");
return;
}

const orderItems = [];
cart.forEach((item) => {
orderItems.push({
productID: item.productID,
qty: item.qty,
});
});

axios.post(
import.meta.env.VITE_BACKEND_URL + "/orders",
{
name: name,
address: address,
phone: phone,
items: orderItems,
},
{ headers: { Authorization: `Bearer ${token}` } }
)
.then(() => {
toast.success("Order placed successfully");
navigate("/orders");
})
.catch((error) => {
toast.error("Error placing order");
console.log(error);
});
}

return (
<div className="w-full min-h-screen bg-primary p-4 sm:p-6 flex justify-center">
    {/* Wrapper */}
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 sm:p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
            Check Out
        </h1>

        {/* CART LIST */}
        <div className="flex flex-col gap-6">
            {cart.map((item, index) => (
            <div key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 bg-primary rounded-xl border border-gray-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                {/* Image */}
                <img src={item.image} className="w-24 h-24 rounded-lg object-cover bg-white p-2 border" />

                {/* Details */}
                <div className="flex flex-col flex-1 w-full">
                    <h2 className="text-secondary text-lg sm:text-xl font-semibold">
                        {item.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        ID: {item.productID}
                    </p>

                    <div className="border-b border-gray-300 my-4"></div>

                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-accent font-bold text-lg">
                            Rs. {item.price.toFixed(2)}
                        </p>

                        {item.labeledprice > item.price && (
                        <p className="text-gray-500 line-through text-sm">
                            Rs. {item.labeledprice.toFixed(2)}
                        </p>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                        <button onClick={()=> {
                            const copiedCart = [...cart];
                            copiedCart[index].qty -= 1;
                            if (copiedCart[index].qty < 1) { copiedCart.splice(index, 1); } setCart(copiedCart); }}
                                className="w-8 h-8 flex justify-center items-center rounded-lg border border-gray-300 hover:bg-gray-200 transition">
                                -
                        </button>

                        <span className="text-secondary font-medium">
                            {item.qty}
                        </span>

                        <button onClick={()=> {
                            const copiedCart = [...cart];
                            copiedCart[index].qty += 1;
                            setCart(copiedCart);
                            }}
                            className="w-8 h-8 flex justify-center items-center rounded-lg border border-gray-300
                            hover:bg-gray-200 transition"
                            >
                            +
                        </button>
                    </div>
                </div>

                {/* Total */}
                <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                    <p className="text-secondary text-xl font-bold whitespace-nowrap">
                        Rs. {(item.price * item.qty).toFixed(2)}
                    </p>
                </div>
            </div>
            ))}
        </div>

        {/* CUSTOMER DETAILS SECTION */}
        <div className="mt-10 p-6 bg-primary rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-secondary text-2xl font-bold mb-4">
                Customer Details
            </h2>

            <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-secondary font-semibold mb-1">
                        Full Name
                    </label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white focus:ring-2
                    focus:ring-accent focus:outline-none"
                    />
                </div>

                {/* Address */}
                <div className="flex flex-col">
                    <label className="text-secondary font-semibold mb-1">
                        Address
                    </label>
                    <textarea value={address} onChange={(e)=> setAddress(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white h-24 focus:ring-2 focus:ring-accent focus:outline-none resize-none"
              ></textarea>
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                    <label className="text-secondary font-semibold mb-1">
                        Contact Number
                    </label>
                    <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)}
                    placeholder="Enter your contact number"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white focus:ring-2
                    focus:ring-accent focus:outline-none"
                    />
                </div>
            </div>
        </div>

        {/* CART TOTAL SECTION */}
        <div className="mt-10 p-6 bg-primary rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-secondary text-2xl font-bold mb-4">
                Order Summary
            </h2>

            <div className="flex justify-between text-secondary text-xl font-bold mt-4">
                <span>Subtotal</span>
                <span>{getTotal().toFixed(2)}</span>
            </div>

            <button onClick={submitOrder}
                className="w-full mt-6 py-3 bg-accent text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-900 active:scale-95 transition-all">
                Order Now
            </button>
        </div>
    </div>
</div>
);
}