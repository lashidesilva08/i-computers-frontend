import { useState } from "react";
import { addToCart, getCart, getTotal } from "../utils/cart";
import { useNavigate } from "react-router-dom";



export default function CartPage() {

const [cart , setCart] = useState((getCart()))
const navigate = useNavigate();
// Temporary sample cart data


return (
<div className="w-full min-h-screen bg-primary p-6 flex justify-center">

    {/* Wrapper */}
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* Title */}
        <h1 className="text-secondary text-3xl font-bold mb-6">
            Your Cart
        </h1>

        {/* CART LIST */}
        <div className="flex flex-col gap-6">
            {cart.length === 0 && (
            <div className="text-center py-20">
                <img src="/abandoned-cart.png" className="w-40 mx-auto opacity-70" />
                <h2 className="text-secondary text-2xl font-bold mt-4">Your cart is empty</h2>
                <p className="text-gray-500 mt-2">Start adding items to your cart.</p>
                <button onClick={()=> navigate("/products")}
                    className="mt-6 px-6 py-3 bg-accent text-white rounded-xl hover:bg-blue-900 active:scale-95
                    transition"
                    >
                    Browse Products
                </button>
            </div>
            )}


            {cart.map((item , index) => (
            <div key={index} className="w-full flex flex-col sm:flex-row sm:items-center gap-6 p-4 bg-primary rounded-xl 
                border border-gray-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                {/* Image */}
                <img src={item.image} className="w-24 h-24 rounded-lg object-cover aspect-square bg-white p-2 border mx-auto sm:mx-0" />

                {/* Details */}
                <div className="flex flex-col flex-1 text-center sm:text-left">
                    <h2 className="text-secondary text-xl font-semibold">
                        {item.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        ID: {item.productID}
                    </p>

                    <div className="border-b border-gray-300 my-4"></div>

                    <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3 mt-1">
                        <p className="text-accent font-bold text-lg">
                            Rs. {item.price.toFixed(2)}
                        </p>

                        {item.labeledprice > item.price && (
                        <p className="text-gray-500 line-through text-sm">
                            Rs. {item.labeledprice.toFixed(2)}
                        </p>
                        )}

                        {item.labeledprice > item.price && (
                        <p className="text-green-600 text-sm font-medium">
                            Save {(item.labeledprice - item.price).toFixed(2)}
                        </p>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex justify-center sm:justify-start items-center gap-3 mt-2">
                        <button onClick={()=>{
                            addToCart(item , -1)
                            setCart(getCart())
                            }}
                            className="w-8 h-8 flex justify-center items-center
                            rounded-lg border border-gray-300
                            hover:bg-gray-200 transition">
                            -
                        </button>

                        <span className="text-secondary font-medium">
                            {item.qty}
                        </span>

                        <button onClick={()=>{
                            addToCart(item , 1)
                            setCart(getCart())
                            }}
                            className="w-8 h-8 flex justify-center items-center
                            rounded-lg border border-gray-300
                            hover:bg-gray-200 transition">
                            +
                        </button>
                    </div>
                </div>

                {/* TOTAL + REMOVE BUTTON */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:gap-3 mt-4 sm:mt-0">
                    <p className="text-secondary text-xl font-bold whitespace-nowrap">
                        Rs. {(item.price * item.qty).toFixed(2)}
                    </p>

                    <button onClick={()=> {
                        addToCart(item, -item.qty);
                        setCart(getCart());
                        }}
                        className="
                        px-3 py-1 bg-red-100 text-red-600 text-sm font-medium
                        rounded-lg hover:bg-red-200 active:scale-95
                        transition-all shadow-sm
                        "
                        >
                        Remove
                    </button>
                </div>

            </div>
            ))}


        </div>

        {/* CART TOTAL SECTION */}
         {cart.length > 0 && (
        <div className="mt-10 p-6 bg-primary rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-secondary text-2xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between text-secondary text-xl font-bold mt-4">
                <span>Subtotal</span>
                <span>Rs.{getTotal().toFixed(2)}</span>
            </div>

            <button onClick={()=> navigate("/checkout", { state: cart })}
                className="w-full mt-6 py-3 bg-accent text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-900 active:scale-95 transition-all">
                Proceed to Checkout
            </button>
        </div>
         )}

    </div>
</div>
);
}