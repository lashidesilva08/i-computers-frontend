import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <Link to={"/overview/" + product.productID}
      className="w-full max-w-xs sm:w-60 h-[350px] m-4 bg-white rounded-2xl shadow-md hover:shadow-xl 
      transition-all duration-700 border border-gray-200 overflow-hidden group">

      {/* Image */}
      <div className="w-full h-40 bg-primary relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="bg-white w-full h-full object-cover absolute top-0 left-0 
          transition-opacity duration-700 opacity-100 group-hover:opacity-0"
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="bg-white w-full h-full object-cover absolute top-0 left-0 
            transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Content Wrapper */}
      <div className="relative p-4 h-[200px] flex flex-col justify-between">

        {/* Normal Content */}
        <div
          className="transition-transform duration-700 transform 
          group-hover:-translate-y-full opacity-100 group-hover:opacity-0"
        >
          <h3 className="text-secondary font-semibold text-lg line-clamp-2 h-14">
            {product.name}
          </h3>

          <div className="mt-2">
            <p className="text-accent font-bold text-xl">
              Rs. {product.price.toFixed(2)}
            </p>

            {product.labeledPrice > product.price && (
              <p className="text-gray-500 text-sm line-through">
                Rs. {product.labeledPrice.toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">
            {product.description}
          </p>
        </div>

        {/* Hover Button */}
        <div
          className="absolute inset-0 flex justify-center items-center opacity-0 
          group-hover:opacity-100 transform translate-y-full 
          group-hover:translate-y-0 transition-all duration-700">
          <button className="px-4 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-blue-900 active:scale-110 
          transition-transform duration-700">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
