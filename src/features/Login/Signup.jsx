import { Button, Input, Form } from "antd";
import React from "react";

const Signup = () => {
  const handleAddMember = (value) => {
    console.log(value);
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
          onFinish={handleAddMember}
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="...@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="soDt"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* group number hidden  */}
          <Form.Item
            hidden="false"
            label="Group number"
            name="maNhom"
            initialValue="GP10"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
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
        </Form>
        <div>
          <p>duc3636</p>
          <p>nguyen1</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
