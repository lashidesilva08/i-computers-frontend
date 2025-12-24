import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductPage() {

const [products, setProduct] = useState([]);
const [loaded , setLoaded] = useState(false)

useEffect(() => {
const token = localStorage.getItem("token")
if(!loaded){
axios.get(import.meta.env.VITE_BACKEND_URL + "/products",{
headers:{Authorization:`Bearer ${token}`}
}).then((response) => {
console.log(response.data);
setProduct(response.data);
setLoaded(true)
});
}

}, [loaded]);

return (
<div className="w-full h-full flex justify-center items-start p-10 bg-primary text-secondary overflow-auto relative">

  {loaded ?<div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
    <div
      className="flex justify-between items-center p-6 border-b border-gray-200 bg-linear-to-r from-primary to-gray-50">
      <h2 className="text-2xl font-semibold text-accent tracking-wide">Product Management</h2>
    </div>

    <div className="overflow-x-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      <table className="min-w-full table-auto text-sm text-left border-collapse">
        <thead className="bg-accent text-white sticky top-0">
          <tr>
            <th className="px-4 py-3 font-medium">Image</th>
            <th className="px-4 py-3 font-medium">Product ID</th>
            <th className="px-4 py-3 font-medium">Product Name</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Labeled Price</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Brand</th>
            <th className="px-4 py-3 font-medium">Model</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Availability</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((items, index) => (
          <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
            <td className="px-4 py-3">
              <img src={items.images[0]} alt={items.name} className="w-10 h-10 object-cover rounded-md shadow-sm" />
            </td>
            <td className="px-4 py-3">{items.productID}</td>
            <td className="px-4 py-3 font-medium text-gray-700">{items.name}</td>
            <td className="px-4 py-3 text-green-600 font-semibold">${items.price}</td>
            <td className="px-4 py-3 text-gray-600">${items.labeledPrice}</td>
            <td className="px-4 py-3">{items.category}</td>
            <td className="px-4 py-3">{items.brand}</td>
            <td className="px-4 py-3">{items.model}</td>
            <td className="px-4 py-3">{items.stocks}</td>
            <td className="px-4 py-3 text-center">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${ items.isAvailable
                ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}>
                {items.isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </td>
            <td className="px-4 py-3 flex items-center gap-2">
              <Link to="/admin/update-products"  state= {items} // we can use navigate too using a button
                className="px-3 py-1 bg-accent text-white text-xs rounded-md hover:bg-blue-900 active:scale-95 transition-all duration-200 shadow-sm">
              Edit
              </Link>

              <ProductDeleteButton productID={items.productID} reload={()=> { setLoaded(false) }}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>:
  <Loader />}

  <Link to="/admin/add-products"
    className="fixed right-6 bottom-6 w-[60px] h-[60px] flex justify-center items-center text-6xl text-accent bg-white border-2 border-accent rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300">
  <FiPlusSquare />
  </Link>
</div>
);
}