import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/country-list`;

export const getAllCountryList = createAsyncThunk(
  "CountryList",
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

const CountryListSlice = createSlice({
  name: "CountryList",
  initialState: {
    isCountryLoading: false,
    CountryList: [],
    CountryErrorMsg: "",
    isCountryError: false,
    isCountrySuccess: false,
  },
  reducers: {
    ClearStateCountry: (state) => {
      state.CountryErrorMsg = "";
      state.isCountryError = false;
      state.isCountrySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountryList.pending, (state) => {
        state.isCountryLoading = true;
        state.isCountryError = false;
        state.isCountrySuccess = false;
      })
      .addCase(getAllCountryList.fulfilled, (state, { payload }) => {
        state.isCountryError = false;
        state.isCountryLoading = false;
        state.isCountrySuccess = true;
        state.CountryList = payload;
      })
      .addCase(getAllCountryList.rejected, (state, { payload }) => {
        state.isCountryLoading = false;
        state.isCountryError = true;
        state.isCountrySuccess = false;
        state.CountryErrorMsg = payload;
      });
  },
});
export const { ClearStateCountry } = CountryListSlice.actions;
export default CountryListSlice.reducer;
