import Header from "components/Header";
import Admin from "features/Admin/Admin";
import AddMovie from "features/Admin/components/AddMovie";
import MovieManage from "features/Admin/components/MovieManage";
import UserManage from "features/Admin/components/UserManage";
import EditMovie from "features/Admin/components/EditMovie";
import Booking from "features/Booking/Booking";
import MovieDetail from "features/Booking/Detail";
import Home from "features/Booking/Home";
import UserInfo from "features/Booking/UserInfo";
import Login from "features/Login/Login";
import { fetchProfileAction } from "features/Login/redux/action";
import Signup from "features/Login/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetSchedule from "features/Admin/components/SetSchedule";
import UserAdd from "features/Admin/components/UserAdd";
import UserEdit from "features/Admin/components/UserEdit";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/movieManage" element={<MovieManage />} />
          <Route path="/admin/addMovie" element={<AddMovie />} />
          <Route path="/admin/editMovie/:id" element={<EditMovie />} />
          <Route path="/admin/setMovieSchedule/:id" element={<SetSchedule />} />
          <Route path="/admin/userManage" element={<UserManage />} />
          <Route path="/admin/userAdd" element={<UserAdd />} />
          <Route path="/admin/userEdit" element={<UserEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
