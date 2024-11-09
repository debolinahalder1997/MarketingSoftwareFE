import React, { useEffect, useMemo, useState } from "react";
import { ClearStateFeedBack, getAllFeedBack } from "../Slice/FeedBackListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchFeedBack = (obj = {},dep=[])=> {
  const dispatch = useDispatch();
  const {
    FeedBack,
    FeedBackErrorMsg,
    isFBLoading,
    isFeedBackError,
    isFeedBackSuccess,
  } = useSelector((state) => state.fb);
  useEffect(() => {
    dispatch(getAllFeedBack(obj));
  }, dep);
    
  let fblist = useMemo(() => {
    if (FeedBack) {
      return FeedBack;
    } else {
      return [];
    }
  }, [isFBLoading, isFeedBackError, isFeedBackSuccess]);

  return {
    fblist,
    isFBLoading,
    isFeedBackError,
    isFeedBackSuccess,
    FeedBackErrorMsg,
  };
}

export default useFetchFeedBack;
