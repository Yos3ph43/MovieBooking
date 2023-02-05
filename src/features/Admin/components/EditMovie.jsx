import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input, Rate, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail, updateMovieAction } from "../redux/action";
import moment from "moment";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const EditMovie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetail(params.id));
  }, [params.id]);

  let item = useSelector((state) => state.admin.movieDetail);
  const [movieImg, setMovieImg] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: item?.maPhim,
      tenPhim: item?.tenPhim,
      trailer: item?.trailer,
      moTa: item?.moTa,
      ngayKhoiChieu: item?.ngayKhoiChieu,
      dangChieu: item?.dangChieu,
      sapChieu: item?.sapChieu,
      hot: item?.hot,
      danhGia: item?.danhGia,
      maNhom: item?.maNhom,
      hinhAnh: null,
    },

    onSubmit: async (values) => {
      // console.log("value:", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null)
            formData.append("hinhAnh", values.hinhAnh);
        }
        // console.log(`${key}:`, formData.get(key));
      }
      await dispatch(updateMovieAction(formData));
      navigate("/admin/movieManage");
    },
  });
  const date = `${formik.values.ngayKhoiChieu}`;
  const dateTrim = date.slice(0, 10);
  if (dateTrim !== undefined) console.log(dateTrim);

  const handleChangeFile = async (e) => {
    let file = e.target.files[0] || {};
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setMovieImg(e.target.result);
      };
    }
  };

  const handleChangeDatePicker = (value) => {
    // console.log(value);
    // if (!value) return;
    // let date = value.format("DD/MM/YYYY");
    // console.log(date);
    // formik.setFieldValue("ngayKhoiChieu", date);

    formik.setFieldValue("ngayKhoiChieu", value.format("DD/MM/YYYY"));
  };

  const handleChangeSwitches = (name) => (value) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onSubmitCapture={formik.handleSubmit}
    >
      {/* Movie name input */}
      <Form.Item label="Tên Phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>

      {/* Traier input */}
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>

      {/* Desc input */}
      <Form.Item label="Mô tả">
        <TextArea
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>

      {/* Date picker */}
      <Form.Item name="ngayKhoiChieu" label="Ngày khởi chiếu">
        <DatePicker
          defaultValue={dayjs(formik.values.ngayKhoiChieu)}
          onChange={handleChangeDatePicker}
          format="DD/MM/YYYY"
        />
      </Form.Item>

      {/* Switches  */}
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitches("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitches("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitches("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>

      {/* Rating input */}
      <Form.Item label="Đánh giá">
        <Rate
          count={10}
          onChange={handleChangeSwitches("danhGia")}
          value={formik.values.danhGia}
        />
      </Form.Item>

      <Form.Item label="Upload">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/jpeg, image/png, image/gif"
        />
        <img
          alt=""
          src={movieImg === "" ? item?.hinhAnh : movieImg}
          className="w-40 mt-5 rounded"
        />
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
export default EditMovie;
