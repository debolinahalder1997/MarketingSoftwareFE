import React, { useEffect, useMemo, useState } from "react";
import { ClearStateArea, getAllArea } from "../Slice/AreaListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchArea = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const { isAreaLoading, AreaList, ErrorArea, isErrorArea, isAreaSuccess } =
    useSelector((state) => state.area);
  useEffect(() => {
    dispatch(getAllArea(obj));
  }, dep);
  let area = useMemo(() => {
    if (AreaList) {
      return AreaList;
    } else {
      return [];
    }
  }, [isAreaSuccess, isErrorArea, isAreaLoading]);

  return { area, isAreaSuccess, isErrorArea, isAreaLoading, ErrorArea };
};

export default useFetchArea;
