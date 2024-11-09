import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/company-list`;
export const getAllCompany = createAsyncThunk(
  "CompanyList",
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

const CompanyListSlice = createSlice({
  name: "CompanyList",
  initialState: {
    isCompLoding: false,
    CompanyList: [],
    CompError: "",
    isCompError: false,
    isCompanySuccess: false,
  },
  reducers: {
    CompClearState: (state) => {
      state.CompError = "";
      state.isCompError = false;
      state.isCompanySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompany.pending, (state) => {
        state.isCompLoding = true;
        state.isCompError = false;
        state.isCompanySuccess = false;
      })
      .addCase(getAllCompany.fulfilled, (state, { payload }) => {
        state.isCompError = false;
        state.isCompLoding = false;
        state.isCompanySuccess = true;
        state.CompanyList = payload;
      })
      .addCase(getAllCompany.rejected, (state, { payload }) => {
        state.isCompLoding = false;
        state.isCompError = true;
        state.isCompanySuccess = false;
        state.CompError = payload;
      });
  },
});
export const { CompClearState } = CompanyListSlice.actions;
export default CompanyListSlice.reducer;
