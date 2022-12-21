import { Button, Modal } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import { DeleteFilled, ScheduleFilled, EditFilled } from "@ant-design/icons";
import SetSchedule from "./SetSchedule";
import MovieEdit from "./MovieEdit";
import { fetchDetail } from "../redux/action";
import { useEffect } from "react";

const MovieManage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.admin.movies);
  let [movieId, setMovieId] = useState("");

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
      title: "Movie ID",
      dataIndex: "movieId",
      key: "movieId",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
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
              <DeleteFilled />
            </Button>
          </Space>
        </div>
      ),
    };
  });

  return (
    <div>
      <div className="my-5">
        <Button>Add Movie</Button>
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
        <MovieEdit />
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

export default MovieManage;
