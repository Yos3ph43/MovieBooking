import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserAction,
  fetchAllUserInfo,
  fetchProfileByIdAction,
  searchUserAction,
} from "../redux/action";

const UserManage = () => {
  const profile = useSelector((state) => state.admin.allUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchUser = (value) => {
    dispatch(searchUserAction(value.tuKhoa, value.MaNhom));
  };
  // const handleResetLayout = () => {
  // };
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    dispatch(fetchAllUserInfo());
  }, [current]);
  console.log(profile);

  const columns = [
    {
      title: "User ID",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "User Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "User Type",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  //table body
  const data = profile?.map((item) => {
    return {
      key: item?.taiKhoan,
      taiKhoan: <p>{item.taiKhoan}</p>,
      matKhau: <p>{item.matKhau}</p>,
      hoTen: <p>{item.hoTen}</p>,
      email: <p>{item.email}</p>,
      soDT: <p>{item.soDT}</p>,
      maLoaiNguoiDung: <p>{item.maLoaiNguoiDung}</p>,
      action: (
        <div key={item.taiKhoan}>
          <Space size="middle">
            <Link to={`/admin/userEdit/${item.taiKhoan}`}>
              <Button className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800">
                <EditFilled />
              </Button>
            </Link>

            <Button className="bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800">
              <DeleteFilled
                onClick={() => {
                  dispatch(deleteUserAction(item.taiKhoan));
                  setCurrent(current + 1);
                }}
              />
            </Button>
          </Space>
        </div>
      ),
    };
  });

  //main render
  return (
    <div>
      <div className="my-5">
        {/* user search  */}
        <div>
          <Form
            name="basic"
            wrapperCol={{ span: 6 }}
            initialValues={{ remember: true }}
            onFinish={handleSearchUser}
            autoComplete="off"
          >
            <Form.Item
              name="tuKhoa"
              rules={[{ required: true, message: "Please input user name!" }]}
            >
              <Input />
            </Form.Item>
            {/* hidden  */}
            <Form.Item name="MaNhom" initialValue="GP00" hidden>
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    dispatch(fetchAllUserInfo());
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UserManage;
