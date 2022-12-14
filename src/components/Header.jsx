import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 py-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-indigo-300 no-underline text-2xl font-semibold"
        >
          Cyborg Movie
        </Link>
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
      </div>
    </header>
  );
};

export default Header;
