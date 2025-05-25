// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Import your page components:
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tech from "./pages/Tech";
import Research from "./pages/Research";
import Contact from "./pages/Contact";
// import Products from "./pages/Products";
// import Admin from "./pages/Admin"; // for admin login/panel

function App() {
  return (
    <Router>
      {/* You can include a Navbar here so it appears on all pages */}
      <Navbar /> {/* Navbar will be shown on all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech" element={<Tech />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* Redirect or catch-all route for any undefined URLs: */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
