import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/user-list`;

export const UserListFunc = createAsyncThunk(
  "UserList",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const UserListSlice = createSlice({
  name: "UserList",
  initialState: {
    isUserLoading: false,
    UserList: [],
    UserErrorMsg: "",
    isUserError: false,
    isUserSuccess: false,
  },
  reducers: {
    ClearStateUser: (state) => {
      state.UserErrorMsg = "";
      state.isUserError = false;
      state.isUserSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserListFunc.pending, (state) => {
        state.isUserLoading = true;
        state.isUserError = false;
        state.isUserSuccess = false;
      })
      .addCase(UserListFunc.fulfilled, (state, { payload }) => {
        state.isUserError = false;
        state.isUserLoading = false;
        state.isUserSuccess = true;
        state.UserList = payload;
      })
      .addCase(UserListFunc.rejected, (state, { payload }) => {
        state.isUserLoading = false;
        state.isUserError = true;
        state.isUserSuccess = false;
        state.UserErrorMsg = payload;
      });
  },
});
export const { ClearStateUser } = UserListSlice.actions;
export default UserListSlice.reducer;
