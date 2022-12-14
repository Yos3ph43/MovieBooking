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

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const MovieEdit = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetail(props.movieId));
  }, [props.movieId]);
  let movieDetail = useSelector((state) => state.admin.movieDetail);
  if (!props.movieId) movieDetail = null;
  //submit
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      fields={[
        {
          name: ["maPhim"],
          value: movieDetail && movieDetail.maPhim,
        },
        {
          name: ["tenPhim"],
          value: movieDetail && movieDetail.tenPhim,
        },
        {
          name: ["trailer"],
          value: movieDetail && movieDetail.trailer,
        },
        {
          name: ["moTa"],
          value: movieDetail && movieDetail.moTa,
        },
        {
          name: ["dangChieu"],
          value: movieDetail && movieDetail.dangChieu,
        },
        {
          name: ["sapChieu"],
          value: movieDetail && movieDetail.sapChieu,
        },
        {
          name: ["hot"],
          value: movieDetail && movieDetail.hot,
        },
        {
          name: ["danhGia"],
          value: movieDetail && movieDetail.danhGia,
        },
        {
          name: ["hinhAnh"],
          value: movieDetail && movieDetail.hinhAnh,
        },
        {
          name: ["ngayKhoiChieu"],
          value: movieDetail && moment(movieDetail.ngayKhoiChieu),
        },
      ]}
    >
      {/* MovieID */}
      <Form.Item name="maPhim" className="hidden">
        <InputNumber />
      </Form.Item>

      {/* Movie name input */}
      <Form.Item
        label="T??n Phim"
        name="tenPhim"
        rules={[{ required: true, message: "Nh???p t??n phim!" }]}
      >
        <Input value="sadasdasd" />
      </Form.Item>

      {/* Traier input */}
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>

      {/* Desc input */}
      <Form.Item label="M?? t???" name="moTa">
        <Input />
      </Form.Item>

      {/* Date picker */}
      <Form.Item label="Ng??y kh???i chi???u" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>

      {/* Switches  */}
      <Form.Item name="dangChieu" label="??ang chi???u" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="sapChieu" label="S???p chi???u" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="hot" label="Hot" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Rating input */}
      <Form.Item name="danhGia" label="????nh gi??">
        <Rate count={10} />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        // extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload
          name="hinhAnh"
          action="/upload.do"
          listType="picture"
          // defaultFileList={[
          //   {
          //     name: movieDetail && movieDetail.hinhAnh,
          //     url: movieDetail && movieDetail.hinhAnh,
          //   },
          // ]}
        >
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
  );
};
export default MovieEdit;
