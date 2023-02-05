import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Rate,
  Switch,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../redux/action";
import moment from "moment";
import { updateMovieAction } from "../redux/action";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const getFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const MovieEdit = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetail(props.movieId));
  }, [props.movieId]);
  let movieDetail = useSelector((state) => state.admin.movieDetail);
  if (!props.movieId) movieDetail = null;

  //submit
  const onFinish = async (values) => {
    await dispatch(updateMovieAction(values));
    navigate("/admin/movieManage");
  };

  return (
    movieDetail && (
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        fields={[
          {
            name: ["maPhim"],
            value: movieDetail.maPhim,
          },
          {
            name: ["tenPhim"],
            value: movieDetail.tenPhim,
          },
          {
            name: ["trailer"],
            value: movieDetail.trailer,
          },
          {
            name: ["moTa"],
            value: movieDetail.moTa,
          },
          {
            name: ["dangChieu"],
            value: movieDetail.dangChieu,
          },
          {
            name: ["sapChieu"],
            value: movieDetail.sapChieu,
          },
          {
            name: ["hot"],
            value: movieDetail.hot,
          },
          {
            name: ["danhGia"],
            value: movieDetail.danhGia,
          },
          {
            name: ["ngayKhoiChieu"],
            value: moment(movieDetail.ngayKhoiChieu, "DD/MM/YYYY"),
          },
          // {
          //   name: ["hinhAnh"],
          //   value: movieDetail && movieDetail.hinhAnh,
          // },
        ]}
      >
        {/* MovieID */}
        <Form.Item name="maPhim" className="hidden">
          <InputNumber />
        </Form.Item>

        {/* Movie name input */}
        <Form.Item
          label="Tên Phim"
          name="tenPhim"
          rules={[{ required: true, message: "Nhập tên phim!" }]}
        >
          <Input value="sadasdasd" />
        </Form.Item>

        {/* Traier input */}
        <Form.Item label="Trailer" name="trailer">
          <Input />
        </Form.Item>

        {/* Desc input */}
        <Form.Item label="Mô tả" name="moTa">
          <Input />
        </Form.Item>

        {/* Date picker */}
        <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
          <DatePicker />
        </Form.Item>

        {/* Switches  */}
        <Form.Item name="dangChieu" label="Đang chiếu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="sapChieu" label="Sắp chiếu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="hot" label="Hot" valuePropName="checked">
          <Switch />
        </Form.Item>

        {/* Rating input */}
        <Form.Item name="danhGia" label="Đánh giá">
          <Rate count={10} />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={getFile}
        >
          <Upload name="hinhAnh" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  );
};
export default MovieEdit;
