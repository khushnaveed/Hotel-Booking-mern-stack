import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./components/RoomDetail";
import Restaurant from "./pages/Restaurant";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import EventDetails from "./components/EventDetails.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NavbarTop from "./components/NavbarTop";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { CurrencyProvider } from "./context/CurrencyContext";
import { WeatherProvider } from "./context/WeatherContext.jsx";
import WeatherPage from "./pages/WeatherPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { GuestProvider } from "./context/GuestContext.jsx";
import { RoomDetailProvider } from "./context/RoomDetailContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFlow from "./pages/CheckoutFlow.jsx";
import SuccessPage from "./components/checkoutPageComponents/SuccessPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  return (
    <WeatherProvider>
      <CurrencyProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <HashRouter>
              <GuestProvider>
                <ScrollToTop/>
                <NavbarTop />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/restaurant" element={<Restaurant />} />
                  <Route
                    path="/rooms/:roomSlug"
                    element={
                      <RoomDetailProvider>
                        <RoomDetail />
                      </RoomDetailProvider>
                    }
                  />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />{" "}
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/weather" element={<WeatherPage />} />
                  <Route path="/checkout" element={<CheckoutFlow />} />
                  <Route path="/adminPanel" element={<AdminPanel />} />
                  <Route path="/success" element={<SuccessPage />} />
                </Routes>
              </GuestProvider>

              <Footer />
            </HashRouter>
          </Elements>
        </CartProvider>
      </CurrencyProvider>
    </WeatherProvider>
  );
}

export default App;
