import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/customer-list`;

export const CustomerListFunc = createAsyncThunk(
  "CustomerList",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const CustomerListSlice = createSlice({
  name: "CustomerList",
  initialState: {
    isCustListLoading: false,
    CustList: [],
    CustListErrorMsg: "",
    isCustListError: false,
    isCustListSuccess: false,
  },
  reducers: {
    ClearStateCustList: (state) => {
      state.CustListErrorMsg = "";
      state.isCustListError = false;
      state.isCustListSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CustomerListFunc.pending, (state) => {
        state.isCustListLoading = true;
        state.isCustListError = false;
        state.isCustListSuccess = false;
      })
      .addCase(CustomerListFunc.fulfilled, (state, { payload }) => {
        state.isCustListError = false;
        state.isCustListLoading = false;
        state.isCustListSuccess = true;
        state.CustList = payload;
      })
      .addCase(CustomerListFunc.rejected, (state, { payload }) => {
        state.isCustListLoading = false;
        state.isCustListError = true;
        state.isCustListSuccess = false;
        state.CustListErrorMsg = payload;
      });
  },
});
export const { ClearStateCustList } = CustomerListSlice.actions;
export default CustomerListSlice.reducer;
