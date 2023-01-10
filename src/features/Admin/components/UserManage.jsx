import { DeleteFilled, EditFilled, ScheduleFilled } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieEdit from "./MovieEdit";
import SetSchedule from "./SetSchedule";

const UserManage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.admin.movies);
  const userInfo = useSelector((state) => state.user.profile);
  console.log(userInfo);
  const [movieId, setMovieId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  //edit movie
  const showModal = () => {
    setIsModalOpen(true);
  };
  //set movie schedule
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  //close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    setMovieId("");
  };
  //table head

  const columns = [
    {
      title: "User ID",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
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
  const data = movies.map((item) => {
    return {
      key: item.maPhim,
      movieId: <p>{item.maPhim}</p>,
      image: <img alt="" src={item.hinhAnh} className="w-16" />,
      name: <p>{item.tenPhim}</p>,
      desc: <p>{item.moTa}</p>,
      action: (
        <div>
          <Space size="middle">
            <Button
              onClick={() => {
                showModal();
                setMovieId(item.maPhim);
              }}
              className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800"
            >
              <EditFilled />
            </Button>
            <Button
              onClick={() => {
                showModal1();
                setMovieId(item.maPhim);
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
            setMovieId(null);
          }}
        >
          Add Movie
        </Button>
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
        <MovieEdit movieId={movieId} />
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
        <SetSchedule movieId={movieId} />
      </Modal>
    </div>
  );
};

export default UserManage;
