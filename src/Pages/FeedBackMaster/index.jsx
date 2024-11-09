import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../GlobalStyle/GlobalTheme.css";
import "../../Component/InputBox/InputBox.css";

import InputBox from "../../Component/InputBox";
import ReusableModal from "../../Component/Modal";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import custData from "../../mock-data/CustomerData";
import MultipleSelection from "../../Component/MultipleSelection";
import FeedbackOption from "../../mock-data/FeedBackOption";
import SubmitButton from "../../Component/SubmitButton";
import ResetButton from "../../Component/ResetButton";

import { AddFeedBack, ClearStateAddFb } from "../../Slice/AddFeedbackSlice";
import useFetchCustomer from "../../Custom_Hooks/useFetchCustomer";
import feedbackpic from "../../Asset/feedback.png";

function FeedBackMaster() {
  let currDate = moment();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isAddFBLoading,
    AddFbSuccessMsg,
    AddFbErrorMsg,
    isAddFbError,
    isAddFbSuccess,
  } = useSelector((state) => state.fbtrans);
  const [fbData, setFbData] = useState({
    Id_Name: null,
    CoName: null,
    feedBack: [],
    Voudate: currDate,
    Custstatus: null,
    Actiondate: null,
    STATUS: null,
    remarks: null,
    STATUS1: null,
    ID_USER: null,
  });
  const [show, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state?.auth);
  const { CustomerList } = useFetchCustomer({
    CompanyCode: userInfo?.details?.CompanyCode,
  });
  const InputHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFbData({ ...fbData, [key]: value });
  };
  const HandleClose = () => {
    setShow(false);
  };
  const HandleOpen = () => {
    setShow(true);
  };
  const SelectHandler = (e) => {
    let value = e.target.value;
    let AllValue = FeedbackOption.map((i) => i?.id);
    if (value === "all") {
      if (fbData?.feedBack?.length === AllValue?.length) {
        setFbData({ ...fbData, feedBack: [] });
      } else {
        setFbData({ ...fbData, feedBack: AllValue });
      }
    } else {
      let arr = [...fbData?.feedBack];
      console.log("hi", arr, value, arr.includes(value));
      if (arr.length !== 0 && arr.includes(value)) {
        arr = arr.filter((item) => item !== value);
      } else {
        arr.push(value);
      }
      setFbData({ ...fbData, feedBack: arr });
    }
  };
  const ResetHandler = () => {
    setFbData({
      VouNum: null,
      VouDate: null,
      ActionDate: null,
      Company: null,
      Cname: null,
      CustomerStatus: null,
      feedBack: [],
    });
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(fbData);
    let arr = [fbData?.feedBack];
    let mergedString = arr.join(",");
    let { feedBack, ...ob } = fbData;
    ob.remarks = mergedString;
    ob.CompanyCode = userInfo?.details?.CompanyCode;
    console.log(fbData?.feedBack, mergedString);
    dispatch(AddFeedBack(ob));
  };
  const custcol = [
    {
      field: "CoName",
      headerName: "Company Name",
      width: 150,
    },
    {
      field: "	Mobile",
      headerName: "MobileNo",
      width: 150,
    },
    {
      field: "PhNo",
      headerName: "Phone No.",
      width: 150,
    },
    {
      field: "EMAIL",
      headerName: "EmailId",
      width: 150,
    },
    {
      field: "Contact_Name",
      headerName: "ContactPerson",
      width: 150,
    },
    {
      field: "Grade",
      headerName: "Grade",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "REFNAME",
      headerName: "Reference Name",
      width: 150,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "PinCode",
      headerName: "PinNo",
      width: 150,
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      width: 150,
    },
  ];
  useEffect(() => {
    if (isAddFbSuccess && !isAddFBLoading) {
      toast.success(AddFbSuccessMsg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
    if (isAddFbError && !isAddFbError) {
      toast.error(AddFbErrorMsg, { position: "top-right", autoClose: 5000 });
    }
  }, [isAddFBLoading, isAddFbError, isAddFbSuccess]);
  return (
    <Container fluid className="base-container">
      <ToastContainer />
      <Row>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          style={{ height: "fit-content" }}
        >
          <h5 className="title_container text-start text-sm-start ms-5 ps-3 mt-2">
            FeedBack Management
          </h5>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={12}>
          <Button
            variant="link"
            className="btn btn-link float-end float-sm-center"
            onClick={() => {
              navigate("/auth/fb-list");
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "25px", color: "grey" }}
            ></i>
          </Button>
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <hr
            style={{
              margin: 0,
            }}
          />
        </Col>

        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <div
            className="d-flex justify-content-center align-items-center mx-5 me-3 px-3 mt-3"
            style={{ height: "80%" }}
          >
            <Form className="form_wrapper">
              <Row className="area-row">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <h6>Feedback Form</h6>
                  <hr />
                </Col>
                <Col md={12}>
                  <InputBox
                    Icon={<i className="bi bi-building"></i>}
                    SearchButton={true}
                    SearchHandler={HandleOpen}
                    Name={"CoName"}
                    error={false}
                    errorMsg={"false"}
                    label={"CompanyName"}
                    placeholder={"CompanyName"}
                    type={"text"}
                    value={fbData?.CoName || ""}
                  />
                  <ReusableModal
                    show={show}
                    Title={"Company"}
                    handleClose={HandleClose}
                    isPrimary={true}
                    body={
                      <ReusableDataGrid
                        col={custcol}
                        row={CustomerList}
                        id={fbData?.Id_Name || 0}
                        onChangeRow={(id) => {
                          console.log(id);
                          setFbData({
                            ...fbData,
                            Id_Name: id,
                          });
                        }}
                        uniquekey={"ID"}
                      />
                    }
                    handlePrimary={() => {
                      let obj = (CustomerList?.filter(
                        (i) => i?.ID === fbData?.Id_Name
                      ))[0];
                      console.log(obj);

                      setFbData({ ...fbData, CoName: obj?.CoName });
                      HandleClose();
                    }}
                  />
                </Col>
                <Col md={6}>
                  <label>Voucher Date :</label>
                  <InputBox
                    Icon={<i className="bi bi-calendar-event"></i>}
                    // InputStyle={ }
                    Name={"Voudate"}
                    error={false}
                    errorMsg={"false"}
                    label={"Voucher Date"}
                    onChange={InputHandler}
                    placeholder={"Voucher Date"}
                    type={"date"}
                    value={moment(fbData?.Voudate).format("YYYY-MM-DD")}
                  />
                </Col>
                <Col md={6}>
                  <label>Action Date :</label>
                  <InputBox
                    Icon={<i className="bi bi-calendar-check"></i>}
                    //  InputStyle={}
                    Name={"Actiondate"}
                    error={false}
                    errorMsg={"false"}
                    label={"ActionDate"}
                    onChange={InputHandler}
                    placeholder={"Action Date"}
                    type={"date"}
                    value={fbData?.Actiondate}
                  />
                </Col>
                <Col md={12} className="mt-2">
                  <label>feedBack:</label>
                  <MultipleSelection
                    FieldName={"FeedBack"}
                    MName={"Feedback"}
                    State={fbData?.feedBack}
                    data={FeedbackOption}
                    onChange={SelectHandler}
                    uniqueKey={"id"}
                    dataLength={FeedbackOption?.length}
                    StyleInput={{ marginBottom: "20px", marginTop: "5px" }}
                  />
                </Col>
                <Col md={12} className="mt-2">
                  <InputGroup>
                    <InputGroup.Text className="color-label">
                      <i className="bi bi-pencil-square"></i>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      value={fbData?.Custstatus}
                      onChange={InputHandler}
                      placeholder="Customer Status"
                      name="Custstatus"
                    />
                  </InputGroup>
                </Col>
                <Col xs={6} className="pt-4">
                  <SubmitButton
                    ButtonNm={"Submit"}
                    OnClickBtn={SubmitHandler}
                    type={"Submit"}
                    isdisable={false}
                  />
                </Col>
                <Col xs={6} className="pt-4">
                  <ResetButton
                    Buttonname={"reset"}
                    onClick={ResetHandler}
                    type={"reset"}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="vanising-div">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={feedbackpic}
              alt="user-reg"
              className="img-fluid"
              width={"72%"}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FeedBackMaster;
