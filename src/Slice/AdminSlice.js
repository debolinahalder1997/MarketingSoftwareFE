import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/admin`;

export const getAllAdmin = createAsyncThunk(
  "Admin",
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

const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    isAdminLoading: false,
    Admin: [],
    ErrorAdmin: "",
    isErrorAdmin: false,
    isAdminSuccess: false,
  },
  reducers: {
    ClearStateAdmin: (state) => {
      state.ErrorAdmin = "";
      state.isErrorAdmin = false;
      state.isAdminSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmin.pending, (state) => {
        state.isAdminLoading = true;
        state.isErrorAdmin = false;
        state.isAdminSuccess = false;
      })
      .addCase(getAllAdmin.fulfilled, (state, { payload }) => {
        state.isErrorAdmin = false;
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.Admin = payload;
      })
      .addCase(getAllAdmin.rejected, (state, { payload }) => {
        state.isAdminLoading = false;
        state.isErrorAdmin = true;
        state.isAdminSuccess = false;
        state.ErrorAdmin = payload;
      });
  },
});
export const { ClearStateAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
