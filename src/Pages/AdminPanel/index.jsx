import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Container, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Admin.css";

import DateDiffChecker from "../../Validators/DateDiffChecker";

import ReusableDataGrid from "../../Component/ReusableDataGrid";
import DateRangeInput from "../../Component/DateRangeInput";
import SelectOption from "../../Component/SelectOption";

import useFetchCompany from "../../Custom_Hooks/useFetchCompany";
import { getAllAdmin, ClearStateAdmin } from "../../Slice/AdminSlice";

function AdminPanel() {
  const cdate = moment().format("YYYY-MM-DD");
  const [adminData, setAdminData] = useState([]);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isAdminLoading, Admin, ErrorAdmin, isErrorAdmin, isAdminSuccess } =
    useSelector((state) => state.admin);

  const { CompList = [] } = useFetchCompany({
    CompanyCode: userInfo?.details?.CompanyCode,
  });
  useEffect(() => {
    dispatch(getAllAdmin({ CompanyCode: userInfo?.details?.CompanyCode }));
  }, []);
  useEffect(() => {
    if (isAdminSuccess && Admin && Admin?.length !== 0 && !isAdminLoading) {
      setAdminData(Admin);
    }
  }, [isErrorAdmin, isAdminSuccess]);
  const [id, setID] = useState([]);
  const [filteredData, setFilteredData] = useState({
    StartDate: null,
    EndDate: null,
    Status: null,
  });

  let option1 = [{ Value: -1, Name: "--Select Column--" }];
  if (CompList.length !== 0) {
    let arr = Object.keys(CompList[0]).reduce((acc, key) => {
      if (typeof CompList[0][key] === "number") {
        acc.push({ Name: key, Value: key });
      }
      return acc;
    }, []);
    option1 = [...option1, ...arr];
  }

  useEffect(() => {}, []);

  const onChangeHandler = (pid) => {
    let iniarr = [...id, ...pid];
    const myset = new Set([...iniarr]);
    let arr = Array.from(myset);
    setID(arr);
  };
  // const ShortByFunc = (e) => {
  //   e.preventDefault();
  //   let Array1 = UserList;
  //   if (data?.Order === "Desc") {
  //     Array1.sort((a, b) => b[data?.Column] - a[data?.Column]);
  //   } else if (data?.Order === "Asc") {
  //     Array1.sort((a, b) => a[data?.Column] - b[data?.Column]);
  //   }
  //   console.log(data?.Column, data?.Order, Array1);
  //   setTab([...Array1]);
  // };
  // const SearchFunction = (e) => {
  //   e.preventDefault();
  //   let SearchData = [];
  //   if (
  //     e?.target?.value === "" ||
  //     e?.target?.value === null ||
  //     e?.target?.value === undefined
  //   ) {
  //     setFilteredData(tab);
  //   } else {
  //     tab.map((item) => {
  //       let flag = false;
  //       let keyArray = Object.keys(item);
  //       for (let key = 0; key <= keyArray.length - 1; key++) {
  //         let text = `${item[`${keyArray[key]}`]}`.toUpperCase();
  //         let inputstring = `${data?.search}`.toUpperCase();
  //         let isin = text?.includes(inputstring);
  //         if (isin) {
  //           flag = true;
  //           break;
  //         }
  //       }
  //       if (flag === true) {
  //         SearchData.push(item);
  //       }
  //     });
  //     setFilteredData(SearchData);
  //   }
  // };
  // const UpdateTable = (index, e) => {
  //   let SearchData = [];
  //   let mainArray = [...filteredData];
  //   let newobj = { ...mainArray[index] };
  //   let key = e.target.name;
  //   let value = e.target.value;
  //   newobj[key] = value;
  //   mainArray[index] = newobj;
  //   setFilteredData(mainArray);
  // };
  // const SaveChange = (obj, e) => {
  //   e.preventDefault();
  //   let filterTableIds = filteredData?.map((item) => item?.["User ID"]);
  //   let unchangedData = tab?.filter(
  //     (obj) => !filterTableIds.includes(obj?.["User ID"])
  //   );
  //   let array = [...unchangedData, ...filteredData];
  //   let shortedarray = array.sort((a, b) => a?.["User ID"] - b?.["User ID"]);
  //   setTab(shortedarray);
  //   SetActionId(null);
  //   SetActionId(null);
  //   console.log(obj);
  //   dispatch(UserEditFunc(obj));
  // };
  // useEffect(() => {
  //   setTab(UserList);
  //   setFilteredData(UserList);
  // }, [UserList]);
  // useEffect(() => {
  //   if (isSuccess17 && !isloading17) {
  //     toast.success(Result17, { autoClose: 5000, position: "top-right" });
  //   } else if (isError17 && !isloading17) {
  //     toast.error(error17, { autoClose: 5000, position: "top-right" });
  //   }
  // }, [isSuccess17, isError17]);

  const Col = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "CoName",
      headerName: "Customer",
      width: 220,
      hideable: false,
    },
    {
      field: "Remarks",
      headerName: "Remark",
      width: 270,
    },
    {
      field: "Custstatus",
      headerName: "Status",
      width: 250,
      hideable: false,
    },
    {
      field: "Contact_Name",
      headerName: "Contact Name",
      width: 150,
      hideable: false,
    },
    {
      field: "Mobile",
      headerName: "Contact No.",
      width: 100,
      hideable: false,
    },
    {
      field: "Vounum",
      headerName: "Voucher No.",
      width: 100,
      hideable: false,
    },
    {
      field: "Actiondate",
      headerName: "Action Date",
      width: 100,
      hideable: false,
    },
    {
      field: "Voudate",
      headerName: "Voucher Date",
      width: 110,
      hideable: false,
    },
    {
      field: "State_name",
      headerName: "State",
      width: 110,
      hideable: false,
    },
    {
      field: "NAME",
      headerName: "City",
      width: 90,
      hideable: false,
    },
    {
      field: "Code",
      headerName: "Area",
      width: 90,
      hideable: false,
    },
  ];

  const filterHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    if (key === "EndDate") {
      let diff = DateDiffChecker(filteredData?.StartDate, value);
      console.log(diff);
      if (diff) {
        console.log(diff);
        setFilteredData({ ...filteredData, [key]: value });
      } else {
        setFilteredData({ ...filteredData, [key]: null });
      }
    } else {
      setFilteredData({ ...filteredData, [key]: value });
    }
  };
  return (
    <Container
      fluid
      className="px-3"
      style={{ height: "88%", marginLeft: "40px", width: "auto" }}
    >
      <ToastContainer />
      <div className="px-3">
        <h5 className="title_container mt-2">Admin Panel</h5>
        <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
      </div>
      <div className="d-flex justift-content-center align-items-center mx-5">
        <DateRangeInput
          InputHandler={filterHandler}
          StartDate={"StartDate"}
          EndDate={"EndDate"}
          StartDateValue={filteredData?.StartDate}
          EndDateValue={filteredData?.EndDate}
          maxdate1={cdate}
          maxdate2={cdate}
          mindate2={filteredData?.StartDate}
        />
        <div className="mt-2">
          <SelectOption
            Soptions={[
              { Name: "--Select Status--", Value: -1 },
              { Name: "InActive", Value: 1 },
              { Name: "Active", Value: 2 },
            ]}
            OnSelect={(e) => {
              setFilteredData({ ...filteredData, Status: e.target.value });
            }}
            SName={"Name"}
            PlaceHolder={"Status"}
            Value={filteredData?.Status}
            SelectStyle={{ padding: "7px 10px", width: "150px" }}
          />
        </div>
        <button
          type="button"
          className="btn btn-link"
          style={{ marginTop: "5px" }}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-custom-className="custom-tooltip"
          data-bs-title="Reset Filter"
        >
          <i
            className="bi bi-arrow-counterclockwise"
            style={{ fontSize: "25px", fontWeight: "bolder", color: "gray" }}
          ></i>
        </button>
      </div>
      <div className="px-md-2 px-sm-3 px-xs-1">
        <ReusableDataGrid
          col={Col}
          id={id}
          onChangeRow={(id) => {
            onChangeHandler(id);
          }}
          row={adminData}
          uniquekey={"Vounum"}
          key={1}
          checkSelect={true}
        />
      </div>
    </Container>
  );
}

export default AdminPanel;
