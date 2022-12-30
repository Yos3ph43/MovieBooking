import React from "react";
import { Button, DatePicker, Form, Input, Rate, Switch } from "antd";
import { useDispatch } from "react-redux";
import { creatMovieAction } from "../redux/action";
import moment from "moment";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const AddMovie = () => {
  const dispatch = useDispatch();

  const [movieImg, setMovieImg] = useState("");
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      maNhom: "GP10",
      hinhAnh: {},
    },
    onSubmit: (values) => {
      console.log("value:", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("hinhAnh", values.hinhAnh);
        }
        console.log(`${key}:`, formData.get(key));
      }
      dispatch(creatMovieAction(formData));
    },
  });
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setMovieImg(e.target.result);
      };
    }
  };
  const handleChangeDatePicker = (value) => {
    formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
  };
  const handleChangeSwitches = (name) => (value) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Form
      //   form={form}`
      name="validate_other"
      {...formItemLayout}
      onSubmitCapture={formik.handleSubmit}
    >
      {/* Movie name input */}
      <Form.Item label="Tên Phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>

      {/* Traier input */}
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>

      {/* Desc input */}
      <Form.Item label="Mô tả">
        <TextArea name="moTa" onChange={formik.handleChange} />
      </Form.Item>

      {/* Date picker */}
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>

      {/* Switches  */}
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitches("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitches("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitches("hot")} />
      </Form.Item>

      {/* Rating input */}
      <Form.Item label="Đánh giá">
        <Rate count={10} onChange={handleChangeSwitches("danhGia")} />
      </Form.Item>

      <Form.Item label="Upload">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/jpeg, image/png, image/gif"
        />
        <img alt="" src={movieImg} className="w-40 mt-5 rounded" />
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
export default AddMovie;
