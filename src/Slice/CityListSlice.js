import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/city-list`;

export const getAllCityList = createAsyncThunk(
  "CityList",
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

const CityListSlice = createSlice({
  name: "CityList",
  initialState: {
    isCityLoading: false,
    CityList: [],
    CityErrorMsg: "",
    isCityError: false,
    isCitySuccess: false,
  },
  reducers: {
    ClearStateCity: (state) => {
      state.CityErrorMsg = "";
      state.isCityError = false;
      state.isCitySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCityList.pending, (state) => {
        state.isCityLoading = true;
        state.isCityError = false;
        state.isCitySuccess = false;
      })
      .addCase(getAllCityList.fulfilled, (state, { payload }) => {
        state.isCityError = false;
        state.isCityLoading = false;
        state.isCitySuccess = true;
        state.CityList = payload;
      })
      .addCase(getAllCityList.rejected, (state, { payload }) => {
        state.isCityLoading = false;
        state.isCityError = true;
        state.isCitySuccess = false;
        state.CityErrorMsg = payload;
      });
  },
});
export const { ClearStateCity } = CityListSlice.actions;
export default CityListSlice.reducer;
