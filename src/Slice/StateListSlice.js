import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/state-list`;

export const getAllStateList = createAsyncThunk(
  "StateList",
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

const StateListSlice = createSlice({
  name: "StateList",
  initialState: {
    isStateLoading: false,
    StateList: [],
    StateErrorMsg: "",
    isStateError: false,
    isStateSuccess: false,
  },
  reducers: {
    StateClear: (state) => {
      state.StateErrorMsg = "";
      state.isStateError = false;
      state.isStateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStateList.pending, (state) => {
        state.isStateLoading = true;
        state.isStateError = false;
        state.isStateSuccess = false;
      })
      .addCase(getAllStateList.fulfilled, (state, { payload }) => {
        state.isStateError = false;
        state.isStateLoading = false;
        state.isStateSuccess = true;
        state.StateList = payload;
      })
      .addCase(getAllStateList.rejected, (state, { payload }) => {
        state.isStateLoading = false;
        state.isStateError = true;
        state.isStateSuccess = false;
        state.StateErrorMsg = payload;
      });
  },
});
export const { StateClear } = StateListSlice.actions;
export default StateListSlice.reducer;
