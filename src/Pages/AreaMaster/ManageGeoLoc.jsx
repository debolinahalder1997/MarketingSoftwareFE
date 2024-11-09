import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Container, Button } from "react-bootstrap";
import moment from "moment/moment";
import InputBox from "../../Component/InputBox";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";
import locmap from "../../Asset/locmap.png";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import useFetchCountry from "../../Custom_Hooks/useFetchCountry";
import { useSelector } from "react-redux";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { AddCountryFunc } from "../../Slice/AddCountrySlice";
function ManageGeoLoc() {
  const [data, setdata] = useState({ Country: null });
  const dispatch = useDispatch();
  const [contryId, setContryId] = useState([]);
  const navigate = useNavigate();
  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);
  const { CountryListData } = useFetchCountry({
    CompanyCode: userInfo?.details?.CompanyCode,
  });
  const InputHandler = (e) => {
    let value = e?.target?.value;
    let key = e?.targer?.name;
    setdata({ ...data, [key]: value });
  };
  const SubmitHandler = (e) => {
    dispatch(
      AddCountryFunc({ CompanyCode: userInfo?.details?.CompanyCode, ...data })
    );
  };
  const countryCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "Country_name", headerName: "Country", width: 200 },
  ];
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <h5 className="ms-5 mt-2">Geo Location Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          <span>Show States</span>
          <button
            className="btn btn-link"
            onClick={() => {
              navigate("/auth/state", { state: contryId[0] });
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "grey" }}
            />
          </button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <hr style={{ marginTop: 1, marginBottom: 1 }} />
        </Col>
        <Col xs={12} sm={12} md={7} lg={7} xl={7}>
          <Row className="ps-5">
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-5 my-4">
                <InputBox
                  Icon={<i class="bi bi-globe-americas"></i>}
                  type={"text"}
                  Name={"Country"}
                  error={false}
                  isdisable={false}
                  label={"Country"}
                  maxlen={50}
                  value={data?.Country}
                  placeholder={"Enter Country Name"}
                  onChange={InputHandler}
                  SearchButton={true}
                  SearchHandler={SubmitHandler}
                  SearchIcon={<i class="bi bi-plus-lg"></i>}
                  key={1}
                />
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-3 my-4">
                <InputBox
                  Icon={<i class="bi bi-calendar"></i>}
                  type={"date"}
                  Name={"Date"}
                  error={false}
                  isdisable={true}
                  label={"Date"}
                  maxlen={50}
                  value={currdate.format("YYYY-MM-DD")}
                  placeholder={"Date"}
                  key={5}
                />{" "}
              </div>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-2">
              <ReusableDataGrid
                row={CountryListData}
                col={countryCol}
                id={contryId}
                onChangeRow={(id) => {
                  setContryId([id]);
                }}
                uniquekey={"ID"}
                loading={false}
                DataGridHeight={360}
                checkSelect={1}
                key={2}
                width={"100%"}
              />{" "}
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5}>
          <div className="d-flex justify-content-center align-items-center">
            <img src={locmap} alt="pic" width={"85%"} />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageGeoLoc;
