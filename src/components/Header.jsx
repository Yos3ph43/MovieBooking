import { Button } from "antd";
import { fetchProfileAction, logoutAction } from "features/Login/redux/action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const profile = useSelector((state) => state.user.profile);
  console.log(profile);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction());
      localStorage.setItem("token", null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-gray-800 py-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-indigo-300 no-underline text-2xl font-semibold"
        >
          Cyborg Movie
        </Link>
        <Link
          to="/admin/userManage"
          className="text-red-600 font-semibold text-4xl"
        >
          👉ADMIN👌👌👌💯💯👇
        </Link>
        {profile ? (
          <span className="text-indigo-100 text-xl">
            {" "}
            YOKOSO :{" "}
            <Link
              to="/userinfo"
              className="text-indigo-300 font-bold ml-1 no-underline hover:text-yellow-300"
            >
              {profile?.hoTen}
            </Link>{" "}
            <Button
              onClick={handleLogout}
              className="ml-10"
              danger
              type="primary"
            >
              LOGOUT
            </Button>
          </span>
        ) : (
          <div>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                if (isActive) return "text-yellow-200 text-lg no-underline";
                return "text-indigo-300 text-lg no-underline hover:text-indigo-100";
              }}
            >
              Login
            </NavLink>
            <span className="text-indigo-300 no-underline mx-1"> | </span>
            <NavLink
              to="/signup"
              className={({ isActive }) => {
                if (isActive) return "text-yellow-200 text-lg no-underline";
                return "text-indigo-300 text-lg no-underline hover:text-indigo-100";
              }}
            >
              Signup
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
