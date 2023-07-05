import React from "react";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import "./index.css";
import { updateActive, saveForget } from "../../../redux/reducers/loginSlice";

export default function ForgetForm() {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [phoneNum, setPhoneNum] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");

  const [forgetForm] = Form.useForm();

  async function submit() {
    try {
      const values = await forgetForm.validateFields();
      if (code === "123456") {
        dispatch(saveForget(values));
        messageApi.open({
          type: "success",
          content: "密码找回成功",
        });
      }
      else {
        messageApi.open({
          type: "warning",
          content: "验证码错误",
        });
        return;
      }
    } catch (errorInfo) {
      
    }
  }

  function toRegister() {
    dispatch(updateActive("register"));
  }

  function toLogin() {
    dispatch(updateActive("login"));
  }

  return (
    <div className="form">
      {contextHolder}
      <Form
        name="forget"
        className="form-body forget-form"
        form={forgetForm}
        initialValues={{
          remember: true,
        }}
      >
        <p>找回密码</p>
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
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入新密码" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?+-_=()^#~`.&])[A-Za-z\d$@$!%*?+-_=()^#~`.&]{6,}$/g,
              message: "密码不少于8位必须包含大小写字母、数字、特殊字符",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入新密码"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        <Form.Item>
          <Button
            type="primary"
            style={{ width: "300px" }}
            onClick={submit}
            htmlType="submit"
          >
            确定
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="form-footer">
            <div>
              <Button type="link" onClick={toLogin}>
                立即登录
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
