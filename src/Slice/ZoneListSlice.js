import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/zone-list`;

export const getAllZoneList = createAsyncThunk(
  "ZoneList",
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

const ZoneListSlice = createSlice({
  name: "ZoneList",
  initialState: {
    isZoneLoading: false,
    ZoneList: [],
    ZoneListErrorMsg: "",
    isZoneError: false,
    isZoneSuccess: false,
  },
  reducers: {
    ClearStateZone: (state) => {
      state.ZoneListErrorMsg = "";
      state.isZoneError = false;
      state.isZoneSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllZoneList.pending, (state) => {
        state.isZoneLoading = true;
        state.isZoneError = false;
        state.isZoneSuccess = false;
      })
      .addCase(getAllZoneList.fulfilled, (state, { payload }) => {
        state.isZoneError = false;
        state.isZoneLoading = false;
        state.isZoneSuccess = true;
        state.ZoneList = payload;
      })
      .addCase(getAllZoneList.rejected, (state, { payload }) => {
        state.isZoneLoading = false;
        state.isZoneError = true;
        state.isZoneSuccess = false;
        state.ZoneListErrorMsg = payload;
      });
  },
});
export const { ClearStateZone } = ZoneListSlice.actions;
export default ZoneListSlice.reducer;
