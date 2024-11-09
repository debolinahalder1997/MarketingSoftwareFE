import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/area-list`;

export const getAllArea = createAsyncThunk(
  "AreaList",
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

const AreaListSlice = createSlice({
  name: "AreaList",
  initialState: {
    isAreaLoading: false,
    AreaList: [],
    ErrorArea: "",
    isErrorArea: false,
    isAreaSuccess: false,
  },
  reducers: {
    ClearStateArea: (state) => {
      state.ErrorArea = "";
      state.isErrorArea = false;
      state.isAreaSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArea.pending, (state) => {
        state.isAreaLoading = true;
        state.isErrorArea = false;
        state.isAreaSuccess = false;
      })
      .addCase(getAllArea.fulfilled, (state, { payload }) => {
        state.isErrorArea = false;
        state.isAreaLoading = false;
        state.isAreaSuccess = true;
        state.AreaList = payload;
      })
      .addCase(getAllArea.rejected, (state, { payload }) => {
        state.isAreaLoading = false;
        state.isErrorArea = true;
        state.isAreaSuccess = false;
        state.ErrorArea = payload;
      });
  },
});
export const { ClearStateArea } = AreaListSlice.actions;
export default AreaListSlice.reducer;
