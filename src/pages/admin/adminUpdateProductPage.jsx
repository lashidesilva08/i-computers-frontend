import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { Link, useLocation, useNavigate } from "react-router-dom"
import uploadFile from "../../utils/mediaUpload"

export default function AdminUpdateProductPage(){

const location = useLocation() 
   
const [productID , setID] = useState(location.state.productID)
const [name , setName] = useState(location.state.name)
const [altName , setaltName] = useState(location.state.altName.join(","))
const [description , setDescription] = useState(location.state.description)
const [price , setPrice] = useState(location.state.price)
const [labeledPrice , setLabeledPrice] = useState(location.state.labeledPrice)
const [files , setFiles] = useState([])
const [category , setCategory] = useState(location.state.category)
const [brand , setBrand] = useState(location.state.brand)
const [model , setModel] = useState(location.state.model)
const [stocks , setStocks] = useState(location.state.stocks)
const [isAvailable , setisAvailable] = useState(location.state.isAvailable)

const navigate = useNavigate()

if(!location.state){
    window.location.href = "/admin/products"
}

async function updateProduct() {
   
    const token = localStorage.getItem("token")
    if(token == null) {
        toast.error("You must be logged in as an admin to update products")
        navigate("/login")
        return
    }

    const imagePromises = []

    for(let i=0 ; i<files.length ; i++) {
        const promise = uploadFile(files[i]) //A Promise represents a task that will finish later, not immediately
        imagePromises.push(promise)
    };

    let images = await Promise.all(imagePromises).catch((err)=>{
        toast.error("Error uploading images")
        console.log("Error uploading images : ")
        console.log(err)
    })

    if(images.length == 0){
        images = location.state.images;
    }

     
    if(productID == ""|| name == "" || description == "" || category == "" || brand == "" ||model == ""){
        toast.error("Please fill all the required fields")
        return
    }

    try{
        const altNamesInArray = altName.split(",")
    
        await axios.put(import.meta.env.VITE_BACKEND_URL +"/products/" + productID,{

            name : name,
            altName : altNamesInArray,
            description : description,
            price : price,
            labeledPrice : labeledPrice,
            images : images,
            category : category,
            brand : brand,
            model : model,
            stocks : stocks,
            isAvailable : isAvailable
        },{
             headers : {Authorization : "Bearer " + token}
            })

        toast.success("Product updated successfully") 
        navigate("/admin/products")   

    }catch{
        toast.error("Error updating product. Please try again")
        console.log("Error updating product : ")
        // console.log(err)
    }
}


return(
<div className="w-full p-[50px] flex justify-center ">

    <div className="w-[800px]  bg-accent/30 rounded-2xl p-10">
    <h1 className="w-full mb-5 font-bold text-secondary text-xl bold flex items-center gap-1" ><MdOutlineProductionQuantityLimits/>Update Product</h1>
        <div className="w-full bg-white p-5 flex flex-row flex-wrap justify-between rounded-xl">
            <div className="my-2.5 w-[40%]">
                <label>Product ID</label>
                <input disabled type="text " value={productID} onChange={(e)=>{setID(e.target.value)}} className="w-full h-10
                rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4"/>
            </div>
            <div className="my-2.5 w-[40%]">
                <label>Name</label>
                <input type="text " value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full h-10
                rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4"/>
                <p className="text-sm text-gray-600 w-full text-right italic">Provide a unique name</p>
            </div>
            <div className="my-2.5 w-full">
                <label>Alternative Names</label>
                <input type="text " value={altName} onChange={(e)=>{setaltName(e.target.value)}} className="w-full
                h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl
                px-4"/>
                <p className="text-sm text-gray-600 w-full text-right italic">Separate multiple names with commas</p>
            </div>
            <div className="my-2.5 w-full">
                <label>Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-full h-[100px] rounded-2xl
                 focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4 py-2.5"/>
            </div>
            <div className="my-2.5 w-[40%]">
                <label>Price</label>
                <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="w-full h-10 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4"/>
            </div>
            <div className="my-2.5 w-[40%]">
                <label>Labeled Price</label>
                <input type="number" value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} className="w-full h-10 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4"/>
            </div>
             <div className="my-2.5 w-full">
                <label>Image</label>
                <input type="file" multiple={true} onChange={(e)=>{setFiles(e.target.files)}} className="w-full h-10 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4"/>
            </div>
            <div className="my-2.5 flex flex-col w-[30%]">
                <label>Category</label>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="w-full  h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4">
                    <option value="">Select a category</option>
                    <option value="CPU">CPU</option>
                    <option value="RAM">RAM</option>
                    <option value="Graphic Cards">Graphic Cards</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="Hard Disks">Hard Disks</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Monitors">Monitors</option>
                </select>
            </div>
            <div className="my-2.5 w-[30%]">
                <label>Brand</label>
                <input type="text " value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="w-full
                h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl
                px-4"/>
            </div>
            <div className="my-2.5 w-[30%]">
                <label>Model</label>
                <input type="text " value={model} onChange={(e)=>{setModel(e.target.value)}} className="w-full
                h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl
                px-4"/>
            </div>
            <div className="my-2.5 w-[40%]">
                <label>Stocks</label>
                <input type="number " value={stocks} onChange={(e)=>{setStocks(e.target.value)}} className="w-full
                h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl
                px-4"/>
            </div>
            <div className="my-2.5 flex flex-col w-[40%] ">
                <label>Availability</label>
                <select value={isAvailable} onChange={(e)=>{setisAvailable(e.target.value)}} className="w-full  h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-4">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            <button onClick={updateProduct}className="w-[49%] mt-5 py-3 rounded-2xl bg-linear-to-r from-accent to-secondary text-primary font-semibold text-lg border-2 border-secondary
            shadow-[0_0_15px_rgba(4,78,163,0.6)] hover:from-secondary hover:to-accent hover:text-accent hover:bg-linear-to-l hover:shadow-[0_0_25px_rgba(4,78,163,0.8)]
            active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 cursor-pointer" >
            Update Product
            </button>
            <Link to="/admin/products"className="w-[49%] mt-5 py-3 rounded-2xl bg-linear-to-r from-red-500 to-secondary text-primary font-semibold text-lg border-2 border-secondary
            shadow-[0_0_15px_rgba(4,78,163,0.6)] hover:from-secondary hover:to-red-500 hover:text-accent hover:bg-linear-to-l hover:shadow-[0_0_25px_rgba(4,78,163,0.8)]
            active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 cursor-pointer text-center"> Close </Link>

        </div>
    </div>
</div>
)
}