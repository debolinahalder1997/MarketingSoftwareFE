import React, { useEffect, useMemo, useState } from "react";
import { CompClearState, getAllCompany } from "../Slice/CompanyListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchCompany = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const {
    CompanyList,
    CompError,
    isCompLoding,
    isCompError,
    isCompanySuccess,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getAllCompany(obj));
  }, dep);

  let CompList = useMemo(() => {
    if (CompanyList) {
      return CompanyList;
    } else {
      return [];
    }
  }, [isCompLoding, isCompError, isCompanySuccess]);

  return {
    CompList,
    CompError,
    isCompLoding,
    isCompError,
    isCompanySuccess,
  };
};

export default useFetchCompany;
