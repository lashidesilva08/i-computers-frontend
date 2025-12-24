import Loader from "../components/loader";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { FiSearch } from "react-icons/fi";

export default function ProductPage() {

const[products, setProducts] = useState([])
const[loaded , setLoaded] = useState(false)

useEffect(() => {
const token = localStorage.getItem("token")
if(!loaded){
axios.get(import.meta.env.VITE_BACKEND_URL + "/products",{
headers:{Authorization:`Bearer ${token}`}
}).then((response) => {
console.log(response.data);
setProducts(response.data);
setLoaded(true)
});
}

}, [loaded]);

return (
<div className="w-full  flex justify-center">
    <div className="w-full max-w-[1400px] px-4">

        <div className="sticky top-[110px] z-20 mb-4">
            <div className="relative w-full sm:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search products..." onChange={async(e)=> {
                if(e.target.value == ""){
                     setLoaded(false)
                await axios.get(import.meta.env.VITE_BACKEND_URL + "/products",{
                    headers:{Authorization:`Bearer ${token}`}
                    }).then((response) => {
                        console.log(response.data);
                        setProducts(response.data);
                        setLoaded(true)
                    });
                setLoaded(true)
                }else{
                    await axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search/"+ e.target.value).then((response) => {
                        console.log(response.data);
                        setProducts(response.data);
                        setLoaded(true)
                    });
                setLoaded(true)

                }
                }

                }
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200
                bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent
                transition"
                />
            </div>
        </div>

        {
        !loaded?
        <Loader />:
        <div className="w-full flex justify-center p-4 flex-row flex-wrap">
            {
            products.map(
            (item)=>{
            return(
            <ProductCard key={item.productID} product={item} />
            )
            }
            )
            }
        </div>
        }

    </div>



</div>
)
}