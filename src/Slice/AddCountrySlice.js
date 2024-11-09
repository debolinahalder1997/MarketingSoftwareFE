import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/tarn-routes/add-country`;

export const AddCountryFunc = createAsyncThunk(
  "AddCountry",
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

const AddCountrySlice = createSlice({
  name: "AddCountry",
  initialState: {
    isAddCountryLoading: false,
    AddCountrySuccessMsg: [],
    AddCountryErrorMsg: "",
    isAddCountryError: false,
    isAddCountrySuccess: false,
  },
  reducers: {
    ClearStateAddCountry: (state) => {
      state.AddCountryErrorMsg = "";
      state.isAddCountryError = false;
      state.isAddCountrySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCountryFunc.pending, (state) => {
        state.isAddCountryLoading = true;
        state.isAddCountryError = false;
        state.isAddCountrySuccess = false;
      })
      .addCase(AddCountryFunc.fulfilled, (state, { payload }) => {
        state.isAddCountryError = false;
        state.isAddCountryLoading = false;
        state.isAddCountrySuccess = true;
        state.AddCountrySuccessMsg = payload;
      })
      .addCase(AddCountryFunc.rejected, (state, { payload }) => {
        state.isAddCountryLoading = false;
        state.isAddCountryError = true;
        state.isAddCountrySuccess = false;
        state.AddCountryErrorMsg = payload;
      });
  },
});
export const { ClearStateAddCountry } = AddCountrySlice.actions;
export default AddCountrySlice.reducer;
