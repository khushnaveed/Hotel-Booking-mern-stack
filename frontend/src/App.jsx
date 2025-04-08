import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./components/RoomDetail";
import Restaurant from "./pages/Restaurant";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavbarTop from "./components/NavbarTop";

function App() {
  return (
    <BrowserRouter>
      <NavbarTop />
      <Navbar />
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          {/* <Route path="/rooms/:roomType" element={<RoomDetail />} /> */}
          {/* zahra added next line */}
          <Route path="/rooms/:roomSlug" element={<RoomDetail />} />

          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/reservation/rooms" element={<Rooms />} />
          <Route path="/reservation/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
