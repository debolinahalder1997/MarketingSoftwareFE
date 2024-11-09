import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReusableModal from "../../Component/Modal";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import InputBox from "../../Component/InputBox/index.jsx";
import ResetButton from "../../Component/ResetButton/index.jsx";
import SubmitButton from "../../Component/SubmitButton/index.jsx";
import SelectOption from "../../Component/SelectOption/index.jsx";
import MultipleSelection from "../../Component/MultipleSelection";

import "./Cust.css";
import "../../Component/InputBox/InputBox.css";
import "../../GlobalStyle/GlobalTheme.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AreaData from "../../mock-data/Area.js";
import BSize from "../../mock-data/BSize.js";
import statusData from "../../mock-data/Status.js";
import FilterData from "../../mock-data/UserData.js";

import EmailValidation from "../../Validators/EmailValidation.js";
import {
  CustRegClearState,
  CustRegFunc,
} from "../../Slice/CustomerRegSlice.js";

function CustomerMaster() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isCustRegLoding,
    CustRegSuccessMsg,
    CustRegErrorMsg,
    isCustRegErrorMsg,
    isCustRegSuccess,
  } = useSelector((state) => state.custadd);
  const { userInfo } = useSelector((state) => state.auth);
  //hook to upload
  const [custData, setCustData] = useState({
    id_country: null,
    id_state: null,
    id_city: null,
    id_area: null,
    Area: null,
    CoName: null,
    PhNo: null,
    Mobile: null,
    PinCode: null,
    Contact_Name: null,
    ADDRESS: null,
    Remarks: null,
    REFNAME: null,
    ID_Vendor: null,
    ID_Vendor1: null,
    sold: 0,
    Garbage: 0,
  });
  //modal controler hook
  const [show, setShow] = useState({
    Area: false,
    Country: false,
    State: false,
    Country: false,
  });
  //id picker
  const [rid, setRid] = useState({
    id_area: null,
    id_country: null,
    id_city: null,
    id_state: null,
  });
  //validator
  const [inputVal, setInputVal] = useState({
    EmailId: true,
    PhNo: true,
    PinCode: true,
    Mobile: true,
  });

  //business
  let SelectBSizeList = useMemo(() => {
    if (!BSize) return [];
    let arr = [];
    arr.push({ Name: "---Select Business Size---", Value: 0 });
    let arr1 = BSize.map((item) => ({
      Name: item?.BusinessSize,
      Value: item?.Size_ID,
    }));
    return [...arr, ...arr1];
  }, [BSize]);

  //filter
  let SelectFilterList = useMemo(() => {
    if (!FilterData) return [];
    let arr = [];
    arr.push({ Name: "---Select Vendor--", Value: 0 });
    let arr1 = FilterData.map((item) => ({
      Name: item?.UserName,
      Value: item?.["User ID"],
    }));
    return [...arr, ...arr1];
  }, [FilterData]);

  //country
  let SelectCountryList = useMemo(() => {
    if (!AreaData) return [];
    let arr = [];
    arr.push({ Name: "---Select Country--", Value: 0 });
    let arr1 = AreaData.map((item) => ({
      Name: item?.Area,
      Value: item?.["Id_Area"],
    }));
    return [...arr, ...arr1];
  }, [AreaData]);

  //state list
  let SelectStateList = useMemo(() => {
    if (!AreaData) return [];
    let arr = [];
    arr.push({ Name: "---Select State--", Value: 0 });
    let arr1 = AreaData.map((item) => ({
      Name: item?.Area,
      Value: item?.["Id_Area"],
    }));
    return [...arr, ...arr1];
  }, [AreaData]);

  //city
  let SelectCityList = useMemo(() => {
    if (!AreaData) return [];
    let arr = [];
    arr.push({ Name: "---Select City--", Value: 0 });
    let arr1 = AreaData.map((item) => ({
      Name: item?.Area,
      Value: item?.["Id_Area"],
    }));
    return [...arr, ...arr1];
  }, [AreaData]);

  //toaster
  useEffect(() => {
    if (isCustRegSuccess && !isCustRegErrorMsg & !isCustRegLoding) {
      toast.success(CustRegSuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setCustData({
        id_country: null,
        id_state: null,
        id_city: null,
        id_area: null,
        Area: null,
        CoName: null,
        PhNo: null,
        Mobile: null,
        PinCode: null,
        Contact_Name: null,
        ADDRESS: null,
        Remarks: null,
        REFNAME: null,
        ID_Vendor: null,
        ID_Vendor1: null,
        sold: null,
        Garbage: null,
      });
      dispatch(CustRegClearState());
    }
    if (isCustRegErrorMsg && !isCustRegSuccess && !isCustRegLoding) {
      toast.error(CustRegErrorMsg, { autoClose: 6000, position: "top-right" });
    }
  }, [isCustRegErrorMsg, isCustRegSuccess, isCustRegLoding]);

  //input loader
  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    setCustData({ ...custData, [key]: value });
  };
  //submiter
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(custData);
    dispatch(
      CustRegFunc({
        ...custData,
        CompanyCode: userInfo?.details?.CompanyCode,
      })
    );
  };
  //modal close
  const handleClose = () => {
    setShow({ area: false });
  };
  //modal open
  const HandleOpen = (args) => {
    console.log(args, "hi");
    setShow({ ...show, [`${args}`]: true });
  };
  //multiple selection handler
  const SelectHandler1 = (e) => {
    let value = e.target.value;
    let AllValue = statusData?.map((i) => i?.id_Status);

    if (value === "all") {
      if (custData?.Status?.length === AllValue?.length) {
        setCustData({ ...custData, Status: [] });
      } else {
        setCustData({ ...custData, Status: AllValue });
      }
    } else {
      value = Number(value);
      let arr = custData?.Status || [];
      if (arr !== 0 && arr?.includes(value)) {
        arr = arr.filter((item) => item !== value);
      } else {
        arr.push(Number(value));
      }
      setCustData({ ...custData, Status: arr });
    }
  };
  //column name of area
  const areaCol = [
    { field: "Id_Area", headerName: "Area ID", width: 100 },
    { field: "Area", headerName: "Area Name", width: 120 },
    { field: "SubArea", headerName: "SubArea", width: 120 },
  ];
  return (
    <Container
      fluid
      className="body-height"
      style={{ marginLeft: "40px", width: "auto" }}
    >
      <ToastContainer />
      <div className="ms-4">
        <div className="d-flex justify-content-between align-items-center m-0 px-3">
          <h5 className="title_container mt-2">Customer Management</h5>
          <button
            className="btn btn-link p-0"
            onClick={() => {
              navigate("/auth/cust-list");
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "25px", color: "grey" }}
            ></i>
          </button>
        </div>

        <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
      </div>
      <Form className="form_wrapper mx-md-5 mx-sm-1 px-md-4 ">
        <Row>
          <Col xs={12}>
            <h6>Customer Form</h6>
            <hr />
          </Col>
          <Col xl={6}>
            <Row>
              <Col md={12}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"Company Name"}
                  label={"Company Name"}
                  value={custData?.CoName || ""}
                  Name={"CoName"}
                  error={false}
                  errorMsg={"Enter Correct Name"}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              {/**Country selector */}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"Country"}
                  SName={"id_country"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_country}
                  Soptions={SelectCountryList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*State Selector*/}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"State"}
                  SName={"id_state"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_state}
                  Soptions={SelectStateList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*City Selector*/}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"City"}
                  SName={"id_city"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_city}
                  Soptions={SelectCityList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*Area*/}
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-geo-alt-fill small-icon"></i>}
                  type={"text"}
                  placeholder={"Area"}
                  label={"Area"}
                  value={custData?.Area || ""}
                  Name={"Area"}
                  error={false}
                  errorMsg={"Enter Correct Area"}
                  maxlen={10}
                  SearchButton={true}
                  SearchHandler={() => {
                    HandleOpen("Area");
                  }}
                />
                <ReusableModal
                  show={show?.Area}
                  SuccessButtonName={"Save"}
                  Title={"Area"}
                  handleClose={handleClose}
                  isSuccess={true}
                  handleSuccess={() => {
                    let obj = (AreaData?.filter(
                      (i) => i?.Id_Area === rid?.id_area
                    ))[0];
                    setCustData({
                      ...custData,
                      id_area: obj?.Id_Area,
                      Area: obj?.Area,
                    });
                    handleClose();
                  }}
                  body={
                    <ReusableDataGrid
                      col={areaCol}
                      row={AreaData}
                      uniquekey={"Id_Area"}
                      id={rid?.Area}
                      onChangeRow={(id) => {
                        setRid({ ...rid, id_area: id });
                      }}
                    />
                  }
                />
              </Col>
              {/*Address*/}
              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="color-label">
                    <i className="bi bi-geo-alt"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Address"
                    name="ADDRESS"
                    value={custData?.ADDRESS || ""}
                    onChange={InputHandler}
                  />
                </InputGroup>
              </Col>

              {/**pincode */}

              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-asterisk"></i>}
                  type={"text"}
                  placeholder={"PinCode"}
                  label={"PinCode"}
                  value={custData?.PinCode || ""}
                  Name={"PinCode"}
                  error={false}
                  errorMsg={"Enter Correct PinCode"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-person small-icon"></i>}
                  type={"text"}
                  placeholder={"Referance Name"}
                  label={"REFNAME"}
                  value={custData?.REFNAME || ""}
                  Name={"REFNAME"}
                  error={false}
                  errorMsg={"Enter Correct REFNAME"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-around align-items-center flex-wrap">
                  <Form.Check
                    type="checkbox"
                    value={custData?.sold == 1 ? 0 : 1}
                    name="sold"
                    label={"Sold"}
                    onChange={InputHandler}
                    style={{
                      marginTop: "1px",
                    }}
                    checked={custData?.sold == 1 ? true : false}
                  />
                  <Form.Check
                    type="checkbox"
                    value={custData?.Garbage == 1 ? 0 : 1}
                    label={"Garbage"}
                    name="Garbage"
                    style={{
                      marginTop: "1px",
                    }}
                    checked={custData?.Garbage == 1 ? true : false}
                    onChange={InputHandler}
                  />
                </div>
              </Col>
            </Row>
          </Col>

          {/**Detail Personel */}
          <Col xl={6}>
            <Row>
              <Col md={6}>
                <MultipleSelection
                  FieldName={"Status"}
                  MName={"Status"}
                  onChange={SelectHandler1}
                  uniqueKey={"id_Status"}
                  data={statusData}
                  State={custData?.Status}
                  StyleInput={{ marginTop: "1px", marginBottom: "15px" }}
                  dataLength={statusData?.length}
                />
              </Col>
              <Col md={6}>
                <SelectOption
                  Soptions={SelectBSizeList}
                  SName={"BusinessSize"}
                  OnSelect={InputHandler}
                  Value={custData?.BusinessSize || 0}
                  PlaceHolder={"--Select Business Size--"}
                  SelectStyle={{
                    height: "28px",
                    marginTop: "1px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-person small-icon"></i>}
                  type={"text"}
                  placeholder={"Contact Name"}
                  label={"Contact Name"}
                  value={custData?.Contact_Name || ""}
                  Name={"Contact_Name"}
                  error={false}
                  errorMsg={"Enter Correct Contact_Name"}
                  maxlen={80}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-envelope small-icon"></i>}
                  type={"email"}
                  placeholder={"EmailId"}
                  label={"EmailId"}
                  value={custData?.EmailId || ""}
                  Name={"EmailId"}
                  error={!inputVal?.EmailId}
                  errorMsg={"Enter Correct Phone Number"}
                  maxlen={50}
                  onChange={(e) => {
                    if (
                      e?.target?.value !== "" &&
                      e?.target?.value !== null &&
                      e?.target?.value !== undefined
                    ) {
                      let res = EmailValidation(e?.target?.value);
                      setInputVal({ ...inputVal, EmailId: res });
                    } else {
                      setInputVal({ ...inputVal, EmailId: true });
                    }
                    InputHandler(e);
                  }}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-phone small-icon"></i>}
                  type={"text"}
                  placeholder={"Mobile Number"}
                  label={"Mobile"}
                  value={custData?.Mobile || ""}
                  Name={"Mobile"}
                  error={false}
                  errorMsg={"Enter Correct Mobile"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>{" "}
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-telephone small-icon"></i>}
                  type={"tel"}
                  placeholder={"Phone Number"}
                  label={"PhNo"}
                  value={custData?.PhNo || ""}
                  Name={"PhNo"}
                  error={false}
                  errorMsg={"Enter Correct Phone"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>{" "}
              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="color-label">
                    <i className="bi bi-pencil-square"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Remarks"
                    name="Remarks"
                    value={custData?.Remarks || ""}
                    onChange={InputHandler}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <SelectOption
                  OnSelect={InputHandler}
                  PlaceHolder={"--Select Industry--"}
                  SName={"ID_Vendor1"}
                  Value={custData?.ID_Vendor1}
                  Soptions={SelectFilterList}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
              <Col md={6}>
                <SelectOption
                  OnSelect={InputHandler}
                  PlaceHolder={"--Select Agent--"}
                  SName={"ID_Vendor"}
                  Value={custData?.ID_Vendor}
                  Soptions={SelectFilterList}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <SubmitButton
              OnClickBtn={SubmitHandler}
              type={"submit"}
              isdisable={
                !(
                  custData?.CoName !== null &&
                  custData?.PhNo !== null &&
                  custData?.Mobile !== null &&
                  custData?.ADDRESS !== null &&
                  custData?.id_area !== null &&
                  custData?.id_city !== null &&
                  custData?.id_state !== null &&
                  custData?.id_country !== null &&
                  custData?.REFNAME !== null &&
                  custData?.ID_Vendor !== null &&
                  custData?.ID_Vendor1 !== null &&
                  custData?.PinCode !== null &&
                  custData?.Remarks !== null
                )
              }
            />
          </Col>
          <Col xs={6}>
            <ResetButton
              type={"reset"}
              onClick={(e) => {
                setCustData({
                  id_country: null,
                  id_state: null,
                  id_city: null,
                  id_area: null,
                  Area: null,
                  CoName: null,
                  PhNo: null,
                  Mobile: null,
                  PinCode: null,
                  Contact_Name: null,
                  ADDRESS: null,
                  Remarks: null,
                  REFNAME: null,
                  ID_Vendor: null,
                  ID_Vendor1: null,
                  sold: null,
                  Garbage: null,
                });
              }}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CustomerMaster;
