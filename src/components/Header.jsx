import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const profile = useSelector((state) => state.user.profile);
  //conti
  const handleLogout = () => {};
  return (
    <header className="bg-gray-800 py-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-indigo-300 no-underline text-2xl font-semibold"
        >
          Cyborg Movie
        </Link>
        <Link to="/admin" className="text-red-600 font-semibold text-4xl">
          👉ADMIN👌👌👌💯💯👇
        </Link>
        {profile ? (
          <span className="text-indigo-100 text-xl">
            {" "}
            YOKOSO :{" "}
            <span className="text-indigo-300 font-bold ml-1">
              {profile?.hoTen}
            </span>{" "}
            <Button className="ml-10" danger type="primary">
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
