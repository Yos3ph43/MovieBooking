import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AppRoute = ({ element: Comp, isPrivate, isAuth }) => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.profile);
  if (isPrivate) {
    if (token) return <Comp />;
    window.alert("Hãy đăng nhập để sử dụng tính năng này");
    return <Navigate to="/login" replace />;
  }
  if (isAuth) {
    if (!user) return <Comp />;
    return <Navigate to="/" replace />;
  }
  return <div>AppRoute</div>;
};

export default AppRoute;
