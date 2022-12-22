import Header from "components/Header";
import Admin from "features/Admin/Admin";
import MovieEdit from "features/Admin/components/MovieEdit";
import MovieManage from "features/Admin/components/MovieManage";
import UserManage from "features/Admin/components/UserManage";
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
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/movieManage" element={<MovieManage />} />
          <Route path="/admin/addMovie" element={<MovieEdit />} />
          <Route path="/admin/userManage" element={<UserManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
