import { Route, Routes } from "react-router"
import Home from "../page/Home"
import Shop from "../page/Shop"
import Login from "../page/Auth/Login"
import PlantCare from "../page/PlantCare"
import Blogs from "../page/Blogs"
import Cart from "../page/Cart"
import Checkout from "../page/Checkout"
import ProductDetails from "../page/ProductDetails"

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/plantcare" element={<PlantCare />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/productDetails/:id" element={<ProductDetails />} />
            </Routes>
        </div>
    )
}

export default Router
