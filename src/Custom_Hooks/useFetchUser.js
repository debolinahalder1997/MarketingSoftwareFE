import React, { useEffect, useMemo, useState } from "react";
import { ClearStateUser, UserListFunc } from "../Slice/UserListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchUser = (obj = {}, dep=[]) => {
  const dispatch = useDispatch();
  const { UserList, UserErrorMsg, isUserLoading, isUserError, isUserSuccess } =
    useSelector((state) => state.userlist);
  useEffect(() => {
    dispatch(UserListFunc(obj));
  }, dep);

  let Users = useMemo(() => {
    if (UserList) {
      return UserList;
    } else {
      return [];
    }
  }, [isUserSuccess, UserList]);

  return { Users, isUserLoading, isUserError, isUserSuccess, UserErrorMsg };
};

export default useFetchUser;
