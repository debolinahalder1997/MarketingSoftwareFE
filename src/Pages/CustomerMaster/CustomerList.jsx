import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Row, Col } from "react-bootstrap";
import useFetchCustomer from "../../Custom_Hooks/useFetchCustomer";
import "../../GlobalStyle/GlobalTheme.css";
import "./Cust.css";

function CustomerList() {
  const [cid, setCustId] = useState([]);
  const custCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "CoName", headerName: "Customer Name", width: 250 },
    { field: "Mobile", headerName: "Mobile No", width: 110 },
    { field: "PhNo", headerName: "Phone No", width: 110 },
    { field: "EMAIL", headerName: "EMAIL", width: 150 },
    { field: "Address", headerName: "Address", width: 280 },
    { field: "Remarks", headerName: "Remarks", width: 200 },
    { field: "id_state", headerName: "State", width: 80 },
    { field: "id_city", headerName: "City", width: 80 },
    { field: "COUNTRY", headerName: "Country", width: 100 },
    { field: "ID_Vendor", headerName: "Industries", width: 80 },
    { field: "ID_Vendor1", headerName: "Agent", width: 80 },
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const { CustomerList, isCustListLoading } = useFetchCustomer(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );
  const onChangeHandler = (pid) => {
    setCustId(pid);
  };
  return (
    <Row
      style={{ height: "78%", marginLeft: "40px", marginTop: 0 }}
      className="justify-content-center px-md-3 px-sm-3 px-xs-1"
    >
      <Col xs={12} style={{ height: "fit-content" }}>
        <div className="mt-2">
          <h5 className="title_container mt-2">Customer List</h5>
          <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
        </div>
      </Col>
      <Col
        xs={12}
        style={{ height: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <ReusableDataGrid
          col={custCol}
          row={CustomerList}
          id={cid}
          onChangeRow={(id) => {
            onChangeHandler(id);
          }}
          loading={isCustListLoading}
          uniquekey={"ID"}
          DataGridHeight={"400px"}
        />
      </Col>
    </Row>
  );
}

export default CustomerList;
