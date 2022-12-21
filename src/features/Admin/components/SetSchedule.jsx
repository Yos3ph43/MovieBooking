import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../redux/action";
import { fetchCinemaCluster } from "../utils/fetchCinema";
const SetSchedule = (props) => {
  const [form] = Form.useForm();
  //handle form
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetail(props.movieId));
  }, [props.movieId]);
  const movieDetail = useSelector((state) => state.admin.movieDetail);
  const cinemas = useSelector((state) => state.admin.cinemas);
  const [cinemaCluster, setCinemaCluster] = useState([]);
  return (
    movieDetail && (
      <div className="flex">
        <div className="w-1/5 text-center">
          <h2>{movieDetail.tenPhim}</h2>
          <img alt="" src={movieDetail.hinhAnh} className="w-40" />
        </div>
        <div className="w-4/5 mt-10">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: "default",
            }}
            onFinish={onFinish}
            size="default"
          >
            <Form.Item
              name="maPhim"
              initialValue={movieDetail.maPhim}
              className="hidden"
            >
              <InputNumber />
            </Form.Item>
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
              name="maRap"
              rules={[
                {
                  required: true,
                  message: "Xin chọn cụm rạp",
                },
              ]}
            >
              <Select>
                {console.log(cinemaCluster.length)}
                {cinemaCluster.length > 0 ? (
                  cinemaCluster.map((itemCluster) => (
                    <Select.Option
                      value={itemCluster.maCumRap}
                      key={itemCluster.maCumRap}
                    >
                      {itemCluster.tenCumRap}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value={null}> Chọn hệ thống rạp</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày giờ chiếu"
              name="ngayChieuGioChieu"
              rules={[
                {
                  required: true,
                  message: "Xin chọn ngày chiếu",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Giá vé"
              name="giaVe"
              rules={[
                {
                  required: true,
                  message: "Xin nhập giá vé",
                },
              ]}
            >
              <InputNumber />
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
