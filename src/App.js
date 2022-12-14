import Header from "components/Header";
import Booking from "features/Booking/Booking";
import MovieDetail from "features/Booking/Detail";
import Home from "features/Booking/Home";
import Login from "features/Login/Login";
import Signup from "features/Login/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
