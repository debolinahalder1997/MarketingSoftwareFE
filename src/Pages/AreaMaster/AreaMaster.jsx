import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./AreaMaster.css";
import "../../GlobalStyle/GlobalTheme.css";
import "../../Component/InputBox/InputBox.css";

import InputBox from "../../Component/InputBox/index.jsx";
import SubmitButton from "../../Component/SubmitButton/index.jsx";
import ResetButton from "../../Component/ResetButton/index.jsx";
import SelectOption from "../../Component/SelectOption";
import MultipleSelection from "../../Component/MultipleSelection/index.jsx";
import ReusableDataGrid from "../../Component/ReusableDataGrid/index.jsx";
import ReusableModal from "../../Component/Modal/index.jsx";

import WeekDaysData from "../../mock-data/WeekDays.js";
import TimediffChecker from "../../Validators/TimeDiffChecker.js";
import { ClearStateAddArea, addNewArea } from "../../Slice/AddAreaSlice.js";
import mapImg from "../../Asset/map.png";
import AreaData from "../../mock-data/Area.js";

function AreaMaster() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    area: false,
  });
  const [rid, setRid] = useState({
    AreaID: 0,
  });
  const { userInfo } = useSelector((state) => state.auth);

  const {
    isLoadingAddArea,
    addAreaSuccessMsg,
    addAreaErrorMsg,
    isErrorAddArea,
    isAddAreaSuccess,
  } = useSelector((state) => state.addArea);

  const [areaData, setAreaData] = useState({
    Code: null,
    CLSSTATUS: null,
    daystatus: null,
    daystatus1: null,
    othday: null,
    DaysArray: [],
    othsttime: null,
    othentime: null,
    half: 0,
    full: 0,
  });

  const [InputVal, SetInputVal] = useState({
    othsttime: false,
    othentime: false,
  });

  useEffect(() => {
    if (isAddAreaSuccess && !isErrorAddArea & !isLoadingAddArea) {
      toast.success(addAreaSuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setAreaData({
        Code: null,
        CLSSTATUS: null,
        daystatus: null,
        daystatus1: null,
        othday: null,
        othsttime: null,
        othentime: null,
        half: null,
        full: null,
      });
    } else if (isErrorAddArea && !isAddAreaSuccess && !isLoadingAddArea) {
      toast.error(addAreaErrorMsg, { autoClose: 6000, position: "top-right" });
    }
    // dispatch(ClearState1());
  }, [isErrorAddArea, isAddAreaSuccess, isLoadingAddArea]);

  const ZoneList = useMemo(() => {
    let obj = { Name: "---Select Zone---", Value: -1 };
    let arr = [obj];
    AreaData?.map((item) => {
      let obj1 = {};
      obj1.Name = item?.Area;
      obj1.Value = item?.Id_Area;
      arr.push(obj1);
    });
    return arr;
  }, []);

  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    let string = value.trimStart();
    if (key === "Code") {
      string = value.toUpperCase();
      setAreaData({ ...areaData, [key]: string });
    } else {
      setAreaData({ ...areaData, [key]: string });
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    let arr = [...areaData?.DaysArray];
    let mergedString = arr.join(",");
    let { DaysArray, ...resultObj } = areaData;
    resultObj.othday = mergedString;
    resultObj.CompanyCode = userInfo?.details?.CompanyCode;
    console.log(resultObj);
    dispatch(addNewArea(resultObj));
  };

  const SelectHandler1 = (e) => {
    let value = e.target.value;
    let AllValue = WeekDaysData.map((i) => i?.ID_Week);
    if (value === "all") {
      if (areaData?.DaysArray?.length === AllValue?.length) {
        setAreaData({ ...areaData, DaysArray: [] });
      } else {
        setAreaData({ ...areaData, DaysArray: AllValue });
      }
    } else {
      let arr = [...areaData?.DaysArray];
      if (typeof areaData?.DaysArray == "") {
        arr = [...areaData?.DaysArray];
      }
      if (arr?.length !== 0 && arr.includes(value)) {
        arr = arr.filter((item) => item !== value);
      } else {
        arr.push(value);
      }
      setAreaData({ ...areaData, DaysArray: arr });
    }
  };

  return (
    <Container fluid className="bas-container">
      <ToastContainer />
      <Row className="inner-container ps-5">
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <h5 className="title_container text-nowrap">Area Management</h5>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          <span>Detail Table</span>
          <button
            className="btn btn-link"
            onClick={() => {
              navigate("/auth/area-list");
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "grey" }}
            />
          </button>
        </Col>
        <Col md={12}>
          <hr className="my-2" />
        </Col>
        {/**form */}
        <Col xl={6} lg={7} md={12} sm={12} className="px-3">
          <div
            className="d-flex justify-content-center align-item-center"
            style={{ height: "100%" }}
          >
            <Form className="form_wrapper">
              <Row className="area-row">
                <Col xl={12}>
                  <h6>Area form</h6>
                  <hr />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <Form.Check
                      type="checkbox"
                      id="HalfDay"
                      label="Half Day"
                      name="half"
                      value={areaData?.half === 1 ? 0 : 1}
                      onChange={InputHandler}
                    />
                    <Form.Check
                      type="checkbox"
                      id="FullDay"
                      label="Full Day"
                      name="full"
                      value={areaData?.full === 1 ? 0 : 1}
                      onChange={InputHandler}
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <MultipleSelection
                    data={WeekDaysData}
                    MName="WeekDay"
                    uniqueKey="ID_Week"
                    FieldName="Days"
                    State={areaData?.DaysArray}
                    onChange={SelectHandler1}
                    StyleInput={{ marginBottom: "15px", marginTop: "8px" }}
                    dataLength={WeekDaysData?.length}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} className="mb-2">
                  <label>Start time:</label>
                  <InputBox
                    Icon={<i className="bi bi-alarm" />}
                    type="time"
                    placeholder="Start Time"
                    label="Start Time"
                    Name="othsttime"
                    value={areaData?.othsttime || ""}
                    error={false}
                    errorMsg="enter Correct Closing Time"
                    onChange={InputHandler}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} className="mb-2">
                  <label>End time:</label>
                  <InputBox
                    Icon={<i className="bi bi-alarm" />}
                    type="time"
                    placeholder="End Time"
                    label="End Time"
                    Name="othentime"
                    value={areaData?.othentime || ""}
                    error={InputVal?.othentime}
                    errorMsg="enter Correct name"
                    onChange={InputHandler}
                    min={areaData?.othentime}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} className="mb-2">
                  <SelectOption
                    OnSelect={InputHandler}
                    PlaceHolder="Zone"
                    SName="Zone"
                    SelectStyle={{ padding: "5px", marginBottom: "10px" }}
                    Value={areaData?.Zone}
                    Soptions={ZoneList}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} className="mb-2">
                  <InputBox
                    Icon={<i className="bi bi-alarm" />}
                    type="text"
                    placeholder="Area Code"
                    label="Area"
                    Name="Code"
                    value={areaData?.Code || ""}
                    error={false}
                    errorMsg="enter Correct Code"
                    onChange={InputHandler}
                    min={areaData?.Code}
                  />
                </Col>
                <Col xs={12} className="mb-2">
                  <InputGroup>
                    <InputGroup.Text className="color-label">
                      <i className="bi bi-journal-text" />
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      name="CLSSTATUS"
                      placeholder="Description"
                      label="Description"
                      value={areaData?.CLSSTATUS || ""}
                      onChange={InputHandler}
                    />
                  </InputGroup>
                </Col>
                <Col xs={6} className="pt-3">
                  <SubmitButton
                    OnClickBtn={SubmitHandler}
                    type="submit"
                    isdisable={
                      !(
                        areaData?.CLSSTATUS &&
                        areaData?.Code &&
                        (areaData?.full || areaData?.half) &&
                        areaData?.DaysArray?.length !== 0 &&
                        areaData?.othentime &&
                        areaData?.othsttime
                      )
                    }
                  />
                </Col>
                <Col xs={6} className="pt-3">
                  <ResetButton
                    type="reset"
                    onClick={() => {
                      setAreaData({
                        EmailId: null,
                        UserName: null,
                        Phonenumber: null,
                        Utype: null,
                        CompanyCode: null,
                        Password: null,
                        LOCID: null,
                        LOGINCODE: null,
                        EndDate: null,
                        Reminder: null,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col xl={6} lg={5} md={12} sm={12} className="vanishing-div">
          <div
            className="d-flex justify-content-center align-item-center"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              src={mapImg}
              alt="user-reg"
              id="area-img-width"
              className="img-fluid"
              width={"100%"}
            />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AreaMaster;
