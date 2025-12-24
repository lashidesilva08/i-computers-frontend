import { useState } from "react";

export default function ImageSlider(props) {

const images = props.images;
const [activeIndex, setActiveIndex] = useState(0);

return (
<>
    {/* Main Image */}
    <div className="w-full h-[380px] bg-white rounded-xl shadow-md border overflow-hidden">
        <img src={images[activeIndex]} alt="Product"
            className="w-full h-full object-contain p-4 transition-all duration-700 ease-in-out" />
    </div>

    {/* Thumbnail Strip */}
    <div className="flex justify-center items-center gap-3 mt-3">
        {images.map((img, index) => (
        <div key={index} onClick={()=> setActiveIndex(index)}className={`w-20 h-20 rounded-lg shadow border bg-white
            overflow-hidden cursor-pointer
            transition-transform duration-300 hover:scale-105
            ${activeIndex === index ? "ring-1 ring-accent" : ""}`}>
            <img src={img} className="w-full h-full object-cover p-2" />
        </div>
        ))}
    </div>
</>
);
}