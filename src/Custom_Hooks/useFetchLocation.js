import React, { useEffect, useMemo, useState } from "react";
import { ClearStateLocation, getAllLocation } from "../Slice/LocationListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchLocation = (obj = {}, dep=[]) => {
  const dispatch = useDispatch();
  const {
    LocationList,
    LocationErrorMsg,
    isLocationLoading,
    isLocationError,
    isLocationSuccess,
  } = useSelector((state) => state.loclist);
  
  useEffect(() => {
    dispatch(getAllLocation(obj));
  }, dep);
  
  let Location = useMemo(() => {
    if (LocationList) {
      return LocationList;
    } else {
      return [];
    }
  }, [isLocationLoading, isLocationError, isLocationSuccess]);

  return {
    Location,
    LocationErrorMsg,
    isLocationError,
    isLocationSuccess,
    isLocationLoading,
  };
};

export default useFetchLocation;
