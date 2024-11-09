import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/`;

export const getAllLocation = createAsyncThunk(
  "LocationList",
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

const LocationListSlice = createSlice({
  name: "LocationList",
  initialState: {
    isLocationLoading: false,
    LocationList: [],
    LocationErrorMsg: "",
    isLocationError: false,
    isLocationSuccess: false,
  },
  reducers: {
    ClearStateLocation: (state) => {
      state.LocationErrorMsg = "";
      state.isLocationError = false;
      state.isLocationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLocation.pending, (state) => {
        state.isLocationLoading = true;
        state.isLocationError = false;
        state.isLocationSuccess = false;
      })
      .addCase(getAllLocation.fulfilled, (state, { payload }) => {
        state.isLocationError = false;
        state.isLocationLoading = false;
        state.isLocationSuccess = true;
        state.LocationList = payload;
      })
      .addCase(getAllLocation.rejected, (state, { payload }) => {
        state.isLocationLoading = false;
        state.isLocationError = true;
        state.isLocationSuccess = false;
        state.LocationErrorMsg = payload;
      });
  },
});
export const { ClearStateLocation } = LocationListSlice.actions;
export default LocationListSlice.reducer;
