import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProductDeleteButton(props){

const productID = props.productID
const reload = props.reload
const [showMessage , setShowMessage] = useState(false)
const [isDeleting , setIsDeleting] = useState(false)

async function handleDelete() {

    const token = localStorage.getItem("token")
    setIsDeleting(true)
    axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID,{
    headers:{Authorization:`Bearer ${token}`}
    }).then(() => {
        toast.success("Product deleted successfully")
        setIsDeleting(false)
        setShowMessage(false)
        reload()
    }).catch(() =>{
        toast.error("Failed to delete the product")
        setIsDeleting(false)
    })
}

return (
<>
    {/* Delete Button */}
    <button onClick={()=> setShowMessage(true)}
        className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 active:scale-95 transition-all
        duration-200 shadow-sm"
        >
        Delete
    </button>

    {/* Modal */}
    {showMessage && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

        {/* Modal Box */}
        <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-8 animate-fadeIn relative">

            {/* Close (X) Button */}
            <button onClick={()=> setShowMessage(false)}
                className="absolute -right-8 -top-8 w-9 h-9 flex justify-center items-center bg-red-500 text-white
                rounded-full text-lg font-bold hover:bg-red-600 active:scale-95 transition"
                >
                ✕
            </button>

            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">
                Delete Product
            </h1>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{productID}</span>?
                This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-4">

                <button disabled={isDeleting} onClick={()=> {
                    // delete handler can be executed here
                    handleDelete();
                    setShowMessage(false);
                    }}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 active:scale-95
                    transition-all"
                    >
                    Yes, Delete
                </button>

                <button onClick={()=> setShowMessage(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 active:scale-95
                    transition-all"
                    >
                    Cancel
                </button>

            </div>
        </div>
    </div>
    )}
</>
);

}
