import {
  DeleteFilled,
  DownOutlined,
  EditFilled,
  ScheduleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllUserInfo } from "../redux/action";
// import MovieEdit from "./MovieEdit";
// import SetSchedule from "./SetSchedule";

const UserManage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserInfo());
  }, []);
  const profile = useSelector((state) => state.admin.allUser);
  console.log(profile);
  const [user, setUser] = useState("");
  //group user select
  const handleChange = (value) => {
    console.log(value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  //edit user
  const showModal = () => {
    setIsModalOpen(true);
  };
  //set user schedule
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  //close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    setUser("");
  };
  //table head

  const columns = [
    {
      title: "User ID",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      // sorter: (a, b) => a.taiKhoan - b.taiKhoan,
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
  ];
  //table body
  const data = profile?.map((item) => {
    return {
      key: item?.taiKhoan,
      taiKhoan: <p>{item?.taiKhoan}</p>,
      matKhau: <p>{item?.matKhau}</p>,
      hoTen: <p>{item?.hoTen}</p>,
      email: <p>{item?.email}</p>,
      soDT: <p>{item?.soDT}</p>,
      maLoaiNguoiDung: <p>{item?.maLoaiNguoiDung}</p>,
      action: (
        <div>
          <Space size="middle">
            <Button
              onClick={() => {
                showModal();
                // setUser(item.taiKhoan);
              }}
              className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800"
            >
              <EditFilled />
            </Button>
            <Button
              onClick={() => {
                showModal1();
                // setUser(item.taiKhoan);
              }}
              className="bg-green-800 text-white border-white hover:border-green-600 hover:text-green-600 hover:bg-neutral-800"
            >
              <ScheduleFilled />
            </Button>
            <Button className="bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800">
              <DeleteFilled
                onClick={() => {
                  // dispatch(deleteSeletedMovie(item.maPhim));
                  // dispatch(fetchMovies);
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
        <Button
          onClick={() => {
            showModal();
            // setUser(null);
          }}
        >
          Add User
        </Button>
        {/* group select  */}
        <Select
          labelInValue
          defaultValue={{
            value: "GP00",
            label: "Group 0 (GP00)",
          }}
          style={{
            width: 140,
          }}
          onChange={handleChange}
          options={[
            {
              value: "GP00",
              label: "Group 0 (GP00)",
            },
            {
              value: "GP01",
              label: "Group 1 (GP01)",
            },
            {
              value: "GP02",
              label: "Group 2 (GP02)",
            },
            {
              value: "GP03",
              label: "Group 3 (GP03)",
            },
          ]}
        />
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width="80%"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {/* <MovieEdit user={user} /> */}
      </Modal>

      <Modal
        open={isModalOpen1}
        onCancel={handleCancel}
        width="80%"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {/* <SetSchedule user={user} /> */}
      </Modal>
    </div>
  );
};

export default UserManage;
