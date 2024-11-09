import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "../../GlobalStyle/GlobalTheme.css";
import "./login.css";

import ImgLogo from "../../Asset/nimbussystems_logo.jfif";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox";

import { authenticate } from "../../Slice/AuthSlice";

import PhnoValidation from "../../Validators/PhnoValidation";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  //states
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    uniqueId: null,
    Password: null,
  });

  useEffect(() => {
    if (isSuccess && !isloading && !isError) {
      // toast.success(userInfo?.msg, { autoClose: 6000, position: "top-right" });
      if (userInfo?.details?.Utype === 1) {
        navigate("/auth");
      } else {
        navigate("/auth/customer");
      }
    } else if (isError && !isloading && !isSuccess) {
      toast.error(error, { autoClose: 6000, position: "top-right" });
    }
  }, [userInfo?.details?.Utype !== undefined]);

  //functions
  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let string = value.trim();
    setData({ ...data, [key]: string });
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    dispatch(authenticate(data));
  };
  console.log("hi");

  return (
    <Form
      className="form_wrapper px-4"
      style={{ width: "380px", height: "380px" }}
    >
      <ToastContainer />
      <Row className="justify-content-center align-items-center px-2">
        <Col xs={12} className="title_container">
          <img src={ImgLogo} width="15%" />
          <p className="my-0 fs-5 fw-normal color-header">Login Here</p>
        </Col>
        <Col xs={12} className="py-4">
          <InputBox
            Icon={<i className="bi bi-person fs-5"></i>}
            type={"text"}
            value={data?.uniqueId || ""}
            label={"uniqueId"}
            placeholder={"uniqueId"}
            onChange={InputHandler}
            Name={"uniqueId"}
            error={false}
            errorMsg={""}
            maxlen={10}
          />
        </Col>
        <Col xs={12} className="pb-3">
          <InputBox
            Icon={<i className="bi bi-key fs-5"></i>}
            type={showPass ? "text" : "password"}
            label={"Password"}
            value={data?.Password || ""}
            placeholder={"Password"}
            onChange={InputHandler}
            Name={"Password"}
            error={false}
            errorMsg={""}
            maxlen={8}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className="d-flex justify-content-md-start justify-content-center"
        >
          <CheckBox
            Label={"Show Password"}
            onChange={(e) => {
              setShowPass(!showPass);
            }}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className="d-flex justify-content-md-end justify-content-center"
        >
          <a href="#" style={{ fontSize: "12px" }}>
            Forgot password ?
          </a>
        </Col>
        <Col xs={12} className="mt-4">
          <SubmitButton
            OnClickBtn={SubmitHandler}
            type={"submit"}
            isdisable={!(data?.uniqueId && data?.Password)}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
