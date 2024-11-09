import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/customer-add`;

export const CustRegFunc = createAsyncThunk(
  "CustReg",
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

const CustRegSlice = createSlice({
  name: "CustReg",
  initialState: {
    isCustRegLoding: false,
    CustRegSuccessMsg: "",
    CustRegErrorMsg: "",
    isCustRegErrorMsg: false,
    isCustRegSuccess: false,
  },
  reducers: {
    CustRegClearState: (state) => {
      state.CustRegErrorMsg = "";
      state.isCustRegErrorMsg = false;
      state.isCustRegSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CustRegFunc.pending, (state) => {
        state.isCustRegLoding = true;
        state.isCustRegErrorMsg = false;
        state.isCustRegSuccess = false;
      })
      .addCase(CustRegFunc.fulfilled, (state, { payload }) => {
        state.isCustRegErrorMsg = false;
        state.isCustRegLoding = false;
        state.isCustRegSuccess = true;
        state.CustRegSuccessMsg = payload;
      })
      .addCase(CustRegFunc.rejected, (state, { payload }) => {
        state.isCustRegLoding = false;
        state.isCustRegErrorMsg = true;
        state.isCustRegSuccess = false;
        state.CustRegErrorMsg = payload;
      });
  },
});
export const { CustRegClearState } = CustRegSlice.actions;
export default CustRegSlice.reducer;
