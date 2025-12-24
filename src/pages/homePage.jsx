import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./admin/productOverview";
import CartPage from "./cart";
import CeckOutPage from "./checkOut";
import Home from "./homeContent";
import AboutPage from "./about";
import ContactPage from "./contact";
import Footer from "../components/footer";

export default function HomePage(){
return(
<div className="w-full h-full overflow-y-scroll max-h-full">
    <Header />
    <div className="w-full min-h-[calc(100%-100px)]">
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/products" element={<ProductPage/>}></Route>
        <Route path="/overview/:productID" element={<ProductOverview/>}></Route>
        <Route path="/*" element={<h1>Page Not Found</h1>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/checkout" element={<CeckOutPage/>}></Route>
    </Routes>
    </div>
    <Footer/>
</div>
)
}