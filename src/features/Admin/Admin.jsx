import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCinemas, fetchMovies } from "./redux/action";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs, Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

//Test Layout items
const navItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      {
        key: "user1",
        label: <NavLink to="/admin/userManage">Manage User</NavLink>,
      },
      {
        key: "user2",
        label: <NavLink to="/admin/userAdd">Add User</NavLink>,
      },
    ],
  },
  {
    key: "2",
    icon: <LaptopOutlined />,
    label: "Movies",
    children: [
      {
        key: "movies1",
        label: <NavLink to="/admin/movieManage">Movie List</NavLink>,
      },
      {
        key: "movies2",
        label: <NavLink to="/admin/addMovie">Add Movie</NavLink>,
      },
    ],
  },
];

const Admin = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchMovies);
  //   dispatch(fetchCinemas);
  // }, []);

  return (
    <div>
      <Layout>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Layout
            style={{
              padding: "24px 0",
              background: "#fff",
            }}
          >
            <Sider
              style={{
                background: "#fff",
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
                items={navItems}
              />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default Admin;
