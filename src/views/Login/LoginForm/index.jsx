import React from "react";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateActive, saveLogin } from "../../../redux/reducers/loginSlice";
import "./index.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const [loginFrom] = Form.useForm();

  async function vilLogin() {
    try {
      const values = await loginFrom.validateFields();
      dispatch(saveLogin(values));
      messageApi.open({
        type: "success",
        content: "登录成功",
      });
    } catch (errorInfo) {
      
    }
  }

  function toRegister() {
    dispatch(updateActive("register"));
  }

  function forget() {
    dispatch(updateActive("forget"));
  }

  return (
    <div className="form">
      {contextHolder}
      <Form
        name="login"
        className="form-body login-form"
        form={loginFrom}
        initialValues={{
          remember: true,
        }}
      >
        <p>登录</p>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            {
              pattern: /^[0-9a-zA-Z]{1,6}$/g,
              message: "用户名不超过6位,仅可包含数组与英文字母",
            },
          ]}
        >
          <Input
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?+-_=()^#~`.&])[A-Za-z\d$@$!%*?+-_=()^#~`.&]{6,}$/g,
              message: "密码不少于8位必须包含大小写字母、数字、特殊字符",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "300px" }}
            onClick={vilLogin}
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="form-footer">
            <div>
              <Button type="link" onClick={forget}>
                忘记密码
              </Button>
            </div>
            <div>
              <span>没有账号？</span>
              <Button type="link" style={{ padding: 0 }} onClick={toRegister}>
                快速注册
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
