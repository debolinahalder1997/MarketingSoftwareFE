import React, { useEffect, useMemo } from "react";
import { getAllCountryList } from "../Slice/CountryListSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchCountry({ obj = {}, dep = [] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountryList(obj));
  }, dep);
  const {
    isCountryLoading,
    CountryList,
    CountryErrorMsg,
    isCountryError,
    isCountrySuccess,
  } = useSelector((state) => state.countrylist);
  const CountryListData = useMemo(() => {
    if (isCountrySuccess) {
      return CountryList || [];
    } else {
      return [];
    }
  }, [isCountrySuccess]);
  return {
    isCountryLoading,
    CountryListData,
    CountryErrorMsg,
    isCountryError,
    isCountrySuccess,
  };
}

export default useFetchCountry;
