import React, { useEffect, useMemo, useState } from "react";
import {
  ClearStateCustList,
  CustomerListFunc,
} from "../Slice/CustomerListSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchCustomer = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const [CustomerList, setCustomerList] = useState([]);
  const {
    isCustListLoading,
    CustList,
    CustListErrorMsg,
    isCustListError,
    isCustListSuccess,
  } = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(CustomerListFunc(obj));
  }, dep);

  useEffect(() => {
    if (isCustListSuccess && CustList) {
      setCustomerList(CustList);
    }
  }, [isCustListError, isCustListSuccess, CustList]);

  return {
    CustomerList,
    CustListErrorMsg,
    isCustListLoading,
    isCustListError,
    isCustListSuccess,
  };
};

export default useFetchCustomer;
