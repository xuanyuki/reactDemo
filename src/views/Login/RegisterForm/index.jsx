import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { updateActive, saveRegister } from "../../../redux/reducers/loginSlice";
import "./index.css";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [registerFrom] = Form.useForm();

  function forget() {
    dispatch(updateActive("forget"));
  }

  function toLogin() {
    dispatch(updateActive("login"));
  }

  async function submit() {
    try {
      const values = await forgetForm.validateFields();
      if (code === "123456") {
        dispatch(saveRegister(values));
        messageApi.open({
          type: "success",
          content: "注册成功",
        });
      } else {
        messageApi.open({
          type: "warning",
          content: "验证码错误",
        });
        return;
      }
    } catch (errorInfo) {
      
    }
  }

  return (
    <div className="form">
      {contextHolder}
      <Form
        name="register"
        className="form-body register-form"
        form={registerFrom}
        initialValues={{
          remember: true,
        }}
      >
        <p>用户注册</p>
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
          name="phoneNum"
          rules={[
            { required: true, message: "请输入手机号" },
            {
              pattern: /^1(3|4|6|7|5|8|9)([0-9]{9})$/g,
              message: "无效手机号码",
            },
          ]}
        >
          <Input
            placeholder="请输入手机号"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        <div className="code-box">
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "请输入验证码" },
              {
                pattern: /^\d{6}$/g,
                message: "验证码为六位数字",
              },
            ]}
          >
            <Input
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "175px" }}
            />
          </Form.Item>
          <Button type="primary" disabled={phoneNum.length === 0}>
            获取验证码
          </Button>
        </div>
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
            onClick={submit}
            htmlType="submit"
          >
            立即注册
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
              <span>已有账号？</span>
              <Button type="link" style={{ padding: 0 }} onClick={toLogin}>
                马上登录
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
