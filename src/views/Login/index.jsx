import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import ForgetForm from "./ForgetForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  const activeForm = useSelector((state) => state.login.activeForm);

  return (() => {
    switch (activeForm) {
      case "login":
        return <LoginForm />;
      case "forget":
        return <ForgetForm />;
      case "register":
        return <RegisterForm />;
    }
  })();
}
