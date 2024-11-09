import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/area-add`;

export const addNewArea = createAsyncThunk(
  "AddArea",
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

const AddAreaSlice = createSlice({
  name: "AddArea",
  initialState: {
    isLoadingAddArea: false,
    addAreaSuccessMsg: "",
    addAreaErrorMsg: "",
    isErrorAddArea: false,
    isAddAreaSuccess: false,
  },
  reducers: {
    ClearStateAddArea: (state) => {
      state.addAreaErrorMsg = "";
      state.isErrorAddArea = false;
      state.isAddAreaSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewArea.pending, (state) => {
        state.isLoadingAddArea = true;
        state.isErrorAddArea = false;
        state.isAddAreaSuccess = false;
      })
      .addCase(addNewArea.fulfilled, (state, { payload }) => {
        state.isErrorAddArea = false;
        state.isLoadingAddArea = false;
        state.isAddAreaSuccess = true;
        state.addAreaSuccessMsg = payload;
      })
      .addCase(addNewArea.rejected, (state, { payload }) => {
        state.isLoadingAddArea = false;
        state.isErrorAddArea = true;
        state.isAddAreaSuccess = false;
        state.addAreaErrorMsg = payload;
      });
  },
});
export const { ClearStateAddArea } = AddAreaSlice.actions;
export default AddAreaSlice.reducer;
