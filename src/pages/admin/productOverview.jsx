import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../imageSlider";
import { addToCart } from "../../utils/cart";

export default function ProductOverview() {

const params = useParams();
const toastShown = useRef(false);
const navigate = useNavigate()
const [product, setProduct] = useState(null);
const [status, setStatus] = useState("loading");

useEffect(() => {
axios
.get(`${import.meta.env.VITE_BACKEND_URL}/products/${params.productID}`)
.then((response) => {
setProduct(response.data);
setStatus("success");
})
.catch(() => {
setStatus("error");
if (!toastShown.current) {
toastShown.current = true;
toast.error("Product not found");
}
});
}, []);

return (
<>
    {status === "loading" &&
    <Loader />}

    {status === "error" && (
    <h1 className="text-center mt-10 text-2xl text-red-600">
        Error loading product
    </h1>
    )}

    {status === "success" && (
    <div className="w-full min-h-screen bg-primary flex justify-center p-10 max-md:p-4">

        {/* Wrapper */}
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 
        p-8 max-md:p-4 flex gap-10 max-md:gap-6 max-md:flex-col">

            {/*  MOBILE TITLE ABOVE IMAGE */}
            <div className="block lg:hidden">
                <h1 className="text-secondary text-2xl font-bold">
                    {product.name}
                </h1>

                <p className="text-gray-500 mt-1">
                    {product.brand} • {product.category}
                </p>

                <p className="text-gray-500 mt-1">
                    {product.productID}
                </p>

                {product.altName && product.altName.length>0 &&(
                        <p className="text-gray-500 mt-1">
                        {product.altName.join(" | ")}
                    </p>
                )}

                <div className="mt-3">
                    <p className="text-accent text-3xl font-extrabold">
                        Rs. {product.price.toFixed(2)}
                    </p>

                    {product.labeledPrice > product.price && (
                    <p className="text-gray-500 line-through mt-1">
                        Rs. {product.labeledPrice.toFixed(2)}
                    </p>
                    )}
                </div>
            </div>

            {/* LEFT: Product Images */}
            <div className="w-1/2 max-md:w-full flex flex-col gap-4">
                <ImageSlider images={product.images} />
            </div>

            {/* RIGHT: Product Details */}
            <div className="w-1/2 max-md:w-full flex flex-col">


                {/*  DESKTOP TITLE (hidden on mobiles) */}
                <div className="hidden lg:block">
                    <h1 className="text-secondary text-3xl font-bold leading-tight">
                        {product.name}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {product.brand} • {product.category}
                    </p>
                    <p className="text-gray-500 mt-1">
                        {product.productID}
                    </p>
                    {product.altName && product.altName.length>0 &&(
                        <p className="text-gray-500 mt-1">
                        {product.altName.join(" | ")}
                    </p>
                    )}
                    

                    <div className="mt-4">
                        <p className="text-accent text-4xl font-extrabold">
                            Rs. {product.price.toFixed(2)}
                        </p>

                        {product.labeledPrice > product.price && (
                        <p className="text-gray-500 line-through mt-1">
                            Rs. {product.labeledPrice.toFixed(2)}
                        </p>
                        )}
                    </div>
                </div>

                {/* Availability */}
                <div className="mt-4">
                    {product.isAvailable ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        In Stock
                    </span>
                    ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        Out of Stock
                    </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-700 mt-6 leading-relaxed">
                    {product.description}
                </p>

                {/* Buy Buttons */}
                <div className="flex gap-4 mt-auto pt-10 max-md:flex-col max-md:pt-6">

                    <button onClick={()=> { addToCart(product, 1); }}
                        className="px-6 py-3 bg-accent text-white rounded-xl
                        shadow-md hover:bg-blue-900
                        transition-all duration-300 active:scale-95 w-full max-md:w-full">
                        Add to Cart
                    </button>

                    <button onClick={()=> navigate("/checkout", {
                        state: [{
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labeledprice: product.labeledprice,
                        image: product.images[0],
                        qty: 1
                        }]
                        })}
                        className="px-6 py-3 border-2 border-accent text-accent rounded-xl shadow-sm
                        hover:bg-accent hover:text-white transition-all duration-300 active:scale-95 w-full
                        max-md:w-full">
                        Buy Now
                    </button>

                </div>

            </div>
        </div>
    </div>

    )}
</>
);
}