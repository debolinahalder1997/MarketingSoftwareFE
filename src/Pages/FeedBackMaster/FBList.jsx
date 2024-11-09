import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Row, Col, Container } from "react-bootstrap";

import "../../GlobalStyle/GlobalTheme.css";
import "./fb.css";

import useFetchFeedBack from "../../Custom_Hooks/useFetchFeedBack";

function FBList() {
  const [FBid, setFBid] = useState([]);
  const FBCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "Vounum", headerName: "Vounum", width: 90 },
    { field: "Id_Name", headerName: "Customer", width: 90 },
    { field: "Custstatus", headerName: "CustStatus", width: 450 },
    { field: "remarks", headerName: "Remarks", width: 100 },
    { field: "Voudate", headerName: "Voudate", width: 100 },
    { field: "Actiondate", headerName: "ActionDate", width: 120 },
    { field: "STATUS", headerName: "Status", width: 80 },
    { field: "ID_USER", headerName: "ID_USER", width: 120 },
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const { fblist, isloading10 } = useFetchFeedBack(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );
  const onChangeHandler = (pid) => {
    setFBid(pid);
  };
  return (
    <Container className="base-container" fluid>
      <Row className="inner-container">
        <Col xs={12}>
          <h5 className="title_container mt-2">FeedBack List</h5>
          <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
        </Col>
        <Col
          xs={12}
          style={{ height: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          <ReusableDataGrid
            col={FBCol}
            row={fblist}
            id={FBid}
            onChangeRow={(id) => {
              onChangeHandler(id);
            }}
            loading={isloading10}
            uniquekey={"id"}
            DataGridHeight={"400px"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default FBList;
