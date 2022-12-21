import { Tabs } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieManage from "./components/MovieManage";
import UserManage from "./components/UserManage";
import { fetchCinemas, fetchMovies } from "./redux/action";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies);
    dispatch(fetchCinemas);
  }, []);
  return (
    <div className="container mx-auto flex bg">
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        size="large"
        items={[
          {
            label: `User`,
            key: "1",
            children: <UserManage />,
          },
          {
            label: `Movies`,
            key: "2",
            children: <MovieManage />,
          },
        ]}
      />
    </div>
  );
};

export default Admin;
