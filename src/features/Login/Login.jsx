import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "./redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navToSignUp = () => navigate("/signup");
  const handleLogin = async (value) => {
    console.log(value);
    try {
      await dispatch(loginAction(value));
      navigate("/");
    } catch (error) {
      window.alert(error.response.data.content);
    }
  };

  return (
    <div className="container ">
      <div className="flex justify-center mt-10">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          // onFinishFailed={}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="link"
              htmlType="button"
              danger
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have account?
            </Button>
          </Form.Item>
        </Form>

        <div>
          <p>baoadmin</p>
          <p>123123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
