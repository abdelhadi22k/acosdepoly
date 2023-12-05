import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import HomePage from "./page/HomePage";
import NavBar from "./components/utils/NavBar";
import Products from "./page/products";
import CartPage from "./page/CartPage";
import ProductDetels from './page/ProductDetels';
import SingIn from "./page/SingIn";
import SingUp from "./page/SingUp";
import SopningPage from "./page/SopningPage";
import PaymentMethod from "./page/PaymentMethod";
import PlaceOrderPage from "./page/PlaceOrderPage";
import OrderPage from "./page/OrderPage";
import OrderHistoryPage from "./page/OrderHistoryPage";
import SearchPage from "./page/SearchPage";
import UserProfilePage from "./page/UserProfilePage";
import ProfileScreen from "./page/ProfileScreen";
import LikePage from './page/LikePage';
import ClassPage from "./page/ClassPage";
import Classdetails from "./page/Classdetails";
import OfferPage from "./page/OfferPage";
import DiscountPage from "./page/DiscountPage";

function App() {
  return (
    <BrowserRouter className="App">
    <NavBar/>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetels />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/shipping" element={<SopningPage />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/Editprofile" element={<ProfileScreen />} />
          <Route path="/like" element={<LikePage />} />
          <Route path="/categories" element={<ClassPage />} />
          <Route path="/categories/:categoryProducts" element={<Classdetails />} />
          <Route path="/offers" element={<OfferPage />} />
          <Route path="/discounts" element={<DiscountPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
