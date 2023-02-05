import React, { useState } from "react";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCinemas,
  fetchDetail,
  setMovieScheduleAction,
} from "../redux/action";
import { fetchCinemaCluster } from "../utils/fetchCinema";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
const SetSchedule = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCinemas);
    dispatch(fetchDetail(params.id));
  }, [params.id]);
  const movieDetail = useSelector((state) => state.admin.movieDetail);
  const cinemas = useSelector((state) => state.admin.cinemas);
  const [cinemaCluster, setCinemaCluster] = useState([]);

  //handle form
  // const onFinish = (values) => {
  //   let formData = JSON.stringify(values);
  //   console.log(formData);
  //   dispatch(setMovieScheduleAction(values));
  // };

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (values) => {
      await dispatch(setMovieScheduleAction(values));
      navigate("/admin/movieManage");
    },
  });
  const handleChangeDatePicker = (value) => {
    let date = value.format("DD/MM/YYYY hh:mm:ss");
    console.log(date, value);
    formik.setFieldValue("ngayChieuGioChieu", date);
  };
  const onOk = (value) => {
    let date = value.format("DD/MM/YYYY hh:mm:ss");
    console.log(date, value);
    formik.setFieldValue("ngayChieuGioChieu", date);
  };
  const handleChangeCluster = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const handleChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    movieDetail && (
      <div className="flex">
        <div className="w-1/5 text-center">
          <h2>{movieDetail.tenPhim}</h2>
          <img alt="" src={movieDetail.hinhAnh} className="w-40" />
        </div>
        <div className="w-4/5 mt-10">
          <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
          >
            <Form.Item label="Hệ Thống Rạp">
              <Select
                onChange={(value) => {
                  console.log(value);
                  fetchCinemaCluster(value).then((res) => {
                    setCinemaCluster(res.data.content);
                    console.log(res.data.content);
                  });
                }}
              >
                {cinemas.map((item) => (
                  <Select.Option
                    value={item.maHeThongRap}
                    key={item.maHeThongRap}
                  >
                    {item.tenHeThongRap}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Cụm Rạp"
              rules={[
                {
                  required: true,
                  message: "Xin chọn cụm rạp",
                },
              ]}
            >
              <Select
                onChange={handleChangeCluster}
                options={
                  cinemaCluster.length > 0
                    ? cinemaCluster.map((itemCluster) => ({
                        label: itemCluster.tenCumRap,
                        value: itemCluster.maCumRap,
                      }))
                    : [{ label: "Chọn hệ thống rạp", value: 0 }]
                }
              ></Select>
            </Form.Item>

            <Form.Item label="Ngày giờ chiếu">
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                showTime
                onChange={handleChangeDatePicker}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Giá vé">
              <InputNumber
                min={75000}
                max={200000}
                onChange={handleChangeInputNumber}
              />
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  );
};

export default SetSchedule;
